import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      accessToken,
      instanceUrl,
      name,
      company,
      email,
      phone,
      designation,
    } = await req.json();
    console.log("========== REQUEST DATA ==========");
console.log("accessToken:", accessToken);
console.log("instanceUrl:", instanceUrl);
console.log("==================================");

    const lastName =
      name && name.trim().length > 0 ? name.trim() : "Unknown";

    // Default follow-up date = Tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const followUpDate = tomorrow.toISOString().split("T")[0];

    const response = await fetch(
      `${instanceUrl}/services/data/v67.0/sobjects/Lead`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          LastName: lastName,
          Company: company || "Unknown",
          Email: email || "",

          // Your validation requires MobilePhone
          MobilePhone: phone || "",

          // Keep Phone also
          Phone: phone || "",

          Title: designation || "",

          // Required fields
          Country: "India",
          State: "Haryana",

          // Required by your validation rule
          Next_Follow_Up_Date__c: followUpDate,
          Follow_Up_Not_Required__c: false,
        }),
      }
    );

    const data = await response.json();

    console.log("========== SALESFORCE RESPONSE ==========");
    console.log(data);
    console.log("=========================================");

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      leadId: data.id,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}