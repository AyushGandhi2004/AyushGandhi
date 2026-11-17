import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      year: z.number(),
      order: z.number(),
      featured: z.boolean().default(false),
      role: z.string().optional(),
      stack: z.array(z.string()),
      live: z.string().url().optional(),
      repo: z.string().url().optional(),
      cover: image().optional(),
      tone: z.enum(['sage', 'sand']).default('sage'),
    }),
});

const experience = defineCollection({
  loader: file('./src/content/experience.json'),
  schema: z.object({
    order: z.number(),
    period: z.string(),
    title: z.string(),
    org: z.string(),
    location: z.string().optional(),
    kind: z.enum(['work', 'internship', 'education', 'award']),
    description: z.string().optional(),
  }),
});


export const collections = { projects, experience };
