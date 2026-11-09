import test from 'node:test';
import assert from 'node:assert/strict';
import { addDays, getCurrentStreak, getWeekDates, getWeeklyCompletion, toDateKey } from './dateUtils.js';

test('date keys use local calendar components', () => {
  assert.equal(toDateKey(new Date(2026, 10, 9)), '2026-11-09');
});

test('week starts on Monday and contains seven consecutive days', () => {
  const dates = getWeekDates(new Date(2026, 10, 11));
  assert.equal(toDateKey(dates[0]), '2026-11-09');
  assert.equal(toDateKey(dates[6]), '2026-11-15');
});

test('week handles Sunday by returning the previous Monday', () => {
  const dates = getWeekDates(new Date(2026, 10, 15));
  assert.equal(toDateKey(dates[0]), '2026-11-09');
});

test('streak counts consecutive days including today', () => {
  const today = new Date(2026, 10, 9);
  assert.equal(getCurrentStreak(['2026-11-07', '2026-11-08', '2026-11-09'], today), 3);
});

test('streak can continue from yesterday when today is not complete', () => {
  assert.equal(getCurrentStreak(['2026-11-07', '2026-11-08'], new Date(2026, 10, 9)), 2);
});

test('streak is zero after a missed day', () => {
  assert.equal(getCurrentStreak(['2026-11-07'], new Date(2026, 10, 9)), 0);
});

test('weekly completion ignores habits created after a given date', () => {
  const result = getWeeklyCompletion([
    { createdAt: '2026-11-10', completions: ['2026-11-10'] },
    { createdAt: '2026-11-01', completions: ['2026-11-10'] }
  ], [new Date(2026, 10, 9), new Date(2026, 10, 10)]);
  assert.deepEqual(result.map(day => [day.total, day.completed, day.percent]), [[1, 0, 0], [2, 2, 100]]);
});

test('addDays crosses month boundaries safely', () => {
  assert.equal(toDateKey(addDays(new Date(2026, 0, 31), 1)), '2026-02-01');
});
