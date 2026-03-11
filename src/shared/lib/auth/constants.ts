/** Сообщения об ошибках для форм входа и регистрации (единый источник правды) */
export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  missing_credentials: "Введите email и пароль",
  invalid_credentials: "Неверный email или пароль",
  invalid_email: "Введите корректный email",
  password_too_short: "Пароль должен быть не короче 8 символов",
  email_taken: "Этот email уже зарегистрирован",
  bad_request: "Ошибка запроса. Попробуйте ещё раз.",
} as const;

export const MIN_PASSWORD_LENGTH = 8;

export const MAX_EMAIL_LENGTH = 254;
