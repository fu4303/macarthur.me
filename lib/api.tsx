import { join } from "path";
import PostCompiler from "./PostCompiler";
import imageData from "../lib/image-data.json";

const postsDirectory = join(process.cwd(), "_posts");
const pagesDirectory = join(process.cwd(), "_pages");
const postSlugPattern = new RegExp(/(?:\d{4}-\d{2}-\d{2}-)(.+)(\.mdx?)?/);
const pageSlugPattern = new RegExp(/(.+)(?:\.mdx?)/);

type ContentType = 'page' | 'post';
interface ContentData {
  slugPattern: RegExp;
  directory: string;
}

function getContentData(contentType: ContentType): ContentData {
  return {
    slugPattern: contentType === 'post' ? postSlugPattern : pageSlugPattern,
    directory: contentType === 'post' ? postsDirectory : pagesDirectory
  };
}

export function getContentBySlug(slug: string, contentType: ContentType) {
  const { slugPattern, directory } = getContentData(contentType);
  const postCompiler = new PostCompiler(directory, slugPattern);

  return postCompiler.getContentBySlug(slug);
}

export function getAllPosts(): PostData[] {
  const { slugPattern, directory } = getContentData('post');
  const postCompiler = new PostCompiler(directory, slugPattern);

  return postCompiler.getPosts();
}

export function getAllPages(): PostData[] {
  const { slugPattern, directory } = getContentData('page');
  const postCompiler = new PostCompiler(directory, slugPattern);

  return postCompiler.getPosts();
}

export function getImageDataForSlug(slug: string): { [key: string]: any } {
  return imageData[slug];
}
