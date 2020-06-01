const express = require("express");
const router = express.Router();

// models
const Moves = require("../model/Moves");

/* Post users listing. */
router.post("/", (req, res, next) => {
  //  const {title, category, country, year, imdb_score} = req.body;

  //  const movie = new Moves({
  //     title: title,
  //     category: category,
  //     country: country,
  //     year: year,
  //     imdb_score: imdb_score,
  //   })
  const movie = new Moves(req.body);

  //  movie.save((err, data) => {
  //    if(err)
  //       res.json(err)

  //    res.json(data);
  //  })

  const promise = movie.save();

  promise
    .then((movei) => {
      res.json(movei);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.get("/:movei_id", (req, res, next) => {
    const promise = Moves.findById(req.params.movei_id);
  
    promise.then((movei) => {
       /*  if (!movie) 
          next({ message: "Movie topilmadi !!!", code: 111 }); */
        res.json(movei);
      })
      .catch((err) => {
        res.json(err);
      });
  });
router.get("/", (req, res, next) => {
  const promise = Moves.find({});

  promise
    .then((movei) => {
      res.json(movei);
    })
    .catch((err) => {
      res.json(err);
    });
});

// router.get("/top10", (req, res, next) => {
//   const promise = Moves.find({}).limit(10).sort({ imdb_score: 1 });

//   promise
//     .then((movei) => {
//       res.json(movei);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

// router.get("/between/:start_year/:end_year", (req, res, next) => {
//   const { start_year, end_year } = req.params;

//   const promise = Moves.find({
//       year: {"$gte" : parseInt(start_year), "$lte": parseInt(end_year)}
//   });

//   promise
//     .then((movei) => {
//       res.json(movei);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });



router.put("/:movei_id", (req, res, next) => {
  const promise = Moves.findByIdAndUpdate(req.params.movei_id, req.body);
  promise
    .then((movei) => {
      if (!movie) 
        next({ message: "Movie topilmadi !!!", code: 111 });
      res.json(movei);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/:movei_id", (req, res, next) => {
  const promise = Moves.findByIdAndRemove(req.params.movei_id);

  promise
    .then((movei) => {
      if (!movie) 
        next({ message: "Movie topilmadi !!!", code: 111 });
      res.json({ status: 1 });
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/:movei_id", (req, res, next) => {
  const promise = Moves.findByIdAndRemove(req.params.movei_id);

  promise
    .then((movei) => {
      if (!movie) 
        next({ message: "Movie topilmadi !!!", code: 111 });
      res.json(movei);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
