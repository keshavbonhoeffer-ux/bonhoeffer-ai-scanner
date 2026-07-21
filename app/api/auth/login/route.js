import { NextResponse } from "next/server";
import crypto from "crypto";

function base64url(buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

export async function GET() {
  const codeVerifier = base64url(crypto.randomBytes(32));

  const codeChallenge = base64url(
    crypto.createHash("sha256").update(codeVerifier).digest()
  );

  const authUrl =
    `${process.env.SALESFORCE_LOGIN_URL}/services/oauth2/authorize?` +
    new URLSearchParams({
      response_type: "code",
      client_id: process.env.SALESFORCE_CLIENT_ID,
      redirect_uri: process.env.SALESFORCE_REDIRECT_URI,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    });

  const response = NextResponse.redirect(authUrl);

  response.cookies.set("pkce_verifier", codeVerifier, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 600,
  });

  return response;
}