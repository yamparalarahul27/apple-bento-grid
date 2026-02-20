const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-02-19',
    useCdn: true,
});

async function test() {
    console.log('🔍 Testing Sanity read access...');
    try {
        const data = await client.fetch('*[_type == "course"]');
        console.log('✅ Read successful. Found courses:', data.length);
        console.log('Data:', JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('❌ Read failed:', err.message);
    }
}

test();
