const chai = require('chai');
const chaiHttp = require('chai-http');
const sohuld = chai.should();
const server = require('../../app');
chai.use(chaiHttp);

let token;

describe("/api/movies tests",()=>{
    before((done)=>{
       console.log("ilk ben çalıacağım");
       chai.request(server).post('/login').send({username:'ekaraman',password:'123456'}).end((err,res)=>{
          token = res.body.token;
          done();
       });
    });

    describe('/GET movies',()=>{
        it('it should get all movies',(done)=>{
            chai.request(server).get('/api/movie').set('x-api-key',token).end((err,res)=>{
                res.should.have.status(200);
                done();
            });
        });
    });

});
