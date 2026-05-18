import { pbkdf2Sync, randomBytes, timingSafeEqual } from "node:crypto"

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("base64url")
  const iterations = 210000
  const hash = pbkdf2Sync(password, salt, iterations, 32, "sha256").toString("base64url")
  return `pbkdf2$${iterations}$${salt}$${hash}`
}

export function verifyPassword(password: string, storedHash: string) {
  const [scheme, iterationValue, salt, hash] = storedHash.split("$")

  if (scheme !== "pbkdf2" || !iterationValue || !salt || !hash) {
    return false
  }

  const iterations = Number(iterationValue)
  const candidate = pbkdf2Sync(password, salt, iterations, 32, "sha256")
  const expected = Buffer.from(hash, "base64url")

  return expected.length === candidate.length && timingSafeEqual(candidate, expected)
}
