import { Router } from 'express';
import LeaderboardEntry from '../models/leaderboard';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    res.json(await LeaderboardEntry.find().populate('user').sort({ points: -1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).json(await LeaderboardEntry.create(req.body));
  } catch (error) {
    next(error);
  }
});

export default router;