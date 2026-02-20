import { PortableTextBlock } from '@portabletext/types';

export interface SanityLesson {
    _id: string;
    title: string;
    slug: string;
    type: 'reading' | 'challenge' | 'video';
    duration: string;
    content?: PortableTextBlock[];
    challengeId?: string; // For challenge types
}

export interface SanityModule {
    _id: string;
    title: string;
    lessons: SanityLesson[];
}

export interface SanityCourse {
    _id: string;
    title: string;
    description: string;
    slug: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string;
    thumbnail?: unknown;
    modules?: SanityModule[];
    xpReward?: number;
}
