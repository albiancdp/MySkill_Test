import { validationResult } from 'express-validator';
import responseHelper from '../../helpers/utils/response';
import indexDomain from '../../domains/index';
import validateHelper from '../../helpers/utils/validator_rebuild';

const createRegister = async (req, res) => {
  try {
    const notValids = validationResult(req);
    if (!notValids.isEmpty()) {
      const valid = validateHelper(notValids);
      return responseHelper.errorValidate(res, valid);
    };
    const resRegister = await indexDomain.authDomain.registerUser(req.body);
    if (!resRegister.status) return responseHelper.errorValidate(res, resRegister.notValid);
    return responseHelper.success(res, 'Register User Success', resRegister.data);
  }
  catch (err) {
    return responseHelper.errorService(res, err.message);
  };
};

export default createRegister;
