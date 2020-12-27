import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");
const pagesDirectory = join(process.cwd(), "_pages");
const datePattern = new RegExp(/\d{4}-\d{2}-\d{2}-/);
const postSlugPattern = new RegExp(/(?:\d{4}-\d{2}-\d{2}-)(.+)(?:\.mdx?)/);
const pageSlugPattern = new RegExp(/(.+)(?:\.mdx?)/);

type ContentType = 'page' | 'post';
interface Page {
  content?: string;
  date?: string;
  title?: string;
  slug?: string;
  ogImage?: string;
}

function getPostSlugFromFileName(fileName: string): string {
  return postSlugPattern.exec(fileName)?.[1] || "";
}

function getPostFilesNames(): string[] {
  const files = fs.readdirSync(postsDirectory);

  return files.filter(f => f.match(postSlugPattern));
}

function getPageFilesNames(): string[] {
  return fs.readdirSync(pagesDirectory);
}

function getSlugPatternByType(contentType: ContentType) {
  if (contentType === 'post') {
    return postSlugPattern;
  }

  if (contentType === 'page') {
    return pageSlugPattern;
  }

  return null;
}

function getDirectoryByType(contentType: ContentType) {
  if (contentType === 'post') {
    return postsDirectory;
  }

  if (contentType === 'page') {
    return pagesDirectory;
  }

  return null;
}

function getFileNamesByType(contentType: ContentType) {
  if (contentType === 'post') {
    return getPostFilesNames();
  }

  if(contentType === 'page') {
    return getPageFilesNames();
  }

  return [];
}

function findFileNameBySlug(slug, contentType: ContentType) {
  return getFileNamesByType(contentType).find((fileName) => {
    console.log(slug);
    const match = getSlugPatternByType(contentType).exec(fileName);
    const fileSlug = match ? match[1] : null;

    return slug === fileSlug;
  });
}

function getPostByFileName(fileName: string): Page {
  const slug = getPostSlugFromFileName(fileName);
  return getContentBySlug(slug, 'post');
}

function getPageByFileName(fileName: string): Page {
  const slug = fileName.replace(/\.md$/, "");

  return getContentBySlug(slug, 'page');
}

export function getContentBySlug(slug: string, contentType: ContentType): Page {
  const fileName = findFileNameBySlug(slug, contentType);
  const directory = getDirectoryByType(contentType);
  const fullPath = join(directory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    ogImage: data.ogImage,
    date: fileName.match(datePattern)[0].replace(/\-$/, "")
  };
}

export function getAllPosts() {
  const files = getPostFilesNames();

  return files
    .map((file) => getPostByFileName(file))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}

export function getAllPages() {
  const files = getPageFilesNames();

  return files.map((file) => getPageByFileName(file));
}
