export const useTimestamp = (timestamp: number): string => {
  const currentDate = new Date(timestamp);

  if (currentDate.toDateString() === new Date().toDateString()) {
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const month = currentDate.getMonth().toString().padStart(2, '0');
  const year = currentDate.getFullYear().toString().substring(2);
  return `${currentDate.getDate()}/${month}/${year}`;
};
