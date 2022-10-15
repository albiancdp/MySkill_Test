import * as yup from 'yup';
import validateHelper from '../helpers/utils/validator_rebuild';
import responseHelper from '../helpers/utils/response';

let schema = yup.object().shape({
  email: yup.string()
    .email('Format must be email')
    .required('No Email provided.'),
  password: yup.string()
    .min(6, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    .required('No password provided.')
});

export default async function validate(req, res, next) {
  try {
    await schema.validate(
      req.body,
      { abortEarly: false }
    );
    return next();
  } catch (err) {
    const errorValidate = validateHelper(err.inner);
    return responseHelper.errorValidate(res, errorValidate);
  }
};




