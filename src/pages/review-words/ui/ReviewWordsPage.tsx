import styles from "./ReviewWordsPage.module.css";
import { AppShell } from "@/layouts/AppShell";

export default function ReviewWordsPage() {
  return (
    <AppShell activeHref="/review-words">
      <header className={styles.header}>
        <h1>Вспоминаем слова</h1>
        <p>Шаблон страницы. Здесь будет повторение изученных слов.</p>
      </header>

      <div className={styles.placeholder}>
        Раздел в разработке. Можно будет добавить интервальные повторения,
        “сегодня на повторение”, и быстрый тест.
      </div>
    </AppShell>
  );
}

