import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import {
  getLeads,
  getAccounts,
  getOpportunities,
  getTopOpportunities,
  getProducts
} from "@/lib/salesforce/api";

import {
  getTopOpportunitiesSummary,
  getMonthlyBusinessSummary,
} from "@/lib/bonai/business";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);
// ==========================================
// Load Salesforce Knowledge
// ==========================================

const salesforceKnowledgePath = path.join(
  process.cwd(),
  "knowledge",
  "salesforce"
);

let salesforceKnowledge = "";

if (fs.existsSync(salesforceKnowledgePath)) {

  const files = fs.readdirSync(salesforceKnowledgePath);

  files.forEach(file => {

    if (file.endsWith(".md")) {

      salesforceKnowledge +=
`\n=============================
${file.replace(".md","").toUpperCase()}
=============================

`;

      salesforceKnowledge += fs.readFileSync(
        path.join(salesforceKnowledgePath, file),
        "utf8"
      );

      salesforceKnowledge += "\n\n";

    }

  });

}

// ==========================================
// Load Product Database
// ==========================================

const filePath = path.join(
  process.cwd(),
  "knowledge",
  "products.json"
);

const products = JSON.parse(
  fs.readFileSync(filePath, "utf8")
);

// ==========================================
// Helper Functions
// ==========================================

function normalize(text = "") {
  return text.toLowerCase().trim();
}

function findProductByModel(text) {
  const query = normalize(text);

  return products.find((product) =>
    query.includes(product.model.toLowerCase())
  );
}

function findProductByKeyword(text) {
  const query = normalize(text);

  return products.find((product) =>
    product.keywords?.some((keyword) =>
      query.includes(keyword.toLowerCase())
    )
  );
}

function findProduct(text) {
  return (
    findProductByModel(text) ||
    findProductByKeyword(text)
  );
}

// ==========================================
// Intent Detection
// ==========================================

function detectIntent(message) {

  const query = normalize(message);

  if (
    query.includes(" vs ") ||
    query.includes(" compare ") ||
    query.includes("difference") ||
    query.includes("better than")
  ) {
    return "COMPARE";
  }

  if (
    query.includes("recommend") ||
    query.includes("suggest") ||
    query.includes("best for") ||
    query.includes("which model") ||
    query.includes("which machine")
  ) {
    return "RECOMMEND";
  }

  if (
    query.includes("accessories") ||
    query.includes("accessory")
  ) {
    return "ACCESSORIES";
  }

  if (
    query.includes("spare part") ||
    query.includes("spare parts")
  ) {
    return "SPARE_PARTS";
  }

  if (
    query.includes("maintenance") ||
    query.includes("service")
  ) {
    return "MAINTENANCE";
  }

  if (
    query.includes("warranty")
  ) {
    return "WARRANTY";
  }

  if (
    query.includes("safety") ||
    query.includes("ppe")
  ) {
    return "SAFETY";
  }

  if (
    query.includes("faq") ||
    query.startsWith("can ") ||
    query.startsWith("does ") ||
    query.startsWith("is ")
  ) {
    return "FAQ";
  }

  if (
    query.includes("sales pitch") ||
    query.includes("advantages") ||
    query.includes("benefits")
  ) {
    return "SALES_PITCH";
  }

  if (
    query.includes("brush cutter") ||
    query.includes("brushcutter")
  ) {
    return "BRUSH_CUTTER";
  }

  if (
  query.includes("who are you") ||
  query.includes("who you are") ||
  query.includes("who built you") ||
  query.includes("who created you") ||
  query.includes("developer") ||
  query.includes("about you")
) {
  return "IDENTITY";
}

  if (findProduct(query)) {
    return "PRODUCT";
  }
if (
  query.includes("show my leads") ||
  query.includes("my leads") ||
  query.includes("list leads")
) {
  return "MY_LEADS";
}
// ===============================
// BUSINESS ANALYTICS
// ===============================

// ==========================================
// TOP OPPORTUNITIES
// ==========================================

if (
  query.includes("top domestic opportunities") ||
  query.includes("domestic top opportunities") ||
  query.includes("top opportunities domestic")
) {
  return "TOP_DOMESTIC_OPPORTUNITIES";
}

if (
  query.includes("top international opportunities") ||
  query.includes("international top opportunities") ||
  query.includes("top opportunities international")
) {
  return "TOP_INTERNATIONAL_OPPORTUNITIES";
}

if (
  query.includes("top opportunities") ||
  query.includes("show top opportunities") ||
  query.includes("top deals") ||
  query.includes("highest opportunity") ||
  query.includes("largest opportunity") ||
  query.includes("largest opportunities")
) {
  return "TOP_OPPORTUNITIES";
}

if (
  query.includes("top accounts") ||
  query.includes("largest accounts") ||
  query.includes("best customers")
) {
  return "TOP_ACCOUNTS";
}

if (
  query.includes("top sales person") ||
  query.includes("top salesperson") ||
  query.includes("best salesperson") ||
  query.includes("top performer")
) {
  return "TOP_SALESPERSON";
}

if (
  query.includes("pipeline") ||
  query.includes("sales pipeline")
) {
  return "PIPELINE";
}

if (
  query.includes("business this month") ||
  query.includes("show my business this month") ||
  query.includes("monthly business")
) {
  return "MONTHLY_BUSINESS";
}

if (
  query.includes("dashboard")
) {
  return "DASHBOARD";
}

if (
  query.includes("report") ||
  query.includes("create report")
) {
  return "REPORT";
}
  return "GEMINI";
}

// ==========================================
// POST API
// ==========================================

export async function POST(req) {

  try {

    const {
  message,
  history = [],
  accessToken,
  instanceUrl
} = await req.json();

    if (!message) {

      return Response.json(
        {
          reply: "Please enter your question."
        },
        {
          status: 400
        }
      );

    }

    const intent = detectIntent(message);

    console.log("Detected Intent =", intent);

console.log("Message:", message);
console.log("Detected Intent:", intent);

switch (intent) {
      case "MY_LEADS": {

  if (!accessToken) {
    return Response.json({
      reply: "Please login to Salesforce first."
    });
  }

  try {

    const leads = await getLeads(accessToken);

    if (!leads || leads.length === 0) {
      return Response.json({
        reply: "No Leads found."
      });
    }

    let reply = "📋 Your Leads\n\n";

    leads.slice(0, 10).forEach((lead, index) => {
      reply += `${index + 1}. ${lead.Name}\n`;
    });

    return Response.json({
      reply
    });

  } catch (error) {

    console.error(error);

    return Response.json({
      reply: "Failed to fetch Leads from Salesforce."
    });

  }

}
      // ==========================================
      // PRODUCT SEARCH
      // ==========================================

      case "PRODUCT": {

        const product = findProduct(message);

        if (!product) {

          return Response.json({
            reply: "Sorry, I couldn't find that product."
          });

        }

        let reply = "";

        reply += `✅ ${product.model}\n\n`;
        reply += `Brand : ${product.brand}\n`;
        reply += `Category : ${product.category}\n\n`;

        if (product.salesGuide?.position) {
          reply += `Position : ${product.salesGuide.position}\n\n`;
        }

        if (product.salesGuide?.salesPitch) {
          reply += `${product.salesGuide.salesPitch}\n\n`;
        }

        if (product.salesGuide?.bestFor?.length) {

          reply += "Best For\n";

          product.salesGuide.bestFor.forEach((item) => {
            reply += `• ${item}\n`;
          });

          reply += "\n";

        }

        if (product.applications?.length) {

          reply += "Applications\n";

          product.applications.forEach((item) => {
            reply += `• ${item}\n`;
          });

          reply += "\n";

        }

        if (product.specifications) {

          reply += "Specifications\n";

          Object.entries(product.specifications).forEach(
            ([key, value]) => {
              reply += `• ${key}: ${value}\n`;
            }
          );

        }

        return Response.json({
          reply
        });

      }

      // ==========================================
      // PRODUCT RECOMMENDATION
      // ==========================================

      case "RECOMMEND": {

        const recommendation = products.find((product) => {

          const keywordMatch =
            product.keywords?.some((keyword) =>
              normalize(message).includes(keyword.toLowerCase())
            );

          const applicationMatch =
            product.applications?.some((application) =>
              normalize(message).includes(application.toLowerCase())
            );

          const industryMatch =
            product.industries?.some((industry) =>
              normalize(message).includes(industry.toLowerCase())
            );

          return (
            keywordMatch ||
            applicationMatch ||
            industryMatch
          );

        });

        if (!recommendation) {

          return Response.json({

            reply:
              `Please tell me your application or crop.

Example:
• Sugarcane
• Grass
• Bush
• Irrigation
• Vegetable Farming
• Paddy`

          });

        }

        let reply = "";

        reply += "✅ Recommended Product\n\n";

        reply += `Model : ${recommendation.model}\n`;
        reply += `Brand : ${recommendation.brand}\n`;
        reply += `Category : ${recommendation.category}\n\n`;

        if (recommendation.salesGuide?.salesPitch) {

          reply += recommendation.salesGuide.salesPitch;

          reply += "\n\n";

        }

        if (recommendation.salesGuide?.advantages?.length) {

          reply += "Advantages\n";

          recommendation.salesGuide.advantages.forEach((item) => {

            reply += `• ${item}\n`;

          });

          reply += "\n";

        }

        if (recommendation.specifications) {

          reply += "Key Specifications\n";

          Object.entries(
            recommendation.specifications
          ).forEach(([key, value]) => {

            reply += `• ${key}: ${value}\n`;

          });

        }

        return Response.json({

          reply

        });

      }
      // ==========================================
      // PRODUCT COMPARISON
      // ==========================================

      case "COMPARE": {

        const compareMatch = message.match(
          /([A-Za-z0-9.-]+)\s+(?:vs|VS|Vs|and|AND)\s+([A-Za-z0-9.-]+)/i
        );

        if (!compareMatch) {

          return Response.json({
            reply:
              "Please enter two product models.\n\nExample:\nME30A vs ME70A"
          });

        }

        const model1 = compareMatch[1].toLowerCase();
        const model2 = compareMatch[2].toLowerCase();

        const product1 = products.find(
          (p) => p.model.toLowerCase() === model1
        );

        const product2 = products.find(
          (p) => p.model.toLowerCase() === model2
        );

        if (!product1 || !product2) {

          return Response.json({
            reply:
              "Sorry, I couldn't find one or both product models."
          });

        }

        let reply = "";

        reply += "📊 Product Comparison\n\n";

        reply += `Product 1 : ${product1.model}\n`;
        reply += `Product 2 : ${product2.model}\n\n`;

        const specs = [
          ...new Set([
            ...Object.keys(product1.specifications || {}),
            ...Object.keys(product2.specifications || {})
          ])
        ];

        reply += "Specifications\n\n";

        specs.forEach((spec) => {

          reply += `${spec}\n`;

          reply += `• ${product1.model}: ${product1.specifications?.[spec] || "-"}\n`;

          reply += `• ${product2.model}: ${product2.specifications?.[spec] || "-"}\n\n`;

        });

        if (
          product1.salesGuide?.advantages?.length ||
          product2.salesGuide?.advantages?.length
        ) {

          reply += "Advantages\n\n";

          if (product1.salesGuide?.advantages?.length) {

            reply += `${product1.model}\n`;

            product1.salesGuide.advantages.forEach((item) => {
              reply += `• ${item}\n`;
            });

            reply += "\n";

          }

          if (product2.salesGuide?.advantages?.length) {

            reply += `${product2.model}\n`;

            product2.salesGuide.advantages.forEach((item) => {
              reply += `• ${item}\n`;
            });

            reply += "\n";

          }

        }

        if (
          product1.salesGuide?.limitations?.length ||
          product2.salesGuide?.limitations?.length
        ) {

          reply += "Limitations\n\n";

          if (product1.salesGuide?.limitations?.length) {

            reply += `${product1.model}\n`;

            product1.salesGuide.limitations.forEach((item) => {
              reply += `• ${item}\n`;
            });

            reply += "\n";

          }

          if (product2.salesGuide?.limitations?.length) {

            reply += `${product2.model}\n`;

            product2.salesGuide.limitations.forEach((item) => {
              reply += `• ${item}\n`;
            });

            reply += "\n";

          }

        }

        reply += "BON AI Recommendation\n\n";

        if (product1.salesGuide?.salesPitch) {

          reply += `${product1.model}\n`;
          reply += `${product1.salesGuide.salesPitch}\n\n`;

        }

        if (product2.salesGuide?.salesPitch) {

          reply += `${product2.model}\n`;
          reply += `${product2.salesGuide.salesPitch}\n`;

        }

        return Response.json({
          reply
        });

      }
      // ==========================================
      // ACCESSORIES
      // ==========================================

      case "ACCESSORIES": {

        const product = findProduct(message);

        if (!product) {

          return Response.json({
            reply: "Please mention a product model."
          });

        }

        let reply = `🔧 Accessories for ${product.model}\n\n`;

        if (product.recommendedAccessories?.length) {

          product.recommendedAccessories.forEach((item) => {
            reply += `• ${item}\n`;
          });

        } else {

          reply += "No accessories available.";

        }

        return Response.json({
          reply
        });

      }

      // ==========================================
      // SPARE PARTS
      // ==========================================

      case "SPARE_PARTS": {

        const product = findProduct(message);

        if (!product) {

          return Response.json({
            reply: "Please mention a product model."
          });

        }

        let reply = `⚙ Spare Parts for ${product.model}\n\n`;

        if (product.spareParts?.length) {

          product.spareParts.forEach((item) => {
            reply += `• ${item}\n`;
          });

        } else {

          reply += "No spare parts available.";

        }

        return Response.json({
          reply
        });

      }

      // ==========================================
      // MAINTENANCE
      // ==========================================

      case "MAINTENANCE": {

        const product = findProduct(message);

        if (!product) {

          return Response.json({
            reply: "Please mention a product model."
          });

        }

        let reply = `🛠 Maintenance Schedule\n\n`;

        reply += `${product.model}\n\n`;

        if (product.maintenance?.daily?.length) {

          reply += "Daily\n";

          product.maintenance.daily.forEach((item) => {
            reply += `• ${item}\n`;
          });

          reply += "\n";

        }

        if (product.maintenance?.weekly?.length) {

          reply += "Weekly\n";

          product.maintenance.weekly.forEach((item) => {
            reply += `• ${item}\n`;
          });

          reply += "\n";

        }

        if (product.maintenance?.monthly?.length) {

          reply += "Monthly\n";

          product.maintenance.monthly.forEach((item) => {
            reply += `• ${item}\n`;
          });

        }

        return Response.json({
          reply
        });

      }

      // ==========================================
      // WARRANTY
      // ==========================================

      case "WARRANTY": {

        const product = findProduct(message);

        if (!product) {

          return Response.json({
            reply: "Please mention a product model."
          });

        }

        let reply = `🛡 Warranty\n\n`;

        reply += `Model : ${product.model}\n\n`;

        if (product.warranty) {

          Object.entries(product.warranty).forEach(([key, value]) => {
            reply += `• ${key}: ${value}\n`;
          });

        } else {

          reply += "Warranty information unavailable.";

        }

        return Response.json({
          reply
        });

      }

      // ==========================================
      // SAFETY
      // ==========================================

      case "SAFETY": {

        const product = findProduct(message);

        if (!product) {

          return Response.json({
            reply: "Please mention a product model."
          });

        }

        let reply = `⚠ Safety Instructions\n\n`;

        reply += `${product.model}\n\n`;

        if (product.safety?.ppe?.length) {

          reply += "PPE Required\n";

          product.safety.ppe.forEach((item) => {
            reply += `• ${item}\n`;
          });

          reply += "\n";

        }

        if (product.safety?.warnings?.length) {

          reply += "Warnings\n";

          product.safety.warnings.forEach((item) => {
            reply += `• ${item}\n`;
          });

        } else {

          reply += "No safety information available.";

        }

        return Response.json({
          reply
        });

      }
      // ==========================================
      // FAQ
      // ==========================================

      case "FAQ": {

        const product = findProduct(message);

        if (!product || !product.faqs?.length) {
          break;
        }

        const question = normalize(message);

        const faq = product.faqs.find((item) =>
          question.includes(
            item.question.toLowerCase().replace("?", "")
          )
        );

        if (faq) {

          return Response.json({
            reply: `Q. ${faq.question}\n\nA. ${faq.answer}`
          });

        }

        let reply = "Frequently Asked Questions\n\n";

        product.faqs.forEach((item) => {

          reply += `Q. ${item.question}\n`;
          reply += `A. ${item.answer}\n\n`;

        });

        return Response.json({
          reply
        });

      }

      // ==========================================
      // SALES PITCH
      // ==========================================

      case "SALES_PITCH": {

        const product = findProduct(message);

        if (!product) {
          break;
        }

        let reply = `💚 Why Buy ${product.model}?\n\n`;

        if (product.salesGuide?.salesPitch) {

          reply += product.salesGuide.salesPitch;
          reply += "\n\n";

        }

        if (product.salesGuide?.advantages?.length) {

          reply += "Advantages\n";

          product.salesGuide.advantages.forEach((item) => {
            reply += `• ${item}\n`;
          });

          reply += "\n";

        }

        if (product.salesAssistant?.closingStatement) {

          reply += product.salesAssistant.closingStatement;

        }

        return Response.json({
          reply
        });

      }

      // ==========================================
      // BRUSH CUTTER ASSISTANT
      // ==========================================

      case "BRUSH_CUTTER": {

        return Response.json({

          reply:
            `Certainly! I can help you choose the right Brush Cutter.

What will you mainly use it for?

1. Sugarcane
2. Grass
3. Bush
4. Paddy
5. Other

Please reply with the option number or crop name.`

        });

      }

      // ==========================================
      // BON AI IDENTITY
      // ==========================================

      case "IDENTITY": {

        return Response.json({

          reply:
            `I am BON AI, the official AI Assistant of Bonhoeffer Machines Pvt. Ltd.

I help customers, dealers and sales teams by providing product recommendations, comparisons, specifications, maintenance guidance and technical support.

Designed and developed by Keshav Ranjan.

💚 Proudly built for Bonhoeffer Machines.`

        });

      }
      // ==========================================
// TOP OPPORTUNITIES
// ==========================================

case "TOP_OPPORTUNITIES": {

  console.log("✅ TOP_OPPORTUNITIES CASE EXECUTED");

  if (!accessToken) {
    return Response.json({
      reply: "Please login to Salesforce first."
    });
  }

  try {

    const reply = await getTopOpportunitiesSummary(accessToken);

    return Response.json({
      reply
    });

  } catch (error) {

    console.error(error);

    return Response.json({
      reply: "Failed to fetch Top Opportunities."
    });

  }

}

case "TOP_DOMESTIC_OPPORTUNITIES": {

  console.log("✅ TOP_DOMESTIC_OPPORTUNITIES CASE EXECUTED");

  if (!accessToken) {
    return Response.json({
      reply: "Please login to Salesforce first."
    });
  }

  try {

    const reply = await getTopOpportunitiesSummary(
      accessToken,
      "Domestic"
    );

    return Response.json({
      reply
    });

  } catch (error) {

    console.error(error);

    return Response.json({
      reply: "Failed to fetch Domestic Opportunities."
    });

  }

}

case "TOP_INTERNATIONAL_OPPORTUNITIES": {

  console.log("✅ TOP_INTERNATIONAL_OPPORTUNITIES CASE EXECUTED");

  if (!accessToken) {
    return Response.json({
      reply: "Please login to Salesforce first."
    });
  }

  try {

    const reply = await getTopOpportunitiesSummary(
      accessToken,
      "International"
    );

    return Response.json({
      reply
    });

  } catch (error) {

    console.error(error);

    return Response.json({
      reply: "Failed to fetch International Opportunities."
    });

  }

}

case "MONTHLY_BUSINESS": {
  const summary = await getMonthlyBusinessSummary(accessToken);

  return Response.json({
    reply: summary,
  });
}

// ==========================================
// GEMINI FALLBACK
// ==========================================

      default: {

        console.log("❌ DEFAULT (GEMINI) CASE EXECUTED");

        const model = genAI.getGenerativeModel({
          model: "gemini-flash-latest"
        });

       const prompt = `
You are BON AI, the official AI Assistant of Bonhoeffer Machines Pvt. Ltd.

====================================================
BON AI SALESFORCE KNOWLEDGE
====================================================

${salesforceKnowledge}

====================================================
END OF SALESFORCE KNOWLEDGE
====================================================

Conversation History:
${JSON.stringify(history, null, 2)}

Current User Message:
${message}

Rules:
1. Answer professionally.
2. Use previous conversation for follow-up questions.
3. Never invent technical specifications.
4. Never create fake Bonhoeffer models.
5. Recommend Bonhoeffer products whenever suitable.
6. Keep answers concise and helpful.
7. If Salesforce knowledge contains the answer, ALWAYS use it first.
8. If Salesforce knowledge does not contain the answer, then answer using Gemini.
9. Never say you don't know without checking the Salesforce knowledge first.
`;
try {

  const result = await model.generateContent(prompt);

  return Response.json({
    reply: result.response.text()
  });

} catch (error) {

  console.error("Gemini Error:", error);

  return Response.json({
    reply: `Gemini Error: ${error.message}`
  });

}

      }

    }

  } catch (error) {

    console.error(error);

    return Response.json(
      {
        reply: "Sorry, BON AI is temporarily unavailable. Please try again later."
      },
      {
        status: 500
      }
    );

  }

}