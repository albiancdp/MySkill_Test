import { validationResult } from 'express-validator';
import responseHelper from '../../helpers/utils/response';
import indexDomain from '../../domains/index';
import validateHelper from '../../helpers/utils/validator_rebuild';

const updateCourse = async (req, res) => {
  try {
    const notValids = validationResult(req);
    if (!notValids.isEmpty()) {
      const valid = validateHelper(notValids);
      return responseHelper.errorValidate(res, valid);
    };
    const courseId = req.params.id;
    delete req.params.id;
    const resCourse = await indexDomain.courseDomain.updateCourse(courseId, req.body);
    if (!resCourse) return responseHelper.notFound(res, 'Course Not Found');
    return responseHelper.success(res, 'Update Course', {});
  }
  catch (err) {
    return responseHelper.errorService(res, err.message);
  };
};

export default updateCourse;
