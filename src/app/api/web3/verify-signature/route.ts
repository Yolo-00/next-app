import { NextResponse } from "next/server";
import { verifyMessage, getAddress } from "viem";

import { consumeNonce } from "@/lib/web3/nonce-store";
import { supportedChains } from "@/lib/web3/contracts.config";

type VerifyPayload = {
  message: string;
  signature: `0x${string}`;
  address: `0x${string}`;
  nonce: string;
  domain: string;
  uri: string;
  chainId: number;
  issuedAt: string;
  expirationTime: string;
};

function errorResponse(code: string, message: string, status = 400) {
  return NextResponse.json({ code, message }, { status });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<VerifyPayload>;
    const url = new URL(request.url);
    const host = url.host;
    const origin = url.origin;

    if (!body.message || !body.signature || !body.address) {
      return errorResponse("INVALID_PAYLOAD", "Missing required fields.");
    }

    if (!body.nonce) {
      return errorResponse("NONCE_REQUIRED", "Nonce is required.");
    }

    if (!body.domain || body.domain !== host) {
      return errorResponse("DOMAIN_MISMATCH", "Domain mismatch.");
    }

    if (!body.uri || !body.uri.startsWith(origin)) {
      return errorResponse("URI_MISMATCH", "URI mismatch.");
    }

    if (!body.chainId || !supportedChains.includes(body.chainId)) {
      return errorResponse("CHAIN_UNSUPPORTED", "Unsupported chain id.");
    }

    if (!body.issuedAt || !body.expirationTime) {
      return errorResponse("TIME_FIELDS_REQUIRED", "Missing time fields.");
    }

    const issuedAt = Date.parse(body.issuedAt);
    const expirationTime = Date.parse(body.expirationTime);
    if (Number.isNaN(issuedAt) || Number.isNaN(expirationTime)) {
      return errorResponse("INVALID_TIME", "Invalid time format.");
    }

    if (Date.now() > expirationTime) {
      return errorResponse("MESSAGE_EXPIRED", "Message expired.");
    }

    const nonceCheck = consumeNonce(body.nonce);
    if (!nonceCheck.ok) {
      return errorResponse(
        nonceCheck.reason === "EXPIRED" ? "NONCE_EXPIRED" : "NONCE_INVALID",
        "Nonce invalid or already used."
      );
    }

    const normalizedAddress = getAddress(body.address);
    const isValid = await verifyMessage({
      address: normalizedAddress,
      message: body.message,
      signature: body.signature,
    });

    if (!isValid) {
      return errorResponse("INVALID_SIGNATURE", "Signature verification failed.");
    }

    const response = NextResponse.json({
      code: "OK",
      message: "Signature verified.",
      data: { address: normalizedAddress, chainId: body.chainId },
    });

    response.cookies.set("web3_demo_session", crypto.randomUUID(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("verify-signature error:", error);
    return errorResponse("SERVER_ERROR", "Internal server error.", 500);
  }
}

