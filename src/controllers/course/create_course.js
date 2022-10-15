import { validationResult } from 'express-validator';
import responseHelper from '../../helpers/utils/response';
import indexDomain from '../../domains/index';
import validateHelper from '../../helpers/utils/validator_rebuild';

const createCourse = async (req, res) => {
  try {
    const { user, body } = req;
    const notValids = validationResult(req);
    if (!notValids.isEmpty()) {
      const valid = validateHelper(notValids);
      return responseHelper.errorValidate(res, valid);
    };
    const resCourse = await indexDomain.courseDomain.createCourse(user, body);
    if (!resCourse.status) return responseHelper.errorValidate(res, resCourse.notValid);
    return responseHelper.success(res, 'Create Course Success', resCourse.data);
  }
  catch (err) {
    return responseHelper.errorService(res, err.message);
  };
};

export default createCourse;
