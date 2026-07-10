// src/auth/session.ts
// Path sensible del LAB de guardrails (Dominio 6): cualquier cambio acá
// requiere review de CODEOWNERS antes de mergear a main.

export type Session = {
  userId: string;
  issuedAt: number;
  ttlSeconds: number;
};

export function createSession(userId: string, now: number = Date.now()): Session {
  return {
    userId,
    issuedAt: now,
    ttlSeconds: 3600,
  };
}

export function isExpired(session: Session, now: number = Date.now()): boolean {
  return now > session.issuedAt + session.ttlSeconds * 1000;
}

export function refreshSession(session: Session, now: number = Date.now()): Session {
  return {
    userId: session.userId,
    issuedAt: now,
    ttlSeconds: session.ttlSeconds,
  };
}
