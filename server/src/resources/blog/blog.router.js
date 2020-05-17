import { Router } from 'express'
import controllers from './blog.controllers'

const router = Router()

// /api/blog
router
  .route('/')
  .get(controllers.getAll)
  .post(controllers.createOne)

router.route('/my-blog').get(controllers.getMany)

// /api/blog/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
