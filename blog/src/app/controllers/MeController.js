const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    Promise.all([Course.find({}).lean().sortable(req), Course.countDocumentsWithDeleted({ deleted: true }).lean()])
      .then(([courses, deletedCount]) => res.render('me/stored-courses', { deletedCount, courses }))
      .catch(next);

    // Course.countDocumentsWithDeleted({ deleted: true })
    //   .then((deletedCount) => {
    //     console.log(deletedCount);
    //   })
    //   .catch(() => {});

    // Course.find({})
    //   .lean()
    //   .then((courses) => res.render('me/stored-courses', { courses }))
    //   .catch(next);
  }

  // [GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findWithDeleted({ deleted: true })
      .then((courses) => {
        res.render('me/trash-courses', { courses: multipleMongooseToObject(courses) });
      })
      .catch(next);
  }
}

module.exports = new MeController();
