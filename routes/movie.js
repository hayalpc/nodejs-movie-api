const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

// Models
const Movie = require('../models/Movie');
router.post('/', (req, res, next) => {
    const movie = new Movie(req.body);
    const promise = movie.save();

    promise.then((data)=>{
        res.json({status:1,_id:data._id});
    }).catch((err)=>{
        res.json({status:0,error:err});
    });
});

router.get("/",(req,res)=>{
    const promise = Movie.aggregate([
        {
            $lookup:{
                from:'directors',
                localField:'director_id',
                foreignField:'_id',
                as:'director'
            }
        },
        {
            $unwind:'$director'
        }
    ]);
    promise.then((data)=>{
        res.json({status:1,movies:data});
    }).catch((err)=>{
        res.json({status:0,error:err});
    });
});

router.get("/top10",(req,res,next)=>{
    const promise = Movie.find({}).limit(10).sort({imdb_score:-1});
    promise.then((data)=>{
        res.json({status:1,movies:data});
    }).catch((err)=>{
        res.json({status:0,error:err});
    });
});

router.get("/:movie_id",(req,res,next)=>{
    const promise = Movie.aggregate([
            {
                $lookup:{
                    from:'directors',
                    localField:'director_id',
                    foreignField:'_id',
                    as:'director'
                }
            },
            {
                $match:
                    {
                        _id:mongoose.Types.ObjectId(req.params.movie_id)
                    }
            }
        ]
    );
    promise.then((data)=>{
        res.json({status:1,movie:data[0]});
    }).catch((err)=>{
        res.json({status:0,error:err});
    });
});

router.delete("/:movie_id",(req,res,next)=>{
    const promise = Movie.findByIdAndRemove(req.params.movie_id);
    promise.then((data)=>{
        res.json({status:1});
    }).catch((err)=>{
        res.json({status:0,error:err});
    });
});

router.put("/:movie_id",(req,res,next)=>{
    const promise = Movie.findByIdAndUpdate(req.params.movie_id,req.body,{new:true});
    promise.then((data)=>{
        res.json({status:1,movie:data});
    }).catch((err)=>{
        res.json({status:0,error:err});
    });
});

router.get('/between/:start_year/:end_year',(req,res)=>{
    const { start_year, end_year } = req.params;
    const promise = Movie.find({
        year:{'$gte':parseInt(start_year),'$lte':parseInt(end_year)}
    });
    promise.then((data)=>{
        res.json({status:1,movie:data});
    }).catch((err)=>{
        res.json({status:0,error:err});
    });

});

module.exports = router;
