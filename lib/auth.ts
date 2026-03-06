/**
 * Shared auth config. Use JWT_SECRET in production; fallback only for dev.
 */
const DEV_FALLBACK = 'dev-secret-change-in-production';

export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (secret && secret.length >= 32) return secret;
  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET must be set in production (min 32 chars)');
  }
  return DEV_FALLBACK;
}
