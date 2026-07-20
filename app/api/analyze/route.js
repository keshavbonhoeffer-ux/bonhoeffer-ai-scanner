import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { image } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
    });

    const prompt = `
You are an OCR engine.

Read the business card carefully and extract the information.

Return ONLY valid JSON.

{
  "name":"",
  "designation":"",
  "company":"",
  "email":"",
  "phone":"
}

Rules:
- Return only JSON.
- Do not use markdown.
- Do not use \`\`\`.
- If a value is missing, return an empty string.
`;

    const result = await model.generateContent([
      {
        inlineData: {
          data: image,
          mimeType: "image/jpeg",
        },
      },
      {
        text: prompt,
      },
    ]);

    const response = await result.response;
    const text = response.text().trim();

    console.log("========== GEMINI RESPONSE ==========");
    console.log(text);
    console.log("=====================================");

    let json;

    try {
      json = JSON.parse(text);
    } catch {
      return Response.json({
        success: false,
        error: "Gemini returned invalid JSON",
        raw: text,
      });
    }

    return Response.json({
      success: true,
      result: json,
    });

  } catch (error) {
    console.error(error);

    return Response.json({
      success: false,
      error: error.message,
    });
  }
}