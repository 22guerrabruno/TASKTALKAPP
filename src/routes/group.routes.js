import { Router } from 'express'

import {
  getAllGroups,
  createNewGroup,
  editGroup,
  deleteMember,
  deleteGroup,
  getGroupByIdOrCreate,
  updateLastMessage,
} from '../controllers/group.controller.js'

const router = Router()

// Use GET for retrieving all groups??
router.get('/groups/:userId', getAllGroups)

router.post('/', createNewGroup)

router.put('/:id', editGroup)

router.patch('/:id', deleteMember)

router.delete('/:id', deleteGroup)

router.post('/group', getGroupByIdOrCreate)

router.patch('/group/lastMessage/:groupId', updateLastMessage)

export default router
