import Link from "next/link";
import styles from "@/shared/styles/appShell.module.css";
import { AppShell } from "@/layouts/AppShell";

export default function HomePage() {
  return (
    <AppShell activeHref="/">
      <header className={styles.header}>
        <h1>English Learn</h1>
        <p>Выберите раздел, чтобы начать.</p>
      </header>

      <section className={styles.widgets} aria-label="Разделы">
        <Link className={styles.widgetCard} href="/learn-words">
          <div className={styles.widgetTitle}>Изучаем слова</div>
          <div className={styles.widgetDesc}>Добавление и изучение новых слов.</div>
        </Link>

        <Link className={styles.widgetCard} href="/review-words">
          <div className={styles.widgetTitle}>Вспоминаем слова</div>
          <div className={styles.widgetDesc}>
            Повторение и закрепление изученных слов.
          </div>
        </Link>

        <Link className={styles.widgetCard} href="/exercises">
          <div className={styles.widgetTitle}>Упражнения</div>
          <div className={styles.widgetDesc}>Небольшие задания для практики.</div>
        </Link>
      </section>
    </AppShell>
  );
}
