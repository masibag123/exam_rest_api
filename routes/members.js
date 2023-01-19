import express from 'express'
import { getMember, getMembers, updateMember, deleteMember} from '../controllers/members.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router();

router.get('/', verifyToken, getMembers)
router.get('/:id', verifyToken, getMember)
router.put('/:id', verifyToken, updateMember)
router.delete('/:id', verifyToken, deleteMember)

export default router