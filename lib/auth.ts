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

/** Get admin JWT from Authorization header or admin_token cookie (for when localStorage is blocked) */
export function getAdminTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) return authHeader.substring(7);
  const cookies = request.headers.get('cookie');
  if (!cookies) return null;
  const match = cookies.match(/admin_token=([^;]+)/);
  return match ? match[1].trim() : null;
}
