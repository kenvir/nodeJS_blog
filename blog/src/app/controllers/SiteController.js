const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

class SiteController {
  // [GET] /
  index(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render("home", {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }

  // Use .lean()
  // index(req, res, next) {
  //   Course.find({})
  //     .lean()
  //     .then((courses) => {
  //       res.render("home", {
  //         courses,
  //       });
  //     })
  //     .catch(next);
  // }

  // [GET] /search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
