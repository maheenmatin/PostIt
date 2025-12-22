-- Run from /workspace/PostIt/postit: psql -h localhost -U postit_user -d postit -f seed.sql
BEGIN;

TRUNCATE TABLE
  post,
  community,
  users
RESTART IDENTITY
CASCADE;

INSERT INTO users (user_id, username, password, email, enabled, created_date)
VALUES
  (1, 'alice', '$2b$12$b2Hp6XEAf.nQp39FprwxhO/fGSr3TzJ9f/CarRuZHKidFNcrZDSWy', 'alice@example.com', true, CURRENT_TIMESTAMP),
  (2, 'ben', '$2b$12$b2Hp6XEAf.nQp39FprwxhO/fGSr3TzJ9f/CarRuZHKidFNcrZDSWy', 'ben@example.com', true, CURRENT_TIMESTAMP),
  (3, 'charlie', '$2b$12$b2Hp6XEAf.nQp39FprwxhO/fGSr3TzJ9f/CarRuZHKidFNcrZDSWy', 'charlie@example.com', true, CURRENT_TIMESTAMP),
  (4, 'daria', '$2b$12$b2Hp6XEAf.nQp39FprwxhO/fGSr3TzJ9f/CarRuZHKidFNcrZDSWy', 'daria@example.com', true, CURRENT_TIMESTAMP),
  (5, 'eddie', '$2b$12$b2Hp6XEAf.nQp39FprwxhO/fGSr3TzJ9f/CarRuZHKidFNcrZDSWy', 'eddie@example.com', true, CURRENT_TIMESTAMP),
  (6, 'fatima', '$2b$12$b2Hp6XEAf.nQp39FprwxhO/fGSr3TzJ9f/CarRuZHKidFNcrZDSWy', 'fatima@example.com', true, CURRENT_TIMESTAMP),
  (7, 'gianna', '$2b$12$b2Hp6XEAf.nQp39FprwxhO/fGSr3TzJ9f/CarRuZHKidFNcrZDSWy', 'gianna@example.com', true, CURRENT_TIMESTAMP),
  (8, 'hugo', '$2b$12$b2Hp6XEAf.nQp39FprwxhO/fGSr3TzJ9f/CarRuZHKidFNcrZDSWy', 'hugo@example.com', true, CURRENT_TIMESTAMP),
  (9, 'isla', '$2b$12$b2Hp6XEAf.nQp39FprwxhO/fGSr3TzJ9f/CarRuZHKidFNcrZDSWy', 'isla@example.com', true, CURRENT_TIMESTAMP),
  (10, 'jun', '$2b$12$b2Hp6XEAf.nQp39FprwxhO/fGSr3TzJ9f/CarRuZHKidFNcrZDSWy', 'jun@example.com', true, CURRENT_TIMESTAMP);

INSERT INTO community (community_id, name, description, created_date, user_user_id)
VALUES
  (1, 'TechTalk', 'News and ideas for builders, developers, and curious technologists.', CURRENT_TIMESTAMP, 1),
  (2, 'CityEats', 'Share the best local bites, hidden gems, and cooking tips.', CURRENT_TIMESTAMP, 2),
  (3, 'TrailSeekers', 'Find new hikes, routes, and outdoor adventures.', CURRENT_TIMESTAMP, 3),
  (4, 'BookNook', 'Reading lists, reviews, and cozy book discussions.', CURRENT_TIMESTAMP, 4),
  (5, 'FitnessForge', 'Workouts, recovery, and wellness advice.', CURRENT_TIMESTAMP, 5),
  (6, 'MovieMarathon', 'Movie recommendations, reviews, and weekly watch parties.', CURRENT_TIMESTAMP, 6),
  (7, 'DesignDesk', 'Creative inspiration for designers and makers.', CURRENT_TIMESTAMP, 7),
  (8, 'BudgetBytes', 'Frugal living and money-saving strategies.', CURRENT_TIMESTAMP, 8),
  (9, 'GardenGate', 'Plant care, garden plans, and seasonal tips.', CURRENT_TIMESTAMP, 9),
  (10, 'TravelTales', 'Travel stories, tips, and itineraries.', CURRENT_TIMESTAMP, 10),
  (11, 'MindfulMoments', 'Mindfulness, journaling, and calm routines.', CURRENT_TIMESTAMP, 1),
  (12, 'PetPals', 'Pets, training tips, and adorable stories.', CURRENT_TIMESTAMP, 2),
  (13, 'MusicMix', 'Playlists, concerts, and new releases.', CURRENT_TIMESTAMP, 3),
  (14, 'GameGrid', 'Games, esports, and tabletop nights.', CURRENT_TIMESTAMP, 4),
  (15, 'CodeCraft', 'Coding challenges and learning resources.', CURRENT_TIMESTAMP, 5),
  (16, 'PhotoFocus', 'Photography tips and gear recommendations.', CURRENT_TIMESTAMP, 6),
  (17, 'HomeHaven', 'Interior inspiration and DIY projects.', CURRENT_TIMESTAMP, 7),
  (18, 'StudySprint', 'Study techniques and productivity hacks.', CURRENT_TIMESTAMP, 8),
  (19, 'StyleScene', 'Fashion finds and style guides.', CURRENT_TIMESTAMP, 9),
  (20, 'ScienceSpot', 'Science news and explainers.', CURRENT_TIMESTAMP, 10);

INSERT INTO post (post_id, post_name, description, vote_count, created_date, user_id, community_id)
VALUES
  (1, 'Daily tech roundup', 'Highlights from today''s tech headlines.', 0, CURRENT_TIMESTAMP, 1, 1),
  (2, 'Best tacos downtown', 'A quick guide to my top three taco stops.', 2, CURRENT_TIMESTAMP, 2, 2),
  (3, 'Sunrise trail review', 'Trail conditions, difficulty, and photo spots.', 1, CURRENT_TIMESTAMP, 3, 3),
  (4, 'Cozy fantasy picks', 'Five fantasy novels that feel like a warm blanket.', 3, CURRENT_TIMESTAMP, 4, 4),
  (5, 'Beginner strength plan', 'A simple weekly plan for building consistency.', 4, CURRENT_TIMESTAMP, 5, 5),
  (6, 'Weekend watch list', 'What to stream this weekend with friends.', 0, CURRENT_TIMESTAMP, 6, 6),
  (7, 'Design critique tips', 'How to deliver constructive feedback gracefully.', 5, CURRENT_TIMESTAMP, 7, 7),
  (8, 'Meal prep on $25', 'Stretching groceries for the week.', 1, CURRENT_TIMESTAMP, 8, 8),
  (9, 'Spring planting guide', 'What to plant now for a summer harvest.', 2, CURRENT_TIMESTAMP, 9, 9),
  (10, 'Budget travel itinerary', 'A three-day city escape with minimal spend.', 3, CURRENT_TIMESTAMP, 10, 10),
  (11, 'Morning mindfulness', 'A short routine to start the day calm.', 0, CURRENT_TIMESTAMP, 1, 11),
  (12, 'Puppy training basics', 'First-week essentials for new puppy parents.', 2, CURRENT_TIMESTAMP, 2, 12),
  (13, 'Album of the week', 'A deep dive into a standout release.', 1, CURRENT_TIMESTAMP, 3, 13),
  (14, 'Top co-op games', 'Great games to play with friends online.', 4, CURRENT_TIMESTAMP, 4, 14),
  (15, 'Learning sprint plan', 'A 30-day roadmap to level up your skills.', 6, CURRENT_TIMESTAMP, 5, 15),
  (16, 'Street photography tips', 'Capturing candid moments without being intrusive.', 0, CURRENT_TIMESTAMP, 6, 16),
  (17, 'DIY coffee nook', 'A simple weekend project for your kitchen.', 5, CURRENT_TIMESTAMP, 7, 17),
  (18, 'Finals study flow', 'Spacing techniques to retain more.', 2, CURRENT_TIMESTAMP, 8, 18),
  (19, 'Capsule wardrobe ideas', 'Build outfits with fewer pieces.', 1, CURRENT_TIMESTAMP, 9, 19),
  (20, 'New science explainer', 'Breaking down a recent discovery.', 3, CURRENT_TIMESTAMP, 10, 20),
  (21, 'Weekend build log', 'Progress update on my latest build.', 0, CURRENT_TIMESTAMP, 1, 1),
  (22, 'Best late-night bites', 'Quick list of late-night favorites.', 1, CURRENT_TIMESTAMP, 2, 2),
  (23, 'Trail gear checklist', 'Must-haves for longer hikes.', 2, CURRENT_TIMESTAMP, 3, 3),
  (24, 'Book club questions', 'Discussion prompts for the next meetup.', 0, CURRENT_TIMESTAMP, 4, 4),
  (25, 'Mobility reset', 'Five moves to recover after long workdays.', 4, CURRENT_TIMESTAMP, 5, 5),
  (26, 'Classic cinema picks', 'Three classics worth revisiting.', 1, CURRENT_TIMESTAMP, 6, 6),
  (27, 'Design portfolio fixes', 'Small tweaks that make a big impact.', 5, CURRENT_TIMESTAMP, 7, 7),
  (28, 'Saving on subscriptions', 'Trim recurring costs in 20 minutes.', 2, CURRENT_TIMESTAMP, 8, 8),
  (29, 'Backyard pollinator tips', 'Plants that attract bees and butterflies.', 3, CURRENT_TIMESTAMP, 9, 9),
  (30, 'Packing list essentials', 'What to pack for a quick getaway.', 0, CURRENT_TIMESTAMP, 10, 10),
  (31, 'Meditation app roundup', 'Comparing popular mindfulness apps.', 1, CURRENT_TIMESTAMP, 1, 11),
  (32, 'Cat enrichment ideas', 'DIY toys and engagement tips.', 2, CURRENT_TIMESTAMP, 2, 12),
  (33, 'Indie playlist finds', 'Ten tracks to soundtrack your week.', 3, CURRENT_TIMESTAMP, 3, 13),
  (34, 'Tabletop night tips', 'Hosting a smooth game night.', 4, CURRENT_TIMESTAMP, 4, 14),
  (35, 'Debugging checklist', 'Systematic steps to isolate bugs.', 5, CURRENT_TIMESTAMP, 5, 15),
  (36, 'Golden hour guide', 'Timing and settings for better light.', 2, CURRENT_TIMESTAMP, 6, 16),
  (37, 'Entryway refresh', 'Small changes for a welcoming space.', 1, CURRENT_TIMESTAMP, 7, 17),
  (38, 'Group study plan', 'Coordinating sessions that actually work.', 0, CURRENT_TIMESTAMP, 8, 18),
  (39, 'Seasonal color palette', 'A guide to colors that pop.', 2, CURRENT_TIMESTAMP, 9, 19),
  (40, 'Space news briefing', 'Updates from this week''s launches.', 3, CURRENT_TIMESTAMP, 10, 20),
  (41, 'Hardware wishlist', 'Tools I''m saving for this quarter.', 1, CURRENT_TIMESTAMP, 1, 1),
  (42, 'Local cafe tour', 'Ranking five cafes by vibe.', 2, CURRENT_TIMESTAMP, 2, 2),
  (43, 'Waterfall trail tips', 'Avoiding crowds and finding the best views.', 0, CURRENT_TIMESTAMP, 3, 3),
  (44, 'Short story swap', 'Share your favorite short stories.', 2, CURRENT_TIMESTAMP, 4, 4),
  (45, 'Meal plan template', 'Planning the week without overthinking it.', 3, CURRENT_TIMESTAMP, 5, 5),
  (46, 'Movie soundtrack picks', 'Soundtracks that elevate the film.', 1, CURRENT_TIMESTAMP, 6, 6),
  (47, 'Branding essentials', 'Foundational steps for consistent branding.', 4, CURRENT_TIMESTAMP, 7, 7),
  (48, 'Coupon stacking guide', 'Layering discounts for bigger savings.', 1, CURRENT_TIMESTAMP, 8, 8),
  (49, 'Soil health basics', 'Keeping soil nutrient-rich year round.', 2, CURRENT_TIMESTAMP, 9, 9),
  (50, 'Flight deal alerts', 'Tools to catch deals early.', 3, CURRENT_TIMESTAMP, 10, 10);

SELECT setval(pg_get_serial_sequence('users', 'user_id'), (SELECT MAX(user_id) FROM users));
SELECT setval(pg_get_serial_sequence('community', 'community_id'), (SELECT MAX(community_id) FROM community));
SELECT setval(pg_get_serial_sequence('post', 'post_id'), (SELECT MAX(post_id) FROM post));

COMMIT;
