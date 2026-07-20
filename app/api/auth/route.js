import { NextResponse } from "next/server";
import crypto from "crypto";

// Base64 URL Encode
function base64url(buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

export async function GET() {
  // Generate PKCE Code Verifier
  const codeVerifier = base64url(crypto.randomBytes(32));

  // Generate PKCE Code Challenge
  const codeChallenge = base64url(
    crypto.createHash("sha256").update(codeVerifier).digest()
  );

  // Build Salesforce Authorization URL
  const authUrl =
    `${process.env.SALESFORCE_LOGIN_URL}/services/oauth2/authorize?` +
    new URLSearchParams({
      response_type: "code",
      client_id: process.env.SALESFORCE_CLIENT_ID,
      redirect_uri: process.env.SALESFORCE_REDIRECT_URI,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    });

  // Redirect to Salesforce
  const response = NextResponse.redirect(authUrl);

  // Save PKCE verifier in cookie
  response.cookies.set("pkce_verifier", codeVerifier, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });

  return response;
}