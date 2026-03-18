const nonceStore = new Map<string, number>();

export function issueNonce(ttlMs = 5 * 60 * 1000) {
  const nonce = crypto.randomUUID();
  nonceStore.set(nonce, Date.now() + ttlMs);
  return nonce;
}

export function consumeNonce(nonce: string) {
  const expiresAt = nonceStore.get(nonce);
  if (!expiresAt) return { ok: false as const, reason: "NOT_FOUND" };
  if (Date.now() > expiresAt) {
    nonceStore.delete(nonce);
    return { ok: false as const, reason: "EXPIRED" };
  }
  nonceStore.delete(nonce);
  return { ok: true as const };
}

