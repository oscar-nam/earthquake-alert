import { cn } from "@/lib/utils"
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

function getRelativeTime(date) {
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

function formatDate(date) {
  const locale =
    typeof window === 'undefined' ? 'en-NZ' : window.navigator.language;
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const Timestamp = React.forwardRef(
  ({ date, className, ...props }, ref) => {
    const [relativeTime, setRelativeTime] = //
      React.useState(getRelativeTime(date));

    React.useEffect(() => {
      const interval = setInterval(() => {
        setRelativeTime(getRelativeTime(date));
      }, 60_000);
      return () => clearInterval(interval);
    }, [date]);

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <time
              ref={ref}
              dateTime={date.toISOString()}
              suppressHydrationWarning
              className={cn(
                'flex items-center text-muted-foreground',
                className,
              )}
              {...props}
            >
              <CalendarIcon className="mr-1 size-4" />
              <span className="text-xs">{relativeTime}</span>
            </time>
          </TooltipTrigger>

          <TooltipContent>
            <p>{formatDate(date)}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  },
);

Timestamp.displayName = 'Timestamp';

export { Timestamp };