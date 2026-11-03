import type { ArtalkPlugin } from 'artalk';
import katex from 'katex';

export const artalkMath: ArtalkPlugin = (ctx) => {
  const prefix = 'artalk-math-' + crypto.getRandomValues(new Uint32Array(4)).join('-');
  const formulas = new Map<string, { tex: string; displayMode: boolean }>();

  function placeholder(tex: string, displayMode: boolean) {
    const id = prefix + '-' + formulas.size;
    formulas.set(id, { tex, displayMode });
    return '<span>' + id + '</span>';
  }

  ctx.on('mounted', () => {
    // Capture TeX before Markdown interprets escapes and underscores.
    ctx.getMarked()?.use({
      extensions: [
        {
          name: 'blockMath',
          level: 'block',
          tokenizer(source) {
            const match = /^ {0,3}\$\$([\s\S]+?)\$\$[ \t]*(?:\n|$)/.exec(source);
            if (match) return { type: 'blockMath', raw: match[0], tex: match[1].trim() };
          },
          renderer(token) { return placeholder(token.tex, true); },
        },
        {
          name: 'inlineMath',
          level: 'inline',
          start(source) { return source.search(/(?<![\\$])\$(?![\s$])/); },
          tokenizer(source) {
            const match = /^\$(?![\s$])((?:\\[^\r\n]|[^\\$\r\n])+?)(?<!\s)\$(?![\d$])/.exec(source);
            if (match) return { type: 'inlineMath', raw: match[0], tex: match[1] };
          },
          renderer(token) { return placeholder(token.tex, false); },
        },
      ],
    });

    // Artalk sanitizes Markdown before inserting the KaTeX-generated markup.
    ctx.updateConf({
      markedReplacers: [
        ...(ctx.getConf().markedReplacers ?? []),
        (html) => {
          try {
            return html.replace(/<span>(artalk-math-[\d-]+)<\/span>/g, (marker, id) => {
              const formula = formulas.get(id);
              return formula ? katex.renderToString(formula.tex, {
                displayMode: formula.displayMode, throwOnError: false, trust: false,
              }) : marker;
            });
          } finally {
            formulas.clear();
          }
        },
      ],
    });
  });
};
