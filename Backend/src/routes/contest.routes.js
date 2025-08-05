import {Router} from 'express'
import { createContest } from '../controllers/contest.controller.js';

const router = Router();


router.route('/create').post(createContest);


export default router;