import { useEffect } from "react";

interface PageMeta {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const setMetaTag = (attr: "name" | "property", key: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const removeMetaTag = (attr: "name" | "property", key: string) => {
  const tag = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (tag) tag.remove();
};

export const usePageMeta = ({
  title,
  description,
  keywords,
  image,
  url,
}: PageMeta) => {
  useEffect(() => {
    document.title = title;

    if (description) {
      setMetaTag("name", "description", description);
      setMetaTag("property", "og:description", description);
      setMetaTag("name", "twitter:description", description);
    } else {
      removeMetaTag("name", "description");
      removeMetaTag("property", "og:description");
      removeMetaTag("name", "twitter:description");
    }

    if (keywords) {
      setMetaTag("name", "keywords", keywords);
    } else {
      removeMetaTag("name", "keywords");
    }

    setMetaTag("property", "og:title", title);
    setMetaTag("name", "twitter:title", title);

    if (image) {
      setMetaTag("property", "og:image", image);
      setMetaTag("name", "twitter:image", image);
    } else {
      removeMetaTag("property", "og:image");
      removeMetaTag("name", "twitter:image");
    }

    if (url) {
      setMetaTag("property", "og:url", url);
    } else {
      removeMetaTag("property", "og:url");
    }

    return () => {
      document.title = "FanKit";
    };
  }, [title, description, keywords, image, url]);
};
