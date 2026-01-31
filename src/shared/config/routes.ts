export type RouteHref = "/" | "/learn-words" | "/review-words" | "/exercises";

export const ROUTES: Array<{ href: RouteHref; label: string }> = [
  { href: "/", label: "Главная" },
  { href: "/learn-words", label: "Изучаем слова" },
  { href: "/review-words", label: "Вспоминаем слова" },
  { href: "/exercises", label: "Упражнения" },
];

