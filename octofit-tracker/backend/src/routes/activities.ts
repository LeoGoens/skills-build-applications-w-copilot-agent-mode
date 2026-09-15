import { Router } from 'express';
import Activity from '../models/activity';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    res.json(await Activity.find().populate('user').sort({ completedAt: -1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).json(await Activity.create(req.body));
  } catch (error) {
    next(error);
  }
});

export default router;