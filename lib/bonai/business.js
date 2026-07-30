import {
  getTopOpportunities,
  getBusinessThisMonth,
} from "@/lib/salesforce/api";

/**
 * BON AI Business Layer
 * This file contains business analytics logic only.
 * It does NOT modify AI Scanner functionality.
 */

// ==========================================
// Top Opportunities
// ==========================================

export async function getTopOpportunitiesSummary(
  accessToken,
  recordType = null
) {
  const opportunities = await getTopOpportunities(
    accessToken,
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
// Business This Month
// ==========================================

export async function getMonthlyBusinessSummary(accessToken) {
  const opportunities = await getBusinessThisMonth(accessToken);

  if (!opportunities || opportunities.length === 0) {
    return "No business found for this month.";
  }

  let totalBusiness = 0;
  let closedWon = 0;
  let pipeline = 0;

  opportunities.forEach((opp) => {
    totalBusiness += Number(opp.Amount || 0);

    if (opp.StageName === "Closed Won") {
      closedWon++;
    } else {
      pipeline++;
    }
  });

  return `📊 Business This Month

💰 Total Business : ₹${totalBusiness.toLocaleString("en-IN")}

📦 Total Opportunities : ${opportunities.length}

🏆 Closed Won : ${closedWon}

📈 Pipeline : ${pipeline}`;
}