import { db } from './drizzle';
import { users, teams, teamMembers } from './schema';

async function seed() {
  // With Google OAuth, users are created automatically on first sign-in.
  // This seed creates a test team for development purposes.

  const [team] = await db
    .insert(teams)
    .values({
      name: 'Test Team',
    })
    .returning();

  console.log('Test team created:', team.name);
}

seed()
  .catch((error) => {
    console.error('Seed process failed:', error);
    process.exit(1);
  })
  .finally(() => {
    console.log('Seed process finished. Exiting...');
    process.exit(0);
  });
