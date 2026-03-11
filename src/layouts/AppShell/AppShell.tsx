import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./AppShell.module.css";
import { AppNav } from "@/widgets/AppNav";
import type { RouteHref } from "@/shared/config/routes";

type AppShellProps = {
  activeHref?: RouteHref;
  children: ReactNode;
};

export default function AppShell({ activeHref, children }: AppShellProps) {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <AppNav activeHref={activeHref} />
        {children}
      </main>
      <div className={styles.authButtons} role="navigation" aria-label="Авторизация">
        <Link href="/login" className={styles.authLink}>
          Вход
        </Link>
        <Link href="/register" className={styles.authLink}>
          Регистрация
        </Link>
      </div>
    </div>
  );
}

