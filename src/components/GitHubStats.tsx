import { useEffect, useState } from "react";
import ContributionGraph, {
  type ContributionData,
} from "./GithubContributionGraph";

interface GitHubUser {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string;
  company: string;
  avatar_url: string;
}

type Props = {
  username: string;
};

export default function GitHubStats({ username }: Props) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [contributions, setContributions] = useState<ContributionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch user data
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error("Failed to fetch GitHub user");
        const userData: GitHubUser = await userRes.json();
        setUser(userData);

        // Fetch contribution data from public events
        const eventsRes = await fetch(
          `https://api.github.com/users/${username}/events/public?per_page=300`,
        );
        if (eventsRes.ok) {
          const events = await eventsRes.json();
          const contributionMap = new Map<string, number>();

          // Count events by date
          events.forEach((event: any) => {
            const date = event.created_at?.split("T")[0];
            if (date) {
              contributionMap.set(date, (contributionMap.get(date) || 0) + 1);
            }
          });

          // Convert to array and sort
          const contributionArray = Array.from(contributionMap.entries())
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => a.date.localeCompare(b.date));

          setContributions(contributionArray);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]);

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        Loading GitHub data...
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="text-center py-8 text-red-500 dark:text-red-400">
        Could not load GitHub data 😵
      </div>
    );
  }

  return (
    <div>
      {/* User Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {user.public_repos}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Public Repos
          </div>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {user.followers}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Followers
          </div>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {user.following}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Following
          </div>
        </div>
      </div>

      {/* Contribution Graph */}
      {contributions.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4 uppercase tracking-wide">
            Recent Contributions (Public repos)
          </h3>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg overflow-x-auto flex justify-center">
            <ContributionGraph contributions={contributions} />
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <img
          alt="GitHub Streak Stats"
          src="https://github-readme-streak-stats.herokuapp.com/?user=diegoglezsu&theme=vision-friendly-dark&show_icons=true&hide_border=false&line_height=20&title_color=007bff&icon_color=00438a&show_owner=true"
          className="inline-block rounded-md"
        />
      </div>
    </div>
  );
}
