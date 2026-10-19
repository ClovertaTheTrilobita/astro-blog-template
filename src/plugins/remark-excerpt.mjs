// Use prose from the Markdown body, without headings or embedded media.
export default function remarkExcerpt() {
  return (tree, file) => {
    const paragraphs = [];
    const inlineText = node => {
      if (node.type === 'text' || node.type === 'inlineCode') return node.value;
      if (node.type === 'break') return ' ';
      if (node.type === 'image' || node.type === 'imageReference' || node.type === 'html') return '';
      return (node.children || []).map(inlineText).join('');
    };
    const visit = node => {
      if (node.type === 'paragraph') paragraphs.push(inlineText(node));
      else for (const child of node.children || []) visit(child);
    };
    visit(tree);
    const text = paragraphs.join(' ').replace(/\s+/g, ' ').trim();
    const characters = Array.from(text);
    file.data.astro.frontmatter.bodyExcerpt = characters.length > 400
      ? `${characters.slice(0, 400).join('').trimEnd()}…`
      : text;
  };
}
