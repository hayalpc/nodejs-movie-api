const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://ekaraman:M123456qa@ds159812.mlab.com:59812/movie_user',{useNewUrlParser:true});
    mongoose.connection.on('open',()=>{
    });
    mongoose.connection.on('error',(err)=>{
        console.log('MongoDB: Error',err);
    });
    mongoose.Promise = global.Promise;
};