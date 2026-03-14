import GitHubStats from "../components/GitHubStats";
import Timeline from "../components/Timeline";
import { SITE, SOCIAL } from "../config";

export default function About() {
  return (
    <div className="max-w-2xl mx-auto px-4 pt-14 pb-16">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        About
      </h1>

      <div className="prose">
        <p>
          Hi! I'm <b>{SITE.name}</b> — a software and web engineer from Spain 🇪🇸
          passionate about building software and sharing what I learn along the
          way. I consider myself as a proactive person who always likes to look
          for new personal and professional opportunities towards improving my
          career path.
        </p>
        <p>
          This site is my corner of the internet where I write about{" "}
          <b>programming, tools, ideas and recent scientific publications</b>{" "}
          that I find interesting 😉. I will also share some off-topic posts.
        </p>
      </div>

      {/* Education */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Education 🎓
        </h2>
        <Timeline
          items={[
            {
              date: "present",
              title: "To be continued…",
              subtitle: "University of Oviedo",
            },
            {
              date: "September 2023 – July 2025",
              title: "MSc Web Engineering",
              subtitle: "University of Oviedo, School of Software Engineering",
            },
            {
              date: "September 2019 – June 2023",
              title: "Bachelor's Degree in Software Engineering",
              subtitle: "University of Oviedo, School of Software Engineering",
            },
          ]}
        />
      </section>

      {/* Experience */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Experience 💼
        </h2>
        <Timeline
          items={[
            {
              date: "September 2025 – present",
              title: "Researcher",
              subtitle: "University of Oviedo",
              description:
                "I research new technologies related to AI systems and how to integrate AI modules into a wide variety of systems. I have been participating in many projects with different AI models using Ollama, cloud infrastructures, and many other tools. I have been a technical member of the CEISIA.",
            },
            {
              date: "April 2024 – September 2025",
              title: "Software and Web Engineer",
              subtitle: "Indra",
              description:
                "Experience on real industry projects for public institutions. I worked with Java environments focused on Spring framework, Oracle Database System and AngularJS as a fullstack software engineer.",
            },
            {
              date: "October 2023 – April 2024",
              title: "Software Engineer",
              subtitle: "The Cocktail",
              description:
                "Work on projects for energy companies in Portugal and Spain. I used Node.js with TypeScript and NestJS framework to develop and design REST API services.",
            },
            {
              date: "July 2022 – August 2022",
              title: "Intern",
              subtitle: "TotalEnergies",
              description:
                "Developed Python scripts to download and manage XML datafiles about energy production in Spain.",
            },
          ]}
        />
      </section>

      {/* Technologies */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Technologies 🛠️
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "TypeScript · Node.js", emoji: "#️⃣" },
            { label: "Java · SpringBoot", emoji: "♨️" },
            { label: "Python", emoji: "🐍" },
            { label: "React · ReactNative", emoji: "⚛️" },
            { label: "AI Integrations", emoji: "🤖" },
            { label: "HuggingFace", emoji: "🤗" },
            { label: "Ollama", emoji: "🦙" },
            { label: "Cloud Services", emoji: "☁️" },
            { label: "NoSQL", emoji: "🍃" },
            { label: "SQL", emoji: "⛃" },
            { label: "Docker", emoji: "🐳" },
          ].map(({ label, emoji }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              <span>{emoji}</span>
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* GitHub */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
          GitHub Stats 📈
        </h2>
        <GitHubStats username="diegoglezsu" />
      </section>

      <div className="prose mt-10">
        <h2>Get in touch 📩</h2>
        <p>
          The best ways to reach me are{" "}
          <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>{" "}
          or <a href={`mailto:${SOCIAL.email}`}>email</a>.
        </p>
      </div>
    </div>
  );
}
