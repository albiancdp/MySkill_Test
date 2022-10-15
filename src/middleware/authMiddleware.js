import mongoose from 'mongoose';
import indexCommonHelper from '../helpers/commons/index';
import responseHelper from '../helpers/utils/response';
import userModel from '../models/user';

const authMiddleware = async(req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return responseHelper.errorAuthNotFound(res);
  const arrayToken = token.split(' ');
  if (arrayToken.length !== 2) return responseHelper.errorUnauthorized(res);
  const userId = indexCommonHelper.jwt.verify(arrayToken[1]);
  if (!userId) return responseHelper.errorUnauthorized(res);
  const resUser = await userModel.findOne({ _id: mongoose.Types.ObjectId(userId.data) });
  if (!resUser) return responseHelper.notFound(res, 'User Not Found');
  req.user = resUser;
  return next();
};

export default authMiddleware;
