import mongoose from 'mongoose';
import Activity from '../models/activity';
import LeaderboardEntry from '../models/leaderboard';
import Team from '../models/team';
import User from '../models/user';
import Workout from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'alex_runner', email: 'alex@example.com', displayName: 'Alex Rivera' },
      { username: 'jamie_lifts', email: 'jamie@example.com', displayName: 'Jamie Chen' },
      { username: 'taylor_yoga', email: 'taylor@example.com', displayName: 'Taylor Morgan' },
    ]);

    await Team.create([
      {
        name: 'Morning Momentum',
        description: 'Early risers building a consistent fitness habit.',
        members: [users[0]._id, users[2]._id],
      },
      {
        name: 'Strength Circuit',
        description: 'Progressive strength training with friendly competition.',
        members: [users[1]._id],
      },
    ]);

    await Activity.create([
      {
        user: users[0]._id,
        type: 'Running',
        durationMinutes: 35,
        calories: 320,
        completedAt: new Date('2026-09-12T07:30:00Z'),
      },
      {
        user: users[1]._id,
        type: 'Strength training',
        durationMinutes: 45,
        calories: 280,
        completedAt: new Date('2026-09-13T17:00:00Z'),
      },
      {
        user: users[2]._id,
        type: 'Yoga',
        durationMinutes: 30,
        calories: 140,
        completedAt: new Date('2026-09-14T06:45:00Z'),
      },
    ]);

    await LeaderboardEntry.create([
      { user: users[0]._id, points: 840 },
      { user: users[1]._id, points: 760 },
      { user: users[2]._id, points: 690 },
    ]);

    await Workout.create([
      {
        name: 'Foundation Run',
        description: 'A steady-paced run designed to build aerobic endurance.',
        difficulty: 'beginner',
        durationMinutes: 30,
        exercises: ['Warm-up walk', 'Steady run', 'Cool-down stretch'],
      },
      {
        name: 'Full Body Builder',
        description: 'A balanced strength session for the major movement patterns.',
        difficulty: 'intermediate',
        durationMinutes: 40,
        exercises: ['Squats', 'Push-ups', 'Rows', 'Reverse lunges', 'Plank'],
      },
      {
        name: 'Power Intervals',
        description: 'Short, demanding intervals for experienced athletes.',
        difficulty: 'advanced',
        durationMinutes: 25,
        exercises: ['Sprint intervals', 'Burpees', 'Mountain climbers', 'Recovery jog'],
      },
    ]);

    console.log('Database seeding complete: 3 users, 2 teams, 3 activities, 3 leaderboard entries, and 3 workouts');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
