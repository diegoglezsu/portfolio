import React from "react";

export interface ContributionData {
  date: string;
  count: number;
}

interface ContributionGraphProps {
  contributions: ContributionData[];
}

const getContributionColor = (count: number): string => {
  if (count === 0) return "bg-gray-100 dark:bg-gray-700";
  if (count < 5) return "bg-green-200 dark:bg-green-900/40";
  if (count < 10) return "bg-green-400 dark:bg-green-700/60";
  if (count < 20) return "bg-green-600 dark:bg-green-600";
  return "bg-green-800 dark:bg-green-500";
};

export default function ContributionGraph({
  contributions,
}: ContributionGraphProps): React.ReactElement | null {
  if (contributions.length === 0) return null;

  // Group by year and week
  const startDate = new Date(contributions[0].date);
  const endDate = new Date(contributions[contributions.length - 1].date);

  // Get all dates as a map for quick lookup
  const contributionMap = new Map(contributions.map((c) => [c.date, c.count]));

  // Generate all dates in range
  const allDates: string[] = [];
  const current = new Date(startDate);
  while (current <= endDate) {
    allDates.push(current.toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }

  // Group by weeks
  const weeks: string[][] = [];
  let currentWeek: string[] = [];

  allDates.forEach((date) => {
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(date);
  });

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="inline-block">
          {/* Month labels */}
          <div className="flex ml-8 gap-1 mb-2">
            {weeks.map((week, idx) => {
              const month = new Date(week[0] + "T00:00:00").getMonth();
              const showLabel =
                idx === 0 ||
                new Date(weeks[idx - 1][0] + "T00:00:00").getMonth() !== month;
              return (
                <div
                  key={idx}
                  className="w-3 text-xs text-gray-600 dark:text-gray-400"
                >
                  {showLabel ? months[month] : ""}
                </div>
              );
            })}
          </div>

          {/* Contribution grid */}
          <div className="flex gap-1">
            {/* Day labels */}
            <div className="flex flex-col gap-1">
              {dayLabels.map((day, idx) => (
                <div
                  key={day}
                  className="h-3 w-8 text-xs text-gray-600 dark:text-gray-400 flex items-center justify-center"
                >
                  {day[0]}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="flex gap-1">
              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, dayIdx) => {
                    const date = week[dayIdx];
                    const count = date ? contributionMap.get(date) || 0 : 0;
                    return (
                      <div
                        key={dayIdx}
                        className={`h-3 w-3 rounded-sm cursor-help transition-opacity hover:opacity-80 ${getContributionColor(count)}`}
                        title={date ? `${date}: ${count} contributions` : ""}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 text-xs text-gray-600 dark:text-gray-400">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`h-2.5 w-2.5 rounded-sm ${getContributionColor([0, 3, 8, 15, 25][level])}`}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
