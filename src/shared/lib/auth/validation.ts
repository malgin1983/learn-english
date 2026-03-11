import { MAX_EMAIL_LENGTH } from "./constants";

/**
 * Минимальная проверка формата email для форм регистрации/логина.
 * Строгая валидация — на бэкенде (БД, API).
 */
export function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  return (
    trimmed.includes("@") &&
    trimmed.includes(".") &&
    trimmed.length <= MAX_EMAIL_LENGTH
  );
}
