import {
  getTopOpportunities,
  getBusinessSummary,
} from "@/lib/salesforce/api";

/**
 * BON AI Business Layer
 */

// ==========================================
// Top Opportunities
// ==========================================

export async function getTopOpportunitiesSummary(
  accessToken,
  instanceUrl,
  recordType = null
) {

  const opportunities = await getTopOpportunities(
    accessToken,
    instanceUrl,
    recordType
  );

  if (!opportunities || opportunities.length === 0) {
    return "No Opportunities found.";
  }

  let summary = "🏆 Top 10 Opportunities\n\n";

  opportunities.forEach((opp, index) => {

    summary += `${index + 1}. ${opp.Name}\n`;

    const amount = Number(opp.Amount || 0);

    const formattedAmount =
      recordType === "International"
        ? amount.toLocaleString("en-US")
        : amount.toLocaleString("en-IN");

    const currency =
      recordType === "International"
        ? "USD "
        : "₹";

    summary += `💰 Amount : ${currency}${formattedAmount}\n`;
    summary += `📍 Stage : ${opp.StageName}\n`;
    summary += `📅 Close Date : ${opp.CloseDate}\n\n`;

  });

  return summary;

}

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