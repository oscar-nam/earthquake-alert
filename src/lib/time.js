export function getRelativeTime(date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3_600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return minutes === 1 ? 'a minute ago' : `${minutes} minutes ago`;
  }
  if (diffInSeconds < 86_400) {
    const hours = Math.floor(diffInSeconds / 3_600);
    return hours === 1 ? 'an hour ago' : `${hours} hours ago`;
  }
  if (diffInSeconds < 2_592_000) {
    const days = Math.floor(diffInSeconds / 86_400);
    return days === 1 ? 'a day ago' : `${days} days ago`;
  }
  if (diffInSeconds < 31_536_000) {
    const months = Math.floor(diffInSeconds / 2_592_000);
    return months === 1 ? 'a month ago' : `${months} months ago`;
  }
  const years = Math.floor(diffInSeconds / 31_536_000);
  return years === 1 ? 'a year ago' : `${years} years ago`;
}
