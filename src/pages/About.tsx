import GitHubStats from "../components/GitHubStats";
import MetaTags from "../components/MetaTags";
import Timeline from "../components/Timeline";
import { SITE, SOCIAL } from "../config";

export default function About() {
  return (
    <div className="max-w-2xl mx-auto px-4 pt-14 pb-16">
      <MetaTags
        title="About"
        description="Learn more about Diego González Suárez, software and web engineer."
      />
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        About
      </h1>

      <div className="prose">
        <p>
          Hi! I'm <b>{SITE.name}</b> — a software and web engineer from Spain 🇪🇸
          passionate about building software and sharing what I learn along the
          way. I consider myself as a proactive person who likes to look for new
          personal and professional opportunities towards improving my career
          path.
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
              date: "September 2026 - present",
              title: "PhD in Computer Science",
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
              date: "January 2026 – present",
              title: "Researcher",
              subtitle: "University of Oviedo",
              description:
                "Development of natural language processing and information aggregation techniques aimed at the automatic extraction of knowledge from structured and unstructured text. Design and adaptation of conversational models to support interaction with the extracted information, and the incorporation of computationally efficient consensus-building methods to integrate and prioritise the results. Member of UNIMODE research group (Cod. Project: SEK-25-GRU-GIC-24-018).",
            },
            {
              date: "September 2025 – December 2025",
              title: "Software Engineer",
              subtitle: "CEISIA - University of Oviedo",
              description:
                "Technical collaboration with the joint CEISIA–Town Council working group to adapt the development to the identified requirements. Implementation of functionalities aimed at automating administrative procedures and data management. Integration of artificial intelligence models developed by CEISIA researchers for the analysis and exploitation of data related to the procedure. Preparation of technical documentation and support for the validation and functional testing of the prototype. (Cod. Project: SV-24-SIERO-CEISIA).",
            },
            {
              date: "April 2024 – September 2025",
              title: "Software and Web Engineer",
              subtitle: "Indra",
              description:
                "Experience on real industry projects for public institutions. I worked with Java environments focused on Spring framework, Oracle Database System and AngularJS as a fullstack software engineer. I also worked on the deployment of the applications in on-premise environments.",
            },
            {
              date: "October 2023 – April 2024",
              title: "Software Engineer",
              subtitle: "The Cocktail",
              description:
                "Work on projects for energy companies in Portugal and Spain. I used Node.js with TypeScript and NestJS framework to develop and design REST API services. Collaboration with the frontend team to integrate the backend services with Vue.js applications. I also worked on the deployment of the applications in cloud environments.",
            },
            {
              date: "July 2022 – August 2022",
              title: "Intern",
              subtitle: "TotalEnergies",
              description:
                "Developed Python scripts to download and manage XML datafiles about energy production in Spain. Database management and data analysis to generate reports and visualizations for the company.",
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
            { label: "Angular", emoji: "🅰️" },
            { label: "Docker", emoji: "🐳" },
            { label: "Hugging Face", emoji: "🤗" },
            { label: "Ollama", emoji: "🦙" },
            { label: "Cloud Services", emoji: "☁️" },
            { label: "NoSQL", emoji: "🍃" },
            { label: "SQL", emoji: "⛃" },
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
