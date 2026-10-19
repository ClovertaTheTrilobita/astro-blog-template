import rss from '@astrojs/rss';
import { articles, articleUrl } from './content';
import { getTranslations, type Lang } from '../i18n';
export async function feed(lang: Lang, site: URL | undefined, collection: 'posts' | 'columnPosts' = 'posts') {
 const t = getTranslations(lang);
 return rss({ title: `${t.siteTitle} · ${collection === 'posts' ? t.latest : t.nav.columns}`, description: t.siteTitle, site: site!, items: (await articles(lang, collection)).map(post => ({ title: post.data.title, description: post.data.description, pubDate: post.data.pubDate, link: articleUrl(post), author: post.data.author, categories: post.data.tags })), customData: `<language>${lang === 'zh' ? 'zh-cn' : 'en'}</language>` });
}
