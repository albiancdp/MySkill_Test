import courseModel from '../models/course';

const createCourse = async (user, data) => {
  return new Promise((resolve, reject) => {
    const dataCreate = {
      ...data,
      createdBy: user.id,
      updatedBy: user.id
    };
    courseModel.create(dataCreate)
      .then(result => {
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

const listCourse = async (req) => {
  return new Promise((resolve, reject) => {
    const sorting = req.query.sort;
    let sortView = {};
    if (!sorting) sortView.createdAt = -1;
    else sortView[sorting] = -1;
    const search = req.query.search;
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    let response = {
      docs: [],
      page: page,
      limit: limit,
    };
    courseModel.aggregate([
      {
        $match: {
          $or: [
            { 'title': { $regex: new RegExp(search), $options: 'i' } },
            { 'tag': { $regex: new RegExp(search), $options: 'i' } },
          ]
        }
      },
      { $sort: sortView },
      {
        $facet: {
          total: [
            { $count: 'total' },
          ],
          data: [
            {
              $project: {
                _id: 0,
                id: '$_id',
                title: 1,
                slug: 1,
                desc: 1,
                imageUrl: 1,
                tag: 1,
                content: 1,
                createdAt: 1
              }
            },
            { $skip: (page - 1) * limit },
            { $limit: limit },
          ],
        },
      },
      {
        $project: {
          total: '$total.total',
          data: '$data',
        },
      }
    ]).then(result => {
      response.docs = result[0].data;
      response.totalItem = result[0].total[0];
      response.totalPage = Math.ceil(response.totalItem / limit) || 0;
      response.startItem = (page - 1) * limit;
      response.endItem = response.startItem + result[0].data.length;
      response.nextPage = response.page < response.totalPage ? true : false;
      response.prevPage = response.page > 1 && response.page <= response.totalPage ? true : false;
      resolve(response);
    }).catch(err => {
      reject(err);
    });
  });
};

const readCourse = async (courseId) => {
  return new Promise((resolve, reject) => {
    courseModel.findById(courseId)
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

const updateCourse = async (courseId, dataUpdate) => {
  return new Promise((resolve, reject) => {
    let notValid = {};
    courseModel.findByIdAndUpdate(courseId, dataUpdate)
      .then(async (result) => {
        if (!result) {
          resolve(false);
        } else {
          resolve(result);
        }
      })
      .catch(err => {
        // handle error unique key mongoose
        if (err.code === 11000) {
          // edit value in object
          Object.keys(err.keyValue).forEach((key, index) => {
            notValid[key] = err.keyValue[key] + ' is Already Exist';
          });
          resolve({ status: false, notValid: notValid });
        };
        resolve(false);
      });
  });
};

const deleteCourse = async (courseId) => {
  return new Promise((resolve, reject) => {
    courseModel.findByIdAndDelete(courseId)
      .then(result => {
        if (!result) {
          resolve(false);
        } else {
          resolve(result);
        }
      }).catch(err => {
        reject(err);
      });
  });
};

export default {
  createCourse,
  listCourse,
  readCourse,
  updateCourse,
  deleteCourse
};
