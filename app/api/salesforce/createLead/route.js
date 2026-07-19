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

    const lastName =
      name && name.trim().length > 0 ? name.trim() : "Unknown";

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
          Phone: phone || "",
          Title: designation || "",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: data,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      leadId: data.id,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}