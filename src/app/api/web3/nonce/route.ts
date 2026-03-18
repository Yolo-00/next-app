import { NextResponse } from "next/server";
import { issueNonce } from "@/lib/web3/nonce-store";

export async function GET() {
  const nonce = issueNonce();
  return NextResponse.json({ code: "OK", nonce });
}

