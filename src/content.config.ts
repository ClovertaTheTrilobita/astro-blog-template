import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
const article = z.object({
  title: z.string(), pubDate: z.coerce.date(), updatedDate: z.coerce.date().optional(),
  description: z.string(), author: z.string().default('Cloverta'), tags: z.array(z.string()).default([]),
  image: z.object({ url: z.string(), alt: z.string() }).optional(),
  draft: z.boolean().default(false), sample: z.boolean().default(false),
});
export const collections = {
  posts: defineCollection({ loader: glob({ pattern: '*/posts/**/*.md', base: './src/content' }), schema: article }),
  columnPosts: defineCollection({ loader: glob({ pattern: '*/columns/**/*.md', base: './src/content' }), schema: article }),
  pages: defineCollection({ loader: glob({ pattern: '*/pages/*.md', base: './src/content' }), schema: z.object({ title: z.string() }) }),
  friends: defineCollection({ loader: glob({ pattern: '*/friends/*.md', base: './src/content' }), schema: z.object({
    name: z.string(), description: z.string(), url: z.url(), avatar: z.string(),
  }) }),
};
