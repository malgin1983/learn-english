import type { ReactNode } from "react";
import styles from "@/shared/styles/appShell.module.css";
import { AppNav } from "@/components/AppNav";
import type { RouteHref } from "@/shared/config/routes";

type Props = {
  activeHref?: RouteHref;
  children: ReactNode;
};

export default function AppShell({ activeHref, children }: Props) {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <AppNav activeHref={activeHref} />
        {children}
      </main>
      <div className={styles.authButtons}>
        <a href="/login" className={styles.navLink}>Login</a>
        <a href="/register" className={styles.navLink}>Register</a>
      </div>
    </div>
  );
}

