import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");
const datePattern = new RegExp(/\d{4}-\d{2}-\d{2}-/);
const slugPattern = new RegExp(/(?:\d{4}-\d{2}-\d{2}-)(.+)(?:\.mdx?)/);

interface Post {
  content?: string;
  date?: string;
  title?: string;
  slug?: string;
}

function getSlugFromFileName(fileName: string): string {
  return slugPattern.exec(fileName)?.[1] || "";
}

function getPostFilesNames(): string[] {
  return fs.readdirSync(postsDirectory);
}

function findFileNameBySlug(slug) {
  return getPostFilesNames().find((fileName) => {
    const fileSlug = slugPattern.exec(fileName)[1];

    return slug === fileSlug;
  });
}

function getPostByFileName(fileName: string, fields: string[]): Post {
  const slug = getSlugFromFileName(fileName);

  return getPostBySlug(slug, fields);
}

export function getPostBySlug(slug, fields = []): Post {
  const fileName = findFileNameBySlug(slug);
  const date = fileName.match(datePattern)[0].replace(/\-$/, "");
  const fullPath = join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const items = {};

  fields.forEach((field) => {
    if (field === "date") {
      items[field] = date;
    }

    if (field === "slug") {
      items[field] = slug;
    }

    if (field === "content") {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields = []) {
  const files = getPostFilesNames();

  const posts = files
    .map((file) => getPostByFileName(file, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
