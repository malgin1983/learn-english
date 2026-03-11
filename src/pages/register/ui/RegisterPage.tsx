"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerAction } from "@/pages/register/actions";
import { AuthSubmitButton } from "@/shared/ui/AuthSubmitButton";
import styles from "./RegisterPage.module.css";

const initialState = { error: null as string | null };

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerAction, initialState);

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <h1 className={styles.title}>Регистрация</h1>
        <p className={styles.subtitle}>Создайте аккаунт, чтобы сохранять прогресс</p>

        <form className={styles.form} action={formAction}>
          {state?.error && <div className={styles.globalError}>{state.error}</div>}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="register-email">
              Email
            </label>
            <input
              id="register-email"
              name="email"
              type="email"
              className={styles.input}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="register-password">
              Пароль
            </label>
            <input
              id="register-password"
              name="password"
              type="password"
              className={styles.input}
              placeholder="Минимум 8 символов"
              autoComplete="new-password"
              required
              minLength={8}
            />
          </div>
          <AuthSubmitButton pendingChildren="Регистрация…">
            Зарегистрироваться
          </AuthSubmitButton>
        </form>

        <p className={styles.footer}>
          Уже есть аккаунт?
          <Link href="/login" className={styles.footerLink}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
