import { useEffect } from "react";
import { SITE } from "../config";

interface SEOProps {
  title?: string;
  description?: string;
  type?: "website" | "article";
  publishedDate?: string;
  image?: string;
  url?: string;
}

export default function MetaTags({
  title,
  description,
  type = "website",
  publishedDate,
  image,
  url,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE.name}` : SITE.name;
  const fullDescription = description || SITE.description;
  const pageUrl = url || SITE.url;

  useEffect(() => {
    // Update basic tags
    document.title = fullTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", fullDescription);
    }

    // JSON-LD Schema
    const schema =
      type === "article"
        ? {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: title,
            description: fullDescription,
            author: {
              "@type": "Person",
              name: SITE.name,
              url: SITE.url,
            },
            datePublished: publishedDate,
            image: image,
            url: pageUrl,
          }
        : {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE.name,
            alternateName: SITE.handle,
            url: SITE.url,
            description: SITE.description,
          };

    // Remove existing schema scripts to avoid duplicates
    const existingScript = document.getElementById("json-ld");
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.id = "json-ld";
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [fullTitle, fullDescription, type, publishedDate, image, pageUrl, title]);

  return null;
}
