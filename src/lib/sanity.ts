import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const isSanityConfigured = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'placeholder';

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-02-19',
    useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: unknown) {
    // @ts-expect-error Sanity source types are complex
    return builder.image(source);
}
