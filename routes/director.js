const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Director = require("../models/Director");
const Movie = require("../models/Movie");

router.get('/',(req,res)=>{
    const promise = Director.aggregate([
        {
            $lookup:{
                from:'movies',
                localField:'_id',
                foreignField:'director_id',
                as:'movies'
            },
        },
        {
            $unwind:{
                path:'$movies',
                preserveNullAndEmptyArrays:true
            }
        },
        {
            $group:{
                _id:{
                    _id:'$_id',
                    name:'$name',
                    surname:'$surname',
                    bio:'$bio',
                },
                movies:{
                    $push:'$movies'
                }
            }
        },
        {
            $project:{
                _id:'$_id._id',
                name:'$_id.name',
                surname:'$_id.surname',
                bio:'$_id.bio',
                movies:'$movies',
            }
        }

    ]);
    promise.then((data)=>{
        res.json({status:1,data:data});
    }).catch((err)=>{
        res.json({status:0,error:err});
    });
});

router.get('/:director_id',(req,res)=>{
    const director_id = req.params.director_id;
    const promise = Director.aggregate([
        {
            $lookup:{
                from:'movies',
                localField:'_id',
                foreignField:'director_id',
                as:'movies'
            },
        },
        {
            $unwind:{
                path:'$movies',
                preserveNullAndEmptyArrays:true
            }
        },
        {
            $group:{
                _id:{
                    _id:'$_id',
                    name:'$name',
                    surname:'$surname',
                    bio:'$bio',
                },
                movies:{
                    $push:'$movies'
                }
            }
        },
        {
            $project:{
                _id:'$_id._id',
                name:'$_id.name',
                surname:'$_id.surname',
                bio:'$_id.bio',
                movies:'$movies',
            }
        },
        {
            $match:{
                _id:mongoose.Types.ObjectId(director_id)
            }
        }

    ]);

    promise.then((data)=>{
        res.json({status:1,data:data[0]});
    }).catch((err)=>{
        res.json({status:0,error:err});
    });
});

router.post('/', (req, res, next) => {
    const director = new Director(req.body);
    const promise = director.save();

    promise.then((data)=>{
        res.json({status:1,_id:data._id});
    }).catch((err)=>{
        res.json({status:0,error:err});
    });
});


router.delete("/:director_id",(req,res,next)=>{
    const promise = Director.findByIdAndRemove(req.params.director_id);
    promise.then((data)=>{
        Movie.remove({director_id:req.params.director_id});
        res.json({status:1});
    }).catch((err)=>{
        res.json({status:0,error:err});
    });
});

router.put("/:director_id",(req,res,next)=>{
    const promise = Director.findByIdAndUpdate(req.params.director_id,req.body,{new:true});
    promise.then((data)=>{
        res.json({status:1,movie:data});
    }).catch((err)=>{
        res.json({status:0,error:err});
    });
});

module.exports = router;
