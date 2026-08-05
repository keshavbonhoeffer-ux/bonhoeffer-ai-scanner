// ==========================================
// Business Summary
// ==========================================

export async function getBusinessAnalyticsSummary(
  accessToken,
  instanceUrl,
  recordType,
  type,
  period = "THIS_MONTH",
  salesperson = null,
  selectedMonth = null
) {

  const opportunities = await getBusinessSummary(
    accessToken,
    instanceUrl,
    recordType,
    type,
    period,
    salesperson,
    selectedMonth
  );

  if (!opportunities || opportunities.length === 0) {

    return `No ${recordType} ${type
      .toLowerCase()
      .replace("_", " ")} found.`;

  }

  let totalBusiness = 0;

  opportunities.forEach((opp) => {
    totalBusiness += Number(opp.Amount || 0);
  });

  const currency =
    recordType === "International"
      ? "USD "
      : "₹";

  const formattedAmount =
    recordType === "International"
      ? totalBusiness.toLocaleString("en-US")
      : totalBusiness.toLocaleString("en-IN");

  const title =
    type === "CLOSED_WON"
      ? "Closed Won"
      : "Pipeline";

  return `📊 ${recordType} ${title}

💰 Total Value : ${currency}${formattedAmount}

📦 Opportunities : ${opportunities.length}`;

}