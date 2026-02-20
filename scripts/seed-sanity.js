const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN, // Requires a token with write access
    apiVersion: '2024-02-19',
    useCdn: false,
});

async function seed() {
    console.log('🚀 Seeding Sanity with test curriculum...');

    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
        console.error('❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN must be set in .env.local');
        process.exit(1);
    }

    try {
        // 1. Create Lessons
        const lesson1 = await client.create({
            _type: 'lesson',
            title: 'What is Solana?',
            slug: { _type: 'slug', current: 'what-is-solana' },
            type: 'reading',
            duration: '10 mins',
            content: [
                {
                    _key: 'block1',
                    _type: 'block',
                    children: [{ _key: 'span1', _type: 'span', text: 'Solana is a high-performance blockchain...' }],
                    markDefs: [],
                    style: 'normal',
                },
            ],
        });

        const lesson2 = await client.create({
            _type: 'lesson',
            title: 'The Account Model',
            slug: { _type: 'slug', current: 'account-model' },
            type: 'reading',
            duration: '15 mins',
            content: [
                {
                    _key: 'block1',
                    _type: 'block',
                    children: [{ _key: 'span1', _type: 'span', text: 'Unlike Ethereum, Solana uses an account-based model where data and code are separated...' }],
                    markDefs: [],
                    style: 'normal',
                },
            ],
        });

        // 2. Create Module
        const module1 = await client.create({
            _type: 'module',
            title: 'Solana Core Concepts',
            lessons: [
                { _type: 'reference', _ref: lesson1._id },
                { _type: 'reference', _ref: lesson2._id },
            ],
        });

        // 3. Create Course
        const course = await client.create({
            _type: 'course',
            title: 'Solana Fundamentals',
            slug: { _type: 'slug', current: 'solana-fundamentals' },
            description: 'Master the basics of Solana development, from accounts to programs.',
            difficulty: 'Beginner',
            duration: '2 hours',
            xpReward: 500,
            modules: [
                { _type: 'reference', _ref: module1._id },
            ],
        });

        console.log('✅ Successfully seeded Course:', course.title);
        console.log('🔗 Course Slug:', course.slug.current);
    } catch (err) {
        console.error('❌ Seeding failed:', err.message);
    }
}

seed();
