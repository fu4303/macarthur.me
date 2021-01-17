import remark from 'remark'
import strip from 'strip-markdown';
import unified from 'unified';
import remarkParse from 'remark-parse';
import prism from 'remark-prism';
import remarkRehype from 'remark-rehype'
import html from 'rehype-stringify';
import allImageData from './image-data.json';
import oldHtml from 'remark-html'
import visit from 'unist-util-visit';
import rehypePrism from '@mapbox/rehype-prism';


const buildImages = (tree, slug) => {
  const postImageData = allImageData[slug];

  visit(
    tree,
    node => node.tagName === 'img',
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

const headings = require('remark-autolink-headings')
const remarkSlug = require('remark-slug');

export function processMarkdown(rawMarkdown, slug) {
  const contents = unified()
    .use(remarkParse)
    .use(remarkSlug)
    .use(headings, {
      behavior: 'wrap'
    })
    .use(prism)
    .use(remarkRehype)
    // .use(rehypePrism, {
    //   ignoreMissing: true
    // })

    .use(_options => tree => {
      buildImages(tree, slug);

      // visit(tree, 'image', function (node) {
      //   console.log(node)
      //   process.exit();
      // })
      // buildImages(tree, slug);
      // buildHeadings(tree, slug);
    })
    .use(html)
    // .use(oldHtml)
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

