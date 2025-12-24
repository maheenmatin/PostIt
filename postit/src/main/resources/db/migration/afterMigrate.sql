TRUNCATE TABLE
  comment,
  post,
  community,
  users
RESTART IDENTITY
CASCADE;

-- 10 users (all password = "password")
INSERT INTO users (user_id, username, password, email, enabled, created_date)
VALUES
  (1, 'alice', '$2b$12$pvdop0HBItAuXX5xNIwCNOB7a5qK7V7R7GhXZ5cEw/tSbdlvQhHGm', 'alice@example.com', true, TIMESTAMPTZ '2025-08-08 04:47:00+00'),
  (2, 'ben', '$2b$12$pvdop0HBItAuXX5xNIwCNOB7a5qK7V7R7GhXZ5cEw/tSbdlvQhHGm', 'ben@example.com', true, TIMESTAMPTZ '2025-07-21 21:34:00+00'),
  (3, 'charlie', '$2b$12$pvdop0HBItAuXX5xNIwCNOB7a5qK7V7R7GhXZ5cEw/tSbdlvQhHGm', 'charlie@example.com', true, TIMESTAMPTZ '2025-08-19 14:21:00+00'),
  (4, 'daria', '$2b$12$pvdop0HBItAuXX5xNIwCNOB7a5qK7V7R7GhXZ5cEw/tSbdlvQhHGm', 'daria@example.com', true, TIMESTAMPTZ '2025-08-02 07:08:00+00'),
  (5, 'eddie', '$2b$12$pvdop0HBItAuXX5xNIwCNOB7a5qK7V7R7GhXZ5cEw/tSbdlvQhHGm', 'eddie@example.com', true, TIMESTAMPTZ '2025-07-16 23:55:00+00'),
  (6, 'fatima', '$2b$12$pvdop0HBItAuXX5xNIwCNOB7a5qK7V7R7GhXZ5cEw/tSbdlvQhHGm', 'fatima@example.com', true, TIMESTAMPTZ '2025-08-14 16:42:00+00'),
  (7, 'gianna', '$2b$12$pvdop0HBItAuXX5xNIwCNOB7a5qK7V7R7GhXZ5cEw/tSbdlvQhHGm', 'gianna@example.com', true, TIMESTAMPTZ '2025-07-28 09:29:00+00'),
  (8, 'hugo', '$2b$12$pvdop0HBItAuXX5xNIwCNOB7a5qK7V7R7GhXZ5cEw/tSbdlvQhHGm', 'hugo@example.com', true, TIMESTAMPTZ '2025-08-25 02:16:00+00'),
  (9, 'isla', '$2b$12$pvdop0HBItAuXX5xNIwCNOB7a5qK7V7R7GhXZ5cEw/tSbdlvQhHGm', 'isla@example.com', true, TIMESTAMPTZ '2025-08-07 19:03:00+00'),
  (10, 'jun', '$2b$12$pvdop0HBItAuXX5xNIwCNOB7a5qK7V7R7GhXZ5cEw/tSbdlvQhHGm', 'jun@example.com', true, TIMESTAMPTZ '2025-08-14 13:50:00+00');

-- 25 communities
INSERT INTO community (community_id, name, description, created_date, user_user_id)
VALUES
  (1, 'TechTalk', 'Engineering trade-offs, tooling, and pragmatic lessons from building software.', TIMESTAMPTZ '2025-09-13 06:41:00+00', 1),
  (2, 'CityEats', 'Local food spots, home experiments, and honest reviews—no influencer fluff.', TIMESTAMPTZ '2025-09-02 01:22:00+00', 2),
  (3, 'TrailSeekers', 'Routes, gear, and trip reports for people who like dirt under their shoes.', TIMESTAMPTZ '2025-08-21 20:03:00+00', 3),
  (4, 'BookNook', 'Reading slumps, book clubs, and thoughtful reviews without spoilers.', TIMESTAMPTZ '2025-09-10 14:44:00+00', 4),
  (5, 'FitnessForge', 'Training plans, recovery, and realistic progress—strength, cardio, and mobility.', TIMESTAMPTZ '2025-08-30 09:25:00+00', 5),
  (6, 'MovieMarathon', 'Film nights, recommendations, and deep dives into what makes a movie work.', TIMESTAMPTZ '2025-08-19 04:06:00+00', 6),
  (7, 'DesignDesk', 'UI/UX critique, craft, and collaboration tips for designers and devs.', TIMESTAMPTZ '2025-09-07 22:47:00+00', 7),
  (8, 'BudgetBytes', 'Frugal habits, spending audits, and saving wins that don’t feel miserable.', TIMESTAMPTZ '2025-08-27 17:28:00+00', 8),
  (9, 'GardenGate', 'Plant care, soil talk, and seasonal checklists for small and big gardens.', TIMESTAMPTZ '2025-09-05 12:09:00+00', 9),
  (10, 'TravelTales', 'Itineraries, lessons learned, and the good, bad, and funny parts of travel.', TIMESTAMPTZ '2025-08-25 06:50:00+00', 10),
  (11, 'MindfulMoments', 'Mindfulness, journaling, and small routines that lower the noise.', TIMESTAMPTZ '2025-09-12 01:31:00+00', 1),
  (12, 'PetPals', 'Training, enrichment, and the chaos-and-joy of living with animals.', TIMESTAMPTZ '2025-09-01 20:12:00+00', 2),
  (13, 'MusicMix', 'Albums, live shows, playlists, and notes on what makes a track stick.', TIMESTAMPTZ '2025-08-21 14:53:00+00', 3),
  (14, 'GameGrid', 'Co-op nights, tabletop recs, and games worth your time (and money).', TIMESTAMPTZ '2025-09-09 09:34:00+00', 4),
  (15, 'CodeCraft', 'Coding practice, refactors, testing, and learning paths that actually help.', TIMESTAMPTZ '2025-08-29 04:15:00+00', 5),
  (16, 'PhotoFocus', 'Shooting, editing, and storytelling—gear is welcome but not required.', TIMESTAMPTZ '2025-08-18 22:56:00+00', 6),
  (17, 'HomeHaven', 'DIY projects, small-space ideas, and making a home feel intentional.', TIMESTAMPTZ '2025-09-06 17:37:00+00', 7),
  (18, 'StudySprint', 'Study systems, productivity experiments, and surviving deadlines with sanity.', TIMESTAMPTZ '2025-08-26 12:18:00+00', 8),
  (19, 'StyleScene', 'Wardrobe building, fit notes, and style that works in real life.', TIMESTAMPTZ '2025-09-04 06:59:00+00', 9),
  (20, 'ScienceSpot', 'Science explainers, research headlines, and curiosity-driven discussion.', TIMESTAMPTZ '2025-08-24 01:40:00+00', 10),
  (21, 'DataKitchen', 'Data cleaning, analysis habits, and “how did this CSV get like this?” stories.', TIMESTAMPTZ '2025-09-11 20:21:00+00', 1),
  (22, 'LinuxLounge', 'Linux tips, shell tricks, and troubleshooting notes you’ll want later.', TIMESTAMPTZ '2025-08-31 15:02:00+00', 2),
  (23, 'IndieDev', 'Shipping games/apps, scope control, and the messy middle of building.', TIMESTAMPTZ '2025-08-21 09:43:00+00', 3),
  (24, 'CareerCatalyst', 'Interviews, CVs, career pivots, and professional growth without clichés.', TIMESTAMPTZ '2025-09-08 04:24:00+00', 4),
  (25, 'ParentingPatch', 'Parenting routines, gentle hacks, and sharing what worked this week.', TIMESTAMPTZ '2025-08-20 06:05:00+00', 5);

-- 100 posts
-- CHANGED: created_date is now randomized between (now() - 3 months) and (now() - 1 minute)
INSERT INTO post (post_id, post_name, description, vote_count, created_date, user_id, community_id)
VALUES
  (1, 'Why my API got slower after a "simple" change', 'A small refactor turned into a performance regression. Here’s what the profiler showed and the fix that actually held.', 30, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 5, 1),
  (2, 'My VS Code + Spring Boot setup!', 'Extensions, keybindings, and a couple of editor settings that made debugging and tests less painful.', 8, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 9, 1),
  (3, 'When to reach for caching (and when it’s a trap)', 'A practical checklist: what to measure first, where caches help, and the failure modes that bite later.', 11, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 3, 1),
  (4, 'The best code review comment I’ve received this year', 'A single question changed how I structure services. Sharing it (and the before/after).', 1, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 7, 1),
  (5, 'I ranked 7 ramen bowls so you don’t have to', 'Notes on broth, noodles, and whether the queue is worth it. Bonus: the one place that nailed the egg.', 5, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 2, 2),
  (6, 'Weeknight pasta that tastes like you tried', 'A 25-minute pantry recipe with a few small tricks that make it restaurant-adjacent.', 10, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 6, 2),
  (7, 'Spicy and delicious: my go-to chilli oil', 'Tried three methods; this one had the best aroma and didn’t turn bitter in the fridge.', 0, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 10, 2),
  (8, 'Best bakeries for a rainy Saturday walk', 'Croissants, cardamom buns, and one shockingly good vegan brownie.', 2, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 4, 2),
  (9, 'A two-hour loop that felt like a full-day hike', 'Steep bits, quiet sections, and where to stop for the view without blocking the path.', 7, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 9, 3),
  (10, 'Gear I stopped carrying (and didn’t miss)', 'What I removed from my pack after a season of tweaks—and what I kept for safety.', 9, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 3, 3),
  (11, 'Planning routes when the weather’s unpredictable', 'A simple process using two sources, an exit plan, and a hard turnaround time.', 4, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 7, 3),
  (12, 'Trail etiquette that makes everyone’s day better', 'Small habits—passing, dogs, music, and groups—that prevent the usual friction.', 0, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 1, 3),
  (13, 'Books that pulled me out of a reading slump', 'Short, propulsive reads with strong openings—no guilt if you only have 20 minutes.', 6, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 6, 4),
  (14, 'My note-taking system for fiction!', 'A light-touch approach: a few sticky flags and one page of reflections.', 11, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 10, 4),
  (15, 'Book club: questions that lead to actual discussion', 'Prompts that go beyond “did you like it?” and avoid turning into a plot quiz.', 1, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 4, 4),
  (16, 'Underrated audiobooks with excellent narration', 'Performances that add something extra without going full theatre kid.', 3, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 8, 4),
  (17, 'The mobility routine that fixed my desk-shoulders', 'Ten minutes, no equipment. What I did daily, and what I do before lifting now.', 8, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 3, 5),
  (18, 'Beginner strength plan that doesn’t burn you out', 'Three days a week, simple progression, and realistic rest—designed for consistency.', 10, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 7, 5),
  (19, 'Protein myths I finally stopped believing', 'What mattered for me: totals, timing, and the boring stuff that works.', 5, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 1, 5),
  (20, 'How to track progress without becoming obsessive', 'Metrics that help, metrics that lie, and how I review my log once a week.', 0, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 5, 5),
  (21, 'Great films under 100 minutes', 'Tight pacing, big impact. Perfect for weeknights when your brain is fried.', 4, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 10, 6),
  (22, 'My ‘one-bite’ test for movie recommendations', 'If you only describe one scene to sell a film, what should it be?', 9, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 4, 6),
  (23, 'Comfort movies that aren’t just nostalgia', 'Warm, rewatchable picks that still hold up on the third viewing.', 11, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 8, 6),
  (24, 'What makes a good twist ending (and what doesn’t)', 'No spoilers—just the mechanics that make surprises feel earned.', 1, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 2, 6),
  (25, 'Checklist before handing off UI to devs', 'Spacing, states, copy, and accessibility notes that prevent last-minute chaos.', 6, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 7, 7),
  (26, 'Critique phrasing that keeps teams calm', 'Ways to be direct without being blunt, plus questions that unlock the real issue.', 11, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 1, 7),
  (27, 'Design tokens: the highest ROI change', 'How we introduced tokens gradually and avoided breaking everything.', 1, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 5, 7),
  (28, 'Micro-interactions that feel premium (not annoying)', 'Tiny transitions and feedback patterns that help users, not distract them.', 3, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 9, 7),
  (29, 'I tried no-spend weekdays for a month', 'What I learned, what actually saved money, and what was just self-punishment.', 8, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 4, 8),
  (30, 'Meal prep on £25 without eating sad salads', 'A realistic weekly shop, plus the two staples that stretch everything else.', 10, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 8, 8),
  (31, 'How I audit subscriptions in 15 minutes', 'A repeatable process and the cancellation scripts I keep in Notes.', 5, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 2, 8),
  (32, 'Cheap upgrades that made my flat feel nicer', 'Small buys with high ‘daily enjoyment’ ROI—no influencer gadgetry.', 0, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 6, 8),
  (33, 'Compost mistakes I finally fixed', 'Too wet, too dry, and the one change that stopped the smell.', 4, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 1, 9),
  (34, 'Plants that survived my worst week', 'Low-drama options for when you forget to water and life happens.', 9, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 5, 9),
  (35, 'Seed starting: what I’ll do differently next spring', 'Light, timing, and labels—because apparently I can’t identify basil seedlings.', 11, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 9, 9),
  (36, 'Keeping slugs away without going scorched earth', 'A few practical barriers and what didn’t work for me.', 1, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 3, 9),
  (37, '48 hours in Lisbon without rushing', 'A calm itinerary: viewpoints, pastries, and when to take the tram vs walk.', 6, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 8, 10),
  (38, 'Packing list: what I stopped bringing', 'The stuff I never used, and the two items that always earn their place.', 11, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 2, 10),
  (39, 'How I choose a neighbourhood (not just a hotel)', 'Noise, transport, and the ‘five-minute rule’ for cafés and groceries.', 1, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 6, 10),
  (40, 'Best travel purchases under £30', 'Adapters, pouches, and one boring thing that saved a trip.', 3, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 10, 10),
  (41, 'A 5-minute morning routine that actually stuck', 'Breathing, water, one sentence of journaling. The point is repetition, not perfection.', 8, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 5, 11),
  (42, 'Journaling prompts that aren’t cringe', 'Questions that produce useful answers—especially when you’re anxious or stuck.', 10, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 9, 11),
  (43, 'How I handle phone doomscrolling...', 'Settings, boundaries, and a ‘two-check’ rule that lowered my screen time.', 5, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 3, 11),
  (44, 'Meditation apps: what helped and what annoyed me', 'Comparing a few options and why the simplest timer is sometimes best.', 0, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 7, 11),
  (45, 'Crate training at night: what worked for us', 'Short sessions, predictable bedtime, and the mistake I made on day one.', 4, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 2, 12),
  (46, 'Enrichment ideas for rainy days', 'Low-effort games that burn energy without destroying your living room.', 9, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 6, 12),
  (47, 'Vet visit anxiety: small steps that helped', 'Handling practice, treats, and how we made the carrier less scary.', 11, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 10, 12),
  (48, 'Best ‘no drama’ toys for chewers', 'What lasted, what didn’t, and why texture matters more than price.', 1, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 4, 12),
  (49, 'Three albums that sound better on headphones', 'Production details you miss on speakers—plus the track where it clicks.', 6, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 9, 13),
  (50, 'How I build a playlist that doesn’t get skipped', 'Flow, energy mapping, and the rule I use for transitions.', 11, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 3, 13),
  (51, 'Concert etiquette: a gentle rant', 'Phones, talking, and how to have fun without ruining it for others.', 1, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 7, 13),
  (52, 'New releases that grew on me', 'First listen vs fifth listen—why some records take a little time.', 3, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 1, 13),
  (53, 'Co-op games that don’t punish new players', 'Low friction, good onboarding, and fun even when someone’s learning the controls.', 8, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 6, 14),
  (54, 'Tabletop night tips for hosts', 'Timing, snacks, and how to teach rules without a 30-minute lecture.', 10, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 10, 14),
  (55, 'My favourite ‘one more round’ roguelites', 'Runs are short, decisions are interesting, and the failure is part of the fun.', 5, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 4, 14),
  (56, 'Accessibility options that should be standard', 'Subtitles, remapping, and why difficulty sliders aren’t ‘cheating’.', 0, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 8, 14),
  (57, 'A refactor that made my tests readable', 'Less mocking, clearer naming, and one helper function that paid for itself.', 4, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 3, 15),
  (58, 'Debugging checklist I keep on my desk', 'A boring, reliable sequence: reproduce, isolate, instrument, verify.', 9, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 7, 15),
  (59, 'How I learn a new framework without drowning', 'Docs, small projects, and deliberate repetition—no ‘watch 20 hours’ plans.', 11, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 1, 15),
  (60, 'Naming things: a practical approach', 'Patterns that reduce ambiguity and make code reviews faster.', 1, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 5, 15),
  (61, 'Street photography: asking vs not asking', 'What I do in different situations, and how I avoid being creepy.', 6, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 10, 16),
  (62, 'Editing workflow for consistent colour', 'A simple baseline process that keeps a series looking cohesive.', 11, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 4, 16),
  (63, 'My favourite lens isn’t my sharpest', 'Why handling and focal length matter more than charts for my shots.', 1, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 8, 16),
  (64, 'How to shoot in harsh midday sun', 'Shadow hunting, reflective surfaces, and leaning into contrast.', 3, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 2, 16),
  (65, 'DIY coffee nook in a weekend', 'A small shelf, better lighting, and cable management that stopped the mess.', 8, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 7, 17),
  (66, 'Paint choices that made my rooms feel bigger', 'Undertones, sample cards, and why I don’t trust tiny swatches anymore.', 10, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 1, 17),
  (67, 'How I organised a ‘junk drawer’ properly', 'Dividers, categories, and the rule that keeps it from relapsing.', 5, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 5, 17),
  (68, 'Cheap soundproofing tweaks for thin walls', 'Soft furnishings, door seals, and what actually reduced the noise.', 0, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 9, 17),
  (69, 'Spaced repetition schedule that survived finals', 'A weekly plan that adapts when you miss a day—without collapsing.', 4, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 4, 18),
  (70, 'Pomodoro alternatives when you hate timers', 'Longer blocks, theme days, and how I track focus without guilt.', 9, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 8, 18),
  (71, 'How I take lecture notes I can actually revise from', 'Structure, headings, and the ‘one summary line’ trick.', 11, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 2, 18),
  (72, 'Study group rules that prevent chaos', 'Agenda, roles, and when to stop before it turns into social hour.', 1, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 6, 18),
  (73, 'Capsule wardrobe: two shoes that do most of the work', 'What pairs with almost everything and still feels intentional.', 6, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 1, 19),
  (74, 'How I shop second-hand without wasting weekends', 'Filters, measurements, and a decision rule for walking away.', 11, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 5, 19),
  (75, 'Fit notes: why sleeves matter more than you think', 'Small tailoring tweaks that make cheap clothes look better.', 1, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 9, 19),
  (76, 'Outfits for cold rain without looking like a bin bag', 'Layers, fabrics, and the one coat feature I now insist on.', 3, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 3, 19),
  (77, 'Explaining CRISPR to my mum: the analogy that landed', 'A simple metaphor, plus the limitations people gloss over.', 8, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 8, 20),
  (78, 'What a ‘p-value’ is (and isn’t) in plain English', 'A short explanation with examples of common mistakes.', 10, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 2, 20),
  (79, 'Space news I’m actually excited about this month', 'Missions, timelines, and what would count as real progress.', 5, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 6, 20),
  (80, 'Why science headlines oversimplify so often', 'Press releases, incentives, and how to read beyond the first paragraph.', 0, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 10, 20),
  (81, 'Cleaning messy CSVs without losing your mind', 'Naming, types, and the three checks I run before I trust a dataset.', 4, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 5, 21),
  (82, 'A quick guide to deduplication that won’t bite later', 'Keys, fuzzy matches, and documenting rules so your future self doesn’t suffer.', 9, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 9, 21),
  (83, 'How I write SQL I can read six months later', 'CTEs, naming conventions, and avoiding clever one-liners.', 11, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 3, 21),
  (84, 'Visual checks that catch bad data fast', 'Simple plots/tables that expose unit mix-ups and impossible values.', 1, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 7, 21),
  (85, 'My bash aliases that paid for themselves', 'Small shortcuts for git, docker, and navigation—nothing magical, just useful.', 6, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 2, 22),
  (86, 'When permissions go weird: a troubleshooting flow', 'Who owns it, what mode it has, and how to fix without chmod 777.', 11, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 6, 22),
  (87, 'A practical tmux setup for people who don’t love tmux', 'Two panes, sane shortcuts, and how I keep sessions tidy.', 1, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 10, 22),
  (88, 'What I wish I knew about journald logs', 'Filtering, persistence, and the commands I reach for first.', 3, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 4, 22),
  (89, 'How we cut scope and still shipped', 'A brutally honest look at what we removed, and why the game got better.', 8, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 9, 23),
  (90, 'Marketing week-by-week: what felt worth it', 'Tiny routines that built momentum without becoming a second job.', 10, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 3, 23),
  (91, 'Bug triage: the ‘player pain’ method', 'A prioritisation approach that saved us from polishing the wrong things.', 5, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 7, 23),
  (92, 'Devlogs: what to share (and what to keep private)', 'Balancing transparency with protecting your energy and focus.', 0, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 1, 23),
  (93, 'Interview stories that don’t sound rehearsed', 'A structure that feels natural, plus how I tailor examples to the role.', 4, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 6, 24),
  (94, 'How I negotiate without feeling awkward', 'Scripts, ranges, and the one line that keeps things collaborative.', 9, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 10, 24),
  (95, 'CV bullets: the difference between ‘did’ and ‘delivered’', 'Turning tasks into outcomes with evidence and scope.', 11, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 4, 24),
  (96, 'What I track in a job search spreadsheet', 'Applications, follow-ups, and notes that stop you repeating yourself.', 100, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 8, 24),
  (97, 'Meal prep for toddlers that doesn’t become a fight', 'A few reliable foods, rotating options, and keeping choices bounded.', 75, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 3, 25),
  (98, 'Bedtime routines: the boring consistency that works', 'Sequence, timing, and what we do when it derails.', 0, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 7, 25),
  (99, 'Screen time rules we can actually stick to', 'Clear boundaries and avoiding the ‘one more video’ spiral.', 25, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 1, 25),
  (100, 'Small wins: activities that fill 30 minutes', 'Low-prep ideas for the end-of-day slump when everyone’s tired.', 0, (now() - interval '3 months') + (random() * (interval '3 months' - interval '1 minute')), 6, 25);

-- 500 comments (variable per-post counts; distribution is shuffled so neighbouring post_ids don’t look patterned)
WITH
  comment_texts AS (
    SELECT ARRAY[
      'Agree with this. The small details are what make it work.',
      'I tried something similar and hit the same issue—good to know I''m not alone.',
      'This is the kind of post I wish I’d found last month.',
      'Solid write-up. The checklist format is especially helpful.',
      'Counterpoint: I think it depends on context, but your approach is sensible.',
      'Nice. What would you change if you had to do it again from scratch?',
      'That second tip is underrated. It''s usually where things fall apart.',
      'I’m saving this for later—thanks for being specific.',
      'Quick question: did you measure before/after, or was it more of a feel thing?',
      'I love posts like this because they show the messy middle, not just the final result.',
      'Small note: watch out for edge cases if you scale this up.',
      'This matches my experience almost exactly.',
      'Appreciate the honesty here. The trade-offs are real.',
      'I disagree on one point, but the reasoning is strong.',
      'That’s a great rule of thumb. Simple and memorable.',
      'Can confirm: this works surprisingly well.',
      'What tools did you use for tracking? Curious about your setup.',
      'Thanks—stealing this idea for my own workflow.',
      'Ha, I made the same mistake. Learned it the hard way.',
      'The ‘boring’ solution is often the correct one.',
      'This is much more practical than most advice I see.',
      'I’d add one more step: document the decision so future-you remembers why.',
      'Good reminder that consistency beats intensity.',
      'Interesting—how long did it take before you noticed results?',
      'This is a great example of choosing ‘good enough’ and shipping.',
      'I’m going to try this this week and report back.',
      'One thing that helped me: making the next action tiny.',
      'This reads like someone who actually did it, not just repeated a blog post.',
      'Not sure I agree, but I see why you landed there.',
      'That’s a neat framing. Makes the decision easier.',
      'Your point about failure modes is spot on.',
      'Love the emphasis on measurement over vibes.',
      'This is the first explanation that made it click for me.',
      'Do you have a template for this, or do you just keep it in notes?',
      'This is exactly the kind of nuance people skip.',
      'I tried the opposite approach and it backfired—your way sounds safer.',
      'Good call on setting a hard cutoff time. That saves so many bad afternoons.',
      'I’d be curious what you’d recommend to a total beginner.',
      'This is motivating in a realistic way, not the ‘grindset’ version.',
      'One more vote for keeping it simple.',
      'I appreciate that you mentioned what didn’t work too.',
      'This is a reminder to stop over-optimising.',
      'That’s a clever workaround, but I worry it hides the root cause.',
      'Great breakdown. The examples make it feel concrete.',
      'I’ve been meaning to do this—this post is the nudge I needed.',
      'Can you share the rough numbers? Even ballpark would help.',
      'Feels like a healthy balance: structure without being rigid.',
      'Yep. I’ve seen teams fight over this exact thing.',
      'Your ‘decision rule’ is excellent.',
      'I laughed at the label comment because… same.',
      'I’d never considered it that way. Helpful perspective.',
      'This is the kind of advice that scales.',
      'I’m bookmarking this. Future me will thank you.',
      'I’m surprised more people don’t talk about this.',
      'That last paragraph is the real takeaway.',
      'Hard agree on avoiding the ‘quick fix’ trap.',
      'Thanks for writing this up clearly.',
      'I’m curious how you’d adapt this if you only had 30 minutes.',
      'Good reminder to build habits around reality, not ideal days.',
      'I tried this and it made my week calmer.',
      'Small disagreement: I think the trade-off is worth it in some cases.',
      'This is refreshingly straightforward.',
      'I used to do this the hard way—this is better.',
      'The way you explained it is very approachable.',
      'I’d add: plan for the ‘bad day’ version, not the perfect one.',
      'Nice. Also, don’t underestimate sleep.',
      'This is the first time this topic didn’t feel intimidating.',
      'Your example made me rethink my own process.',
      'Helpful, thank you. The ‘two sources’ idea is smart.',
      'That’s a good reminder about turning back early.',
      'Respectfully: I think people over-index on tools and under-index on practice.',
      'I’m going to share this with a friend.',
      'That’s a strong point about accessibility; it benefits everyone.',
      'Agree. Also: avoid being the loud group on the trail.',
      'Thank you for the cancellation script idea—genius.',
      'This makes me want to do a small experiment this weekend.',
      'Good note about not defaulting to ‘chmod 777’...',
      'Nice tmux setup—simple is best.',
      'Love the ‘player pain’ approach to triage.',
      'That negotiation line is excellent.',
      'This is a better CV bullet explanation than most career sites.',
      'Great parenting tip—bounded choices really help.',
      'That bedtime sequence sounds familiar. Consistency is everything.',
      'Appreciate the reality check. Perfect is the enemy.',
      'Love this. I’ll try the 10-minute version first.'
    ]::text[] AS phrases
  ),

  posts AS (
    SELECT p.post_id, p.created_date AS post_created
    FROM post p
  ),

  -- ~14% with zero comments; shuffled, not clustered
  zeros AS (
    SELECT post_id
    FROM posts
    ORDER BY abs(hashtext(post_id::text || ':zero'))
    LIMIT 14
  ),

  -- Safe deterministic pseudo-random u in (0.05..0.95)
  uvals AS (
    SELECT
      p.post_id,
      p.post_created,
      CASE
        WHEN z.post_id IS NOT NULL THEN NULL
        ELSE
          0.05
          + (
              (abs(hashtext(p.post_id::text || ':u'))::numeric / 2147483647.0)
              * 0.90
            )
      END AS u
    FROM posts p
    LEFT JOIN zeros z ON z.post_id = p.post_id
  ),

  -- Heavy-tail-ish weights; no negatives possible
  weights AS (
    SELECT
      p.post_id,
      p.post_created,
      CASE
        WHEN u.u IS NULL THEN 0.0
        ELSE (1.0 / power(u.u, 1.35))
      END AS w
    FROM posts p
    LEFT JOIN uvals u ON u.post_id = p.post_id
  ),

  total_weight AS (
    SELECT SUM(w) AS sum_w FROM weights
  ),

  alloc_raw AS (
    SELECT
      w.post_id,
      w.post_created,
      (w.w / tw.sum_w) * 500.0 AS exact_alloc
    FROM weights w
    CROSS JOIN total_weight tw
  ),

  alloc_floor AS (
    SELECT
      a.post_id,
      a.post_created,
      floor(a.exact_alloc)::int AS base_cnt,
      (a.exact_alloc - floor(a.exact_alloc)) AS frac
    FROM alloc_raw a
  ),

  remainder AS (
    SELECT 500 - SUM(base_cnt) AS r FROM alloc_floor
  ),

  alloc_final AS (
    SELECT
      af.post_id,
      af.post_created,
      af.base_cnt
        + CASE
            WHEN row_number() OVER (ORDER BY af.frac DESC, abs(hashtext(af.post_id::text || ':t'))) <= (SELECT r FROM remainder)
            THEN 1 ELSE 0
          END AS comment_count
    FROM alloc_floor af
  ),

  expanded AS (
    SELECT
      a.post_id,
      a.post_created,
      gs AS idx,
      row_number() OVER (ORDER BY a.post_id, gs) AS comment_id,
      ((a.post_id + gs * 3) % 10) + 1 AS user_id
    FROM alloc_final a
    JOIN LATERAL generate_series(1, a.comment_count) gs ON true
  ),

  final_rows AS (
    SELECT
      e.comment_id,
      (SELECT phrases[((e.post_id * 31 + e.idx * 7) % array_length(phrases, 1)) + 1] FROM comment_texts) AS text,
      e.post_id,
      e.post_created
        + (
            (
              ((e.idx * 37 + e.post_id * 11) % GREATEST(5, (EXTRACT(EPOCH FROM (now() - e.post_created))::int - 5)))
              + 5
            ) * INTERVAL '1 second'
          ) AS created_date,
      e.user_id
    FROM expanded e
  )

INSERT INTO comment (comment_id, text, post_id, created_date, user_id)
SELECT comment_id, text, post_id, created_date, user_id
FROM final_rows
ORDER BY comment_id;


-- Ensure identity sequences continue after the explicit IDs above
SELECT setval(pg_get_serial_sequence('users', 'user_id'), (SELECT MAX(user_id) FROM users));
SELECT setval(pg_get_serial_sequence('community', 'community_id'), (SELECT MAX(community_id) FROM community));
SELECT setval(pg_get_serial_sequence('post', 'post_id'), (SELECT MAX(post_id) FROM post));
SELECT setval(pg_get_serial_sequence('comment', 'comment_id'), (SELECT MAX(comment_id) FROM comment));
