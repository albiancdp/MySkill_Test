import * as yup from 'yup';
import mongoose from 'mongoose';
import validateHelper from '../helpers/utils/validator_rebuild';
import responseHelper from '../helpers/utils/response';

let schema = yup.object().shape({
  id: yup.string().required('No id provided.')
    .test(value=>{
      if(mongoose.Types.ObjectId.isValid(value)) return true;
    }),
});

export default async function validate(req, res, next) {
  try {
    await schema.validate(
      req.params,
      { abortEarly: false }
    );
    return next();
  } catch (err) {
    const errorValidate = validateHelper(err.inner);
    return responseHelper.errorValidate(res, errorValidate);
  }
};
