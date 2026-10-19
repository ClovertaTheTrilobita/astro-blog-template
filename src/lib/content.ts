import { getCollection, getEntry, render, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';
import { createHash } from 'node:crypto';
export type Article = CollectionEntry<'posts'> | CollectionEntry<'columnPosts'>;
export async function articleSummary(post: Article): Promise<string> {
  if (post.collection === 'posts') return post.data.description;
  return (await render(post)).remarkPluginFrontmatter.bodyExcerpt as string;
}
export const byDate = (a: Article, b: Article) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf() || a.id.localeCompare(b.id);
export async function articles(lang: Lang, collection: 'posts' | 'columnPosts' = 'posts') {
  return (await getCollection(collection, entry => entry.id.startsWith(`${lang}/`) && !entry.data.draft)).sort(byDate);
}
export function articleSlug(post: Article) { return post.id.split('/').slice(2).join('/'); }
export function articleUrl(post: Article) {
  const lang = post.id.split('/')[0];
  return `/${lang}/${post.collection === 'posts' ? 'posts' : 'columns'}/${articleSlug(post)}/`;
}
// Preserve the original shared, language-independent Remark42 discussion keys.
export const discussionKey = (post: Article) => `/${post.collection === 'posts' ? 'posts' : 'columns'}/${articleSlug(post)}/`;
export const formatDate = (date: Date) => date.toISOString().slice(0, 10);
export const pageContent = (lang: Lang, page: string) => getEntry('pages', `${lang}/pages/${page}`);
export const columnId = (post: Article) => post.id.split('/')[2];
const transitionKey = (id: string, part: string) => `content-${createHash('sha256').update(id).digest('hex').slice(0, 12)}-${part}`;
export const articleTransition = (post: Article, part: 'title' | 'image') => transitionKey(`${post.collection}/${post.id}`, part);
export const columnTransition = (lang: Lang, id: string, part: 'title' | 'image') => transitionKey(`column/${lang}/${id}`, part);
export interface Column { id: string; title: string; description: string; image: string; }
const definitions = import.meta.glob<{ default: Column }>('../content/*/columns/*/index.ts', { eager: true });
export function columns(lang: Lang): Column[] {
 return Object.entries(definitions).filter(([path]) => path.includes(`/content/${lang}/`)).map(([, module]) => module.default);
}
