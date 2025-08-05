import {Router} from 'express';


 import { createSubmission } from '../controllers/submisson.controller.js';


const router = Router();

router.route('/create').post(createSubmission);

export default router;