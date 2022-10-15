import express from 'express';
// import controller
import indexController from '../controllers/index';
import indexValidator from '../validators/index';

const router = express.Router();

router.route('/')
  .post(indexValidator.course_validator, indexController.courseController.createCourse);

router.route('/:id')
  .get(indexValidator.id_validator, indexController.courseController.readCourse);

router.route('/')
  .get(indexValidator.list_validator, indexController.courseController.listCourse);

router.route('/:id')
  .put(indexValidator.id_validator, indexValidator.course_validator, indexController.courseController.updateCourse);

router.route('/:id')
  .delete(indexValidator.id_validator, indexController.courseController.deleteCourse);

export default router;
