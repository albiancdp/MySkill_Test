import userModel from '../models/user';

const registerUser = async (data) => {
  return new Promise((resolve, reject) => {
    userModel.create(data)
      .then(result => {
        delete result.password;
        resolve({ status: true, data: result });
      }).catch(err => {
        let notValid = {};
        if (err.code === 11000) {
          // edit value in object
          Object.keys(err.keyValue).forEach((key) => {
            notValid[key] = err.keyValue[key] + ' is Already Exist';
          });
          resolve({ status: false, notValid: notValid });
        };
        reject(err);
      });
  });
};

const loginUser = async (data) => {
  return new Promise((resolve, reject) => {
    userModel.findOne({ email: data.email })
      .then(result => {
        if (!result) {
          resolve(false);
        } else {
          resolve(result);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default {
  registerUser,
  loginUser
};
