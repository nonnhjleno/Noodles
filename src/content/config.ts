import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    isPublished: z.boolean(),
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.array(z.string().default('Anonymous')),
    thumbnail: z.object({
      url: image(),
      alt: z.string(),
    }),
    tags: z.array(z.string()),
    map: z.string().optional()
  }),
});

const author = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    shortMessage: z.string().default('ラーメンで動くデューンバギー'),
    message: z.string().default('普通の人ならお茶を一口飲むところでラーメンのスープを飲んだ第一人者'),
    url: z.string().url().optional(),
  })
});

export const collections = {
  blog: blogCollection,
  author: author,
};
