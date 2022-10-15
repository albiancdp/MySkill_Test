import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import responseHelper from '../../helpers/utils/response';
import indexCommoneHelper from '../../helpers/commons/index';
import indexDomain from '../../domains/index';
import validateHelper from '../../helpers/utils/validator_rebuild';

const loginUser = async (req, res) => {
  try {
    const notValids = validationResult(req);
    if (!notValids.isEmpty()) {
      const valid = validateHelper(notValids);
      return responseHelper.errorValidate(res, valid);
    };
    const resUser = await indexDomain.authDomain.loginUser(req.body);
    if (!resUser) return responseHelper.notFound(res, 'User Not Found');
    if (resUser && !(await bcrypt.compare(req.body.password, resUser.password))) {
      return responseHelper.errorValidate(res, { password: 'Wrong Password' }, 'Wrong Password');
    }
    const token = await indexCommoneHelper.jwt.hash(resUser.id);
    return responseHelper.success(res, 'Login Success', { token });
  }
  catch (err) {
    return responseHelper.errorService(res, err.message);
  };
};

export default loginUser;
