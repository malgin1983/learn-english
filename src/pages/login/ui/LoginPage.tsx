"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "@/pages/login/actions";
import { AuthSubmitButton } from "@/shared/ui/AuthSubmitButton";
import styles from "./LoginPage.module.css";

const initialState = { error: null as string | null };

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <h1 className={styles.title}>Вход</h1>
        <p className={styles.subtitle}>Введите email и пароль от аккаунта</p>

        <form className={styles.form} action={formAction}>
          {state?.error && <div className={styles.globalError}>{state.error}</div>}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              className={styles.input}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="login-password">
              Пароль
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              className={styles.input}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>
          <AuthSubmitButton pendingChildren="Вход…">Войти</AuthSubmitButton>
        </form>

        <p className={styles.footer}>
          Нет аккаунта?
          <Link href="/register" className={styles.footerLink}>
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
}
