import { validationResult } from 'express-validator';
import responseHelper from '../../helpers/utils/response';
import indexDomain from '../../domains/index';
import validateHelper from '../../helpers/utils/validator_rebuild';

const deleteCourse = async (req, res) => {
  try {
    const notValids = validationResult(req);
    if (!notValids.isEmpty()) {
      const valid = validateHelper(notValids);
      return responseHelper.errorValidate(res, valid);
    };
    const resCourse = await indexDomain.courseDomain.deleteCourse(req.params.id);
    if (!resCourse) return responseHelper.notFound(res, 'Course Not Found');
    return responseHelper.success(res, 'Delete Course', resCourse);
  }
  catch (err) {
    return responseHelper.errorService(res, err.message);
  };
};

export default deleteCourse;
