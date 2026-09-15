import { Router } from 'express';
import Team from '../models/team';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    res.json(await Team.find().populate('members').sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).json(await Team.create(req.body));
  } catch (error) {
    next(error);
  }
});

export default router;