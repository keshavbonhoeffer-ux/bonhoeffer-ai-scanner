const BASE_URL = process.env.NEXT_PUBLIC_SALESFORCE_LOGIN_URL;

// ==========================================
// Generic SOQL Query
// ==========================================

export async function salesforceQuery(accessToken, soql) {
  const response = await fetch(
    `${BASE_URL}/services/data/v64.0/query?q=${encodeURIComponent(soql)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return await response.json();
}

// ==========================================
// Leads
// ==========================================

export async function getLeads(accessToken) {
  const result = await salesforceQuery(
    accessToken,
    `
    SELECT
      Id,
      Name,
      Company,
      Email,
      Phone,
      Status,
      Owner.Name,
      CreatedDate
    FROM Lead
    ORDER BY CreatedDate DESC
    LIMIT 20
    `
  );

  return result.records;
}

// ==========================================
// Accounts
// ==========================================

export async function getAccounts(accessToken) {
  const result = await salesforceQuery(
    accessToken,
    `
    SELECT
      Id,
      Name,
      Owner.Name,
      BillingCity,
      BillingCountry,
      CreatedDate
    FROM Account
    ORDER BY CreatedDate DESC
    LIMIT 20
    `
  );

  return result.records;
}

// ==========================================
// Opportunities (Latest)
// ==========================================

export async function getOpportunities(accessToken) {
  const result = await salesforceQuery(
    accessToken,
    `
    SELECT
      Id,
      Name,
      StageName,
      Amount,
      CloseDate,
      Owner.Name
    FROM Opportunity
    ORDER BY CreatedDate DESC
    LIMIT 20
    `
  );

  return result.records;
}

// ==========================================
// ==========================================
// Top Opportunities
// ==========================================

export async function getTopOpportunities(accessToken, recordType = null) {
  let whereClause = "WHERE Amount != NULL";

  if (recordType) {
    whereClause += ` AND RecordType.Name = '${recordType}'`;
  }

  console.log("Record Type Filter:", recordType);

  const result = await salesforceQuery(
    accessToken,
    `
    SELECT
      Id,
      Name,
      StageName,
      Amount,
      CloseDate,
      Owner.Name
    FROM Opportunity
    ${whereClause}
    ORDER BY Amount DESC
    LIMIT 10
    `
  );

  return result.records;
}

// ==========================================
// Business Analytics
// ==========================================

export async function getBusinessSummary(
  accessToken,
  recordType,
  type,
  period = "THIS_MONTH",
  salesperson = null
) {

  const today = new Date();

  let startDate;
  let endDate;

  if (period === "LAST_MONTH") {

    const firstDayLastMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1
    );

    const lastDayLastMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    );

    startDate = firstDayLastMonth.toISOString().split("T")[0];
    endDate = lastDayLastMonth.toISOString().split("T")[0];

  } else {

    startDate =
      `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-01`;

    endDate =
      today.toISOString().split("T")[0];

  }

  let stageFilter = "";

  if (type === "CLOSED_WON") {
    stageFilter = `AND StageName = 'Closed Won'`;
  }

  if (type === "PIPELINE") {
    stageFilter = `
      AND StageName != 'Closed Won'
      AND StageName != 'Closed Lost'
    `;
  }

  let ownerFilter = "";

  if (salesperson) {
    ownerFilter = `
      AND Owner.Name = '${salesperson}'
    `;
  }

  const result = await salesforceQuery(
    accessToken,
    `
SELECT
Id,
Name,
Amount,
StageName,
CloseDate,
Owner.Name
FROM Opportunity
WHERE CloseDate >= ${startDate}
AND CloseDate <= ${endDate}
AND RecordType.Name='${recordType}'
${stageFilter}
${ownerFilter}
`
  );

  return result.records;

}