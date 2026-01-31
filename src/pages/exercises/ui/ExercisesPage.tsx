import styles from "@/shared/styles/appShell.module.css";
import { AppShell } from "@/layouts/AppShell";

export default function ExercisesPage() {
  return (
    <AppShell activeHref="/exercises">
      <header className={styles.header}>
        <h1>Упражнения</h1>
        <p>Шаблон страницы. Здесь будут упражнения для практики.</p>
      </header>

      <div className={styles.placeholder}>
        Раздел в разработке. Можно будет добавить упражнения: выбор перевода,
        “вставь слово”, аудирование, и составление фраз.
      </div>
    </AppShell>
  );
}

