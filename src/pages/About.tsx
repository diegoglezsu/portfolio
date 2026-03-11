import SocialLinks from "../components/SocialLinks";
import { SITE, SOCIAL } from "../config";

export default function About() {
  return (
    <div className="max-w-2xl mx-auto px-4 pt-14 pb-16">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        About
      </h1>

      <div className="prose">
        <p>
          Hi! I'm <strong>{SITE.name}</strong> — an engineer from 🇪🇸 passionate
          about building software and sharing what I learn along the way. I
          consider myself as a proactive person who always likes to look for new
          personal and professional opportunities towards improving my career
          path.
        </p>
        <p>
          This site is my corner of the internet where I write about
          programming, tools, ideas that interest me and recent scientific
          publications. Every post is published here first and shared openly.
        </p>
      </div>

      {/* Education */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Education
        </h2>
        <ol className="relative border-l border-gray-200 dark:border-gray-700 space-y-8 ml-3">
          <li className="pl-6">
            <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-white dark:border-gray-950 bg-gray-400 dark:bg-gray-500" />
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-1">
              September 2026 – present
            </p>
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              To be continued…
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              University of Oviedo
            </p>
          </li>
          <li className="pl-6">
            <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-white dark:border-gray-950 bg-gray-400 dark:bg-gray-500" />
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-1">
              September 2023 – July 2025
            </p>
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              MSc Web Engineering
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              University of Oviedo, School of Software Engineering
            </p>
          </li>
          <li className="pl-6">
            <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-white dark:border-gray-950 bg-gray-400 dark:bg-gray-500" />
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-1">
              September 2019 – June 2023
            </p>
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              Bachelor's Degree in Software Engineering
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              University of Oviedo, School of Software Engineering
            </p>
          </li>
        </ol>
      </section>

      {/* Experience */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Experience
        </h2>
        <ol className="relative border-l border-gray-200 dark:border-gray-700 space-y-8 ml-3">
          <li className="pl-6">
            <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-white dark:border-gray-950 bg-gray-400 dark:bg-gray-500" />
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-1">
              September 2025 – present
            </p>
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              Researcher
            </p>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              University of Oviedo
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              I research new technologies related to AI systems and how to
              integrate AI modules into a wide variety of systems. I have been
              participating in many projects with different AI models using
              Ollama, cloud infrastructures, and many other tools. I have been a
              technical member of the CEISIA.
            </p>
          </li>
          <li className="pl-6">
            <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-white dark:border-gray-950 bg-gray-400 dark:bg-gray-500" />
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-1">
              April 2024 – September 2025
            </p>
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              Software and Web Engineer
            </p>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Indra
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Worked on real industry projects for public institutions. I got
              experience working with Java environments focused on Spring
              framework, Oracle Database System and AngularJS as a fullstack
              software engineer.
            </p>
          </li>
          <li className="pl-6">
            <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-white dark:border-gray-950 bg-gray-400 dark:bg-gray-500" />
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-1">
              October 2023 – April 2024
            </p>
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              Software Engineer
            </p>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              The Cocktail
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Worked on projects for energy companies in Portugal and Spain. I
              used Node.js with TypeScript and the NestJS framework to develop
              and design REST API services.
            </p>
          </li>
          <li className="pl-6">
            <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-white dark:border-gray-950 bg-gray-400 dark:bg-gray-500" />
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-1">
              July 2022 – August 2022
            </p>
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              Intern
            </p>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              TotalEnergies
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Developed Python scripts to download and manage XML datafiles
              about energy production in Spain.
            </p>
          </li>
        </ol>
      </section>

      {/* Technologies */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Technologies
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "TypeScript · Node.js", emoji: "🇹" },
            { label: "Java · Spring Boot", emoji: "♨️" },
            { label: "Python", emoji: "🐍" },
            { label: "React · React Native", emoji: "⚛️" },
            { label: "Ollama · HuggingFace", emoji: "🤗" },
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

      <div className="prose mt-10">
        <h2>Get in touch</h2>
        <p>
          The best ways to reach me are{" "}
          <a href={SOCIAL.twitter} target="_blank" rel="noopener noreferrer">
            X / Twitter
          </a>{" "}
          or <a href={SOCIAL.email}>email</a>.
        </p>
      </div>

      <div className="mt-10">
        <SocialLinks />
      </div>
    </div>
  );
}
