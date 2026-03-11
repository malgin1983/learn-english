import styles from "./LearnWordsPage.module.css";
import { AppShell } from "@/layouts/AppShell";

export default function LearnWordsPage() {
  return (
    <AppShell activeHref="/learn-words">
      <header className={styles.header}>
        <h1>Изучаем слова</h1>
        <p>Шаблон страницы. Здесь будет функционал изучения новых слов.</p>
      </header>

      <div className={styles.placeholder}>
        Раздел в разработке. Можно будет добавить список слов, карточки, и режим
        изучения.
      </div>
    </AppShell>
  );
}

