import remark from 'remark'
import strip from 'strip-markdown';
import unified from 'unified';
import markdown from 'remark-parse';
import prism from 'remark-prism';
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify';
import allImageData from './image-data.json';
import oldHtml from 'remark-html'

const visit = require('unist-util-visit');

const buildHeadings = (tree, slug) => {
  visit(
    tree,
    node => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].some(h => node.tagName && h.toLowerCase() === node.tagName.toLowerCase()),
    node => {
      const textNode = node.children.find(n => n.type === 'text');

      if(!textNode) {
        return;
      }

      // Convert the text to a slug by replacing every non-word character with a "-";
      const slug = textNode.value
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]/g, "")
        .replace(/\s/g, "-");

      node.children = [
        {
          type: 'element',
          tagName: 'a',
          properties: {
            href: `#${slug}`
          },
          children: node.children
        }
      ];
    }
  );
}
const buildImages = (tree, slug) => {
  const postImageData = allImageData[slug];

  visit(
    tree,
    node =>
      node.tagName === 'img',
    node => {
      let src = node.properties['src'];
      let height, width;
      const absoluteRegex = new RegExp("^(http(s?):\/\/)");

      if (!src.match(absoluteRegex)) {
        const cleanedSrc = src.replace(/^\.\//, "");
        const {
          width: imgWidth,
          height: imgHeight
        } = postImageData[cleanedSrc];

        width = imgWidth;
        height = imgHeight;
        src = `/post-images/${slug}/${cleanedSrc}`;
      }

      node.properties['data-lazy-src'] = src;
      if (height) node.properties['height'] = height;
      if (width) node.properties['width'] = width;
      node.properties.class = 'transition-opacity opacity-0 mx-auto block';
      node.properties.src = null;
    }
  );
}

export function processMarkdown(rawMarkdown, slug) {
  const contents = unified()
    .use(markdown)
    .use(prism)
    .use(remark2rehype)
    .use(_options => tree => {
      buildImages(tree, slug);
      buildHeadings(tree, slug);
    })
    .use(html)
    .use(oldHtml)
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

