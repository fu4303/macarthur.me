import remark from 'remark'
import strip from 'strip-markdown';
// import fs from 'fs';
import unified from 'unified';
import markdown from 'remark-parse';
import html from 'remark-html';

export function processMarkdown(rawMarkdown) {
  const contents = unified()
    .use(markdown)
    .use(html)
    .processSync(rawMarkdown)
    .toString();

  return contents;
}

export function stripMarkdown(markdown) {
  const result = remark()
    .use(strip)
    .processSync(markdown);

  return result.toString();
}

