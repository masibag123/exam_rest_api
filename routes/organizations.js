import express from 'express'
import { getOrganization, getOrganizations, addOrganization, updateOrganization, deleteOrganization } from '../controllers/organizations.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router({mergeParams: true})

router.get('/', verifyToken, getOrganizations)
router.get('/:id', verifyToken, getOrganization)
router.post('/', verifyToken, addOrganization)
router.put('/:id', verifyToken, updateOrganization)
router.delete('/:id', verifyToken, deleteOrganization)

export default router
