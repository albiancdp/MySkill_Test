import jwt from 'jsonwebtoken';
import configs from '../../configs/global_config';

const hash = (data) => {
  const token = jwt.sign({ data }, configs.jwtSecret, { expiresIn: configs.jwtExpired });
  return token;
};

const verify = (data) => {
  try {
    const payload = jwt.verify(data, configs.jwtSecret);
    return payload;
  } catch (error) {
    return false;
  }
};

export default {
  hash,
  verify
};
