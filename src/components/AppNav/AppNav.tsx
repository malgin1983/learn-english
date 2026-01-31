import Link from "next/link";
import styles from "@/shared/styles/appShell.module.css";
import { ROUTES, type RouteHref } from "@/shared/config/routes";

type Props = {
  activeHref?: RouteHref;
};

export default function AppNav({ activeHref }: Props) {
  return (
    <nav className={styles.nav} aria-label="Навигация">
      <Link className={styles.brand} href="/">
        English Learn
      </Link>

      <div className={styles.navLinks}>
        {ROUTES.map((r) => {
          const isActive = r.href === activeHref;
          return (
            <Link
              key={r.href}
              href={r.href}
              className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              {r.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

