import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Missing authorization code" },
      { status: 400 }
    );
  }

  const codeVerifier = request.cookies.get("pkce_verifier")?.value;

  if (!codeVerifier) {
    return NextResponse.json(
      { error: "Missing PKCE code verifier" },
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
        code,
        client_id: process.env.SALESFORCE_CLIENT_ID,
        client_secret: process.env.SALESFORCE_CLIENT_SECRET,
        redirect_uri: process.env.SALESFORCE_REDIRECT_URI,
        code_verifier: codeVerifier,
      }),
    }
  );

  const tokenData = await tokenResponse.json();

  console.log("========== TOKEN RESPONSE ==========");
  console.log(tokenData);
  console.log("====================================");

  if (!tokenResponse.ok) {
    return NextResponse.json(tokenData, {
      status: tokenResponse.status,
    });
  }

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/oauth-success?accessToken=${encodeURIComponent(
      tokenData.access_token
    )}&instanceUrl=${encodeURIComponent(tokenData.instance_url)}`
  );
}