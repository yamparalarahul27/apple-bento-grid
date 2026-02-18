# database
- **Purpose**: Capture data models and storage plans.
- **Scope**: Sanity CMS schemas (courses/modules/lessons), client-side persistence stubs.
- **Read when**: Editing content models or adding persistence.

## Sanity (planned)
- Schemas: course, module, lesson, track, instructor, review.
- Fields: title, slug, description, difficulty, duration, XP, track association, content blocks (markdown/code), media refs.
- Local mock content until Sanity is wired.

## Client/local persistence (stub)
- Lesson progress bitmap placeholder in local storage until on-chain.
- Cache XP/leaderboard responses for perf; invalidate on wallet change.

## Update rules
- Update after schema changes or new entities.
