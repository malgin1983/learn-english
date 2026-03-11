import Link from "next/link";
import styles from "./AppNav.module.css";
import { ROUTES, type RouteHref } from "@/shared/config/routes";

type AppNavProps = {
  activeHref?: RouteHref;
};

export function AppNav({ activeHref }: AppNavProps) {
  return (
    <nav className={styles.nav} aria-label="Навигация">
      <Link className={styles.brand} href="/">
        <span className={styles.brandPart1}>English</span>{" "}
        <span className={styles.brandPart2}>Learn</span>
      </Link>

      <div className={styles.navLinks}>
        {ROUTES.map((route) => {
          const isActive = route.href === activeHref;
          return (
            <Link
              key={route.href}
              href={route.href}
              className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              {route.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
