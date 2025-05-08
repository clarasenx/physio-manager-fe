export function getDaysInMonth(date: Date): Date[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: Date[] = [];

  // Pega os dias da semana anterior para completar a grade
  const prevDays = firstDay.getDay();
  for (let i = prevDays; i > 0; i--) {
    days.push(new Date(year, month, 1 - i));
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }

  // Pega dias seguintes até completar múltiplos de 7
  const total = days.length;
  const remaining = 7 - (total % 7);
  for (let i = 1; i <= remaining; i++) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
}