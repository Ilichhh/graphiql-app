import { Timestamp } from 'firebase/firestore';

export const useTimestamp = (timestamp: Timestamp): string => {
  const currentDate = timestamp.toDate();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const now = new Date();

  if (
    currentYear === now.getFullYear() &&
    currentMonth === now.getMonth() &&
    currentDay === now.getDate()
  ) {
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const month = currentMonth.toString().padStart(2, '0');
  const year = currentYear.toString().substring(2);
  return `${currentDay}/${month}/${year}`;
};
