import { Router } from 'express';
import Workout from '../models/workout';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    res.json(await Workout.find().sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).json(await Workout.create(req.body));
  } catch (error) {
    next(error);
  }
});

export default router;