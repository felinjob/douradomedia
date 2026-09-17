import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const spearfishingCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/spearfishing' }),
  schema: () => z.object({
    title: z.string(),
    client: z.string().optional(),
    date: z.date(),
    depth_meters: z.number(),
    target_species: z.string(),
    location: z.string(),
    cover_image: z.string(),
    media_type: z.union([z.enum(['youtube', 'vimeo', 'reel', 'local']), z.string()]).optional(),
    media_id: z.string().optional(),
    featured: z.boolean().default(false),
    description: z.string().optional(),
    bts: z.object({
      challenge: z.string(),
      equipment: z.string(),
      lighting: z.string(),
      result: z.string()
    }).optional(),
  }),
});

const gastronomyCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/gastronomy' }),
  schema: () => z.object({
    title: z.string(),
    restaurant_or_chef: z.string().optional(),
    culinary_style: z.string().optional(),
    color_profile: z.string().optional(),
    cover_image: z.string(),
    media_type: z.union([z.enum(['youtube', 'vimeo', 'reel']), z.string()]).optional(),
    media_id: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const fashionCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/fashion' }),
  schema: () => z.object({
    title: z.string(),
    brand: z.string().optional(),
    collection_season: z.string().optional(),
    fabrics_highlight: z.array(z.string()).optional(),
    visual_concept: z.string().optional(),
    cover_image: z.string(),
    media_type: z.union([z.enum(['youtube', 'vimeo', 'reel']), z.string()]).optional(),
    media_id: z.string().optional(),
    featured: z.boolean().default(false),
    bts: z.object({
      challenge: z.string(),
      equipment: z.string(),
      lighting: z.string(),
      result: z.string()
    }).optional(),
  }),
});

export const collections = {
  spearfishing: spearfishingCollection,
  gastronomy: gastronomyCollection,
  fashion: fashionCollection,
};
