import { PortableText, PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';

const components: PortableTextComponents = {
    types: {
        image: ({ value }) => (
            <div className="relative w-full aspect-video my-8 overflow-hidden rounded-lg">
                <Image
                    src={urlFor(value).url()}
                    alt={value.alt || 'Content Image'}
                    fill
                    className="object-cover"
                />
            </div>
        ),
        code: ({ value }) => (
            <div className="my-6 rounded-lg bg-surface-2 p-4 font-mono text-sm text-primary overflow-x-auto">
                <pre><code>{value.code}</code></pre>
            </div>
        ),
    },
    marks: {
        link: ({ children, value }) => {
            const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
            return (
                <a href={value.href} rel={rel} className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary transition-all">
                    {children}
                </a>
            );
        },
    },
};

import { PortableTextBlock } from '@portabletext/types';

export function SanityContent({ value }: { value: PortableTextBlock[] | undefined }) {
    if (!value) return null;
    return <PortableText value={value} components={components} />;
}
