"use client";

import { useFormStatus } from "react-dom";
import styles from "./AuthSubmitButton.module.css";

type Props = {
  children: string;
  pendingChildren: string;
};

export function AuthSubmitButton({ children, pendingChildren }: Props) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={styles.submit} disabled={pending}>
      {pending ? pendingChildren : children}
    </button>
  );
}
