import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const code = request.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        {
          success: false,
          message: "Authorization code not received.",
        },
        { status: 400 }
      );
    }

    const tokenResponse = await fetch(
      `${process.env.SALESFORCE_LOGIN_URL}/services/oauth2/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: process.env.SALESFORCE_CLIENT_ID,
          client_secret: process.env.SALESFORCE_CLIENT_SECRET,
          redirect_uri: process.env.SALESFORCE_CALLBACK_URL,
          code,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: tokenData,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      accessToken: tokenData.access_token,
      instanceUrl: tokenData.instance_url,
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