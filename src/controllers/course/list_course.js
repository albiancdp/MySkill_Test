import { validationResult } from 'express-validator';
import responseHelper from '../../helpers/utils/response';
import indexDomain from '../../domains/index';
import validateHelper from '../../helpers/utils/validator_rebuild';

const listCourse = async (req, res) => {
  try {
    const notValids = validationResult(req);
    if (!notValids.isEmpty()) {
      const valid = validateHelper(notValids);
      return responseHelper.errorValidate(res, valid);
    };
    const resCourse = await indexDomain.courseDomain.listCourse(req);
    return responseHelper.success(res, 'Get List Course', resCourse);
  }
  catch (err) {
    return responseHelper.errorService(res, err.message);
  };
};

export default listCourse;
