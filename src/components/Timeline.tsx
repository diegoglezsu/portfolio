export interface TimelineItem {
  date: string;
  title: string;
  subtitle: string;
  description?: string;
}

interface Props {
  items: TimelineItem[];
}

export default function Timeline({ items }: Props) {
  return (
    <>
      <style>{`
        @keyframes pulse-beacon {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 0 0 rgba(55, 65, 81, 0.7);
          }
          50% {
            opacity: 0.8;
            box-shadow: 0 0 0 6px rgba(55, 65, 81, 0);
          }
        }
        .timeline-active {
          animation: pulse-beacon 2s infinite;
        }
      `}</style>
      <ol className="relative border-l border-gray-200 dark:border-gray-700 space-y-8 ml-3">
        {items.map((item, index) => {
          const isPresent = item.date.toLowerCase().includes("present");
          return (
            <li key={index} className="pl-6">
              <span
                className={`absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-white dark:border-gray-950 ${
                  isPresent
                    ? "bg-gray-800 dark:bg-gray-300 timeline-active"
                    : "bg-gray-400 dark:bg-gray-500"
                }`}
              />
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-1">
                {item.date}
              </p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {item.title}
              </p>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                {item.subtitle}
              </p>
              {item.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </>
  );
}
