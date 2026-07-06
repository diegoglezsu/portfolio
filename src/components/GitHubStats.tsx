import { useEffect, useState } from "react";

interface GitHubUser {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string;
  company: string;
  avatar_url: string;
  public_gists: number;
  created_at: string;
}

function getAccountAge(createdAt: string): string {
  const years = Math.floor(
    (Date.now() - new Date(createdAt).getTime()) /
      (365.25 * 24 * 60 * 60 * 1000),
  );
  return years < 1 ? "< 1 yr" : `${years} yrs`;
}

type Props = {
  username: string;
};

export default function GitHubStats({ username }: Props) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [stars, setStars] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error("Failed to fetch GitHub user");
        const userData: GitHubUser = await userRes.json();
        setUser(userData);

        const reposRes = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
        );
        if (reposRes.ok) {
          const repos = await reposRes.json();
          const totalStars = repos.reduce(
            (sum: number, repo: any) => sum + (repo.stargazers_count || 0),
            0,
          );
          setStars(totalStars);
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
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-center">
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {stars}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Stars Earned
          </div>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-center">
          <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
            {user.public_gists}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Public Gists
          </div>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-center">
          <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">
            {getAccountAge(user.created_at)}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Account Age
          </div>
        </div>
      </div>
    </div>
  );
}
