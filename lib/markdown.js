import remark from 'remark'
import strip from 'strip-markdown';

export function stripMarkdown(markdown) {
  const result = remark()
    .use(strip)
    .processSync(markdown);

  return result.toString();
}
