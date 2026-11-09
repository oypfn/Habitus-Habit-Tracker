export function toDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function addDays(date, amount) {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  next.setDate(next.getDate() + amount);
  return next;
}

export function getWeekDates(date = new Date()) {
  const day = date.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = addDays(date, mondayOffset);
  return Array.from({ length: 7 }, (_, index) => addDays(monday, index));
}

export function getCurrentStreak(completionDates, today = new Date()) {
  const completed = new Set(completionDates);
  const todayKey = toDateKey(today);
  const yesterdayKey = toDateKey(addDays(today, -1));
  let cursor = completed.has(todayKey) ? today : completed.has(yesterdayKey) ? addDays(today, -1) : null;
  if (!cursor) return 0;

  let streak = 0;
  while (completed.has(toDateKey(cursor))) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

export function getWeeklyCompletion(habits, weekDates) {
  return weekDates.map(date => {
    const key = toDateKey(date);
    const eligible = habits.filter(habit => !habit.createdAt || habit.createdAt <= key);
    const completed = eligible.filter(habit => Array.isArray(habit.completions) && habit.completions.includes(key)).length;
    return { date: key, completed, total: eligible.length, percent: eligible.length ? Math.round(completed / eligible.length * 100) : 0 };
  });
}
