type ContentType = 'page' | 'post';
interface PostData {
  slug: string;
  path: string;
  date: string;
  title: string;
  content: string;
}
interface ContentData {
  slugPattern: RegExp;
  directory: string;
}
