const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Directory = require("../model/Directors");

router.post("/", (req, res, next) => {
  const directory = new Directory(req.body);
  const promise = directory.save();
  promise
    .then((directory) => {
      res.json(directory);
    })
    .catch((err) => {
      res.json(err);
    });
});


// router.get("/", (req, res, next) => {
//   const promise = Directory.find({});

//   promise
//     .then((directory) => {
//       res.json(directory);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

router.get("/", (req, res, next) => {
  const promise = Directory.aggregate([
     
      {
          $lookup: {
              from: 'movies',
              localField: '_id',
              foreignField: 'director_id',
              as: 'movies'
          }
      },
      {
        $unwind: {
          path: '$movies'
        }
      },
      {
        $group: {
          _id: {
            _id: '$_id',
            name: '$name',
            surname: '$surname',
            bio: '$bio'
          },
          movies: {
            $push: '$movies'
          }
        }
      },
      {
        $project: {
          _id: '$_id._id',
          name: '_id.name',
          surname: '_id.surname',
          movies: '$movies'
        }
      }
    ]);

  promise
    .then((directory) => {
      res.json(directory);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.get("/:director_id", (req, res, next) => {
  const promise = Directory.aggregate([
      {
        $match: {
          '_id': mongoose.Types.ObjectId(req.params.director_id)
        }
      },  
      {
          $lookup: {
              from: 'movies',
              localField: '_id',
              foreignField: 'director_id',
              as: 'movies'
          }
      },
      {
        $unwind: {
          path: '$movies'
        }
      },
      {
        $group: {
          _id: {
            _id: '$_id',
            name: '$name',
            surname: '$surname',
            bio: '$bio'
          },
          movies: {
            $push: '$movies'
          }
        }
      },
      {
        $project: {
          _id: '$_id._id',
          name: '_id.name',
          surname: '_id.surname',
          movies: '$movies'
        }
      }
    ]);

  promise
    .then((directory) => {
      res.json(directory);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.put("/:director_id", (req, res, next) => {
  const promise = Directory.findByIdAndUpdate(
    req.params.director_id,
    req.body,
    {
      new: true
    }
  )

  promise
    .then((directory) => {
      res.json(directory);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.delete("/:director_id", (req, res, next) => {
  const promise = Directory.findByIdAndRemove(req.params.director_id)

  promise
    .then((directory) => {
      res.json(directory);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.get("/:director_id/best10movie", (req, res, next) => {
  const promise = Directory.aggregate([
      {
        $match: {
          '_id': mongoose.Types.ObjectId(req.params.director_id)
        }
      },  
      {
          $lookup: {
              from: 'movies',
              localField: '_id',
              foreignField: 'director_id',
              as: 'movies'
          }
      },
      {
        $unwind: {
          path: '$movies'
        }
      },
      {
        $sort:{
          'movies.imb_score' : -1
        }
      },
      {
        $limit: 10
      },  
      {
        $group: {
          _id: {
            _id: '$_id',
          },
          movies: {
            $push: '$movies'
          }
        }
      },
      {
        $project: {
          _id: false,
          movies: '$movies'
        }
      }
    ]);

  promise
    .then((directory) => {
      res.json(directory);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
