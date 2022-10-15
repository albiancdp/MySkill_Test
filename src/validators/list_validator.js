import * as yup from 'yup';
import validateHelper from '../helpers/utils/validator_rebuild';
import responseHelper from '../helpers/utils/response';

let schema = yup.object().shape({
  page: yup.string().required('No page provided.'),
  limit: yup.string().required('No limit provided.'),
});

export default async function validate(req, res, next) {
  try {
    await schema.validate(
      req.query,
      { abortEarly: false }
    );
    return next();
  } catch (err) {
    const errorValidate = validateHelper(err.inner);
    return responseHelper.errorValidate(res, errorValidate);
  }
};
