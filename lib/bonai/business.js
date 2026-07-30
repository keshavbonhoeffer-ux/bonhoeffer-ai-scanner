import { getTopOpportunities } from "@/lib/salesforce/api";

/**
 * BON AI Business Layer
 * This file contains business analytics logic only.
 * It does NOT modify AI Scanner functionality.
 */

export async function getTopOpportunitiesSummary(accessToken, recordType = null) {
  const opportunities = await getTopOpportunities(accessToken, recordType);

  if (!opportunities || opportunities.length === 0) {
    return "No Opportunities found.";
  }

  let summary = "🏆 Top 10 Opportunities\n\n";

  opportunities.forEach((opp, index) => {
    summary += `${index + 1}. ${opp.Name}\n`;
    summary += `💰 Amount : ₹${opp.Amount || 0}\n`;
    summary += `📍 Stage : ${opp.StageName}\n`;
    summary += `📅 Close Date : ${opp.CloseDate}\n\n`;
  });

  return summary;
}