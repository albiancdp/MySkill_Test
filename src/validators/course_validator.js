import * as yup from 'yup';
import validateHelper from '../helpers/utils/validator_rebuild';
import responseHelper from '../helpers/utils/response';

let schema = yup.object().shape({
  title: yup.string().required('No title provided.'),
  slug: yup.string().required('No slug provided.'),
  desc: yup.string().required('No desc provided.'),
  imageUrl: yup.string().required('No imageUrl provided.'),
  tag: yup.string().required('No tag provided.'),
  content: yup.string().required('No content provided.'),
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




