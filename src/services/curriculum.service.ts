import { client, isSanityConfigured } from '@/lib/sanity';
import { SanityCourse, SanityLesson } from '@/types/curriculum';

export class CurriculumService {
    static async getCourses(): Promise<SanityCourse[]> {
        if (!isSanityConfigured) {
            console.warn("Sanity is not configured. Returning empty courses.");
            return [];
        }
        try {
            const query = `*[_type == "course"] {
                _id,
                title,
                "slug": slug.current,
                description,
                difficulty,
                duration,
                thumbnail,
                xpReward,
                "modulesCount": count(modules)
            }`;
            return await client.fetch(query);
        } catch (error) {
            console.error("Error fetching courses from Sanity:", error);
            return [];
        }
    }

    static async getCourseBySlug(slug: string): Promise<SanityCourse | null> {
        if (!isSanityConfigured) return null;
        try {
            const query = `*[_type == "course" && slug.current == $slug][0] {
                _id,
                title,
                "slug": slug.current,
                description,
                difficulty,
                duration,
                thumbnail,
                xpReward,
                modules[]-> {
                    _id,
                    title,
                    lessons[]-> {
                        _id,
                        title,
                        "slug": slug.current,
                        type,
                        duration
                    }
                }
            }`;
            return await client.fetch(query, { slug });
        } catch (error) {
            console.error(`Error fetching course ${slug} from Sanity:`, error);
            return null;
        }
    }

    static async getLessonBySlug(courseSlug: string, lessonSlug: string): Promise<SanityLesson | null> {
        if (!isSanityConfigured) return null;
        try {
            const query = `*[_type == "lesson" && slug.current == $lessonSlug][0] {
                _id,
                title,
                "slug": slug.current,
                type,
                duration,
                content,
                challengeId
            }`;
            return await client.fetch(query, { lessonSlug });
        } catch (error) {
            console.error(`Error fetching lesson ${lessonSlug} from Sanity:`, error);
            return null;
        }
    }
}
