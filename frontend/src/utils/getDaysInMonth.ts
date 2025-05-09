export function getDaysInMonth(date: Date): { date: Date; isCurrentMonth: boolean }[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: { date: Date; isCurrentMonth: boolean }[] = [];

  // Dias anteriores
  const startWeekDay = firstDay.getDay();
  for (let i = startWeekDay; i > 0; i--) {
    days.push({
      date: new Date(year, month, 1 - i),
      isCurrentMonth: false,
    });
  }

  // Dias do mês atual
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }

  // Dias seguintes até completar 42 dias
  while (days.length < 42) {
    const nextDate = new Date(year, month, days.length - startWeekDay + 1);
    days.push({
      date: nextDate,
      isCurrentMonth: false,
    });
  }

  return days;
}
