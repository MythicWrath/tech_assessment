process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Register students', function(){
    it('should successfully register students for a teacher', (done) => {
        let body = {
            teacher: "teacherken@gmail.com",
            students: 
            [
                "studentjon@gmail.com",
                "studenthon@gmail.com",
            ],
        }
        
        chai.request(app)
            .post('/api/register')
            .send(body)
            .end((err, res) => {    // err object refers to connection error, not API error like 404 etc
                // console.log(err);
                // console.log('************************');
                // console.log(res);
                // console.log('************************');
                res.should.have.status(204);
                should.not.exist(err);
                done();
            });
    });

    it('should return error if teacher field is missing', (done) => {
        let body = {
            students:
            [
                "studentjon@gmail.com",
                "studenthon@gmail.com"
            ]
        }

        chai.request(app)
            .post('/api/register')
            .send(body)
            .end((err, res) => {
                console.log(err);
                // console.log('************************');
                // console.log(res);
                // console.log('************************');
                should.not.exist(res);
                done();
            })
    })

    it('should return error if student field is missing', (done) => {
        let body = {
            teacher: "teacherken@gmail.com"
        }

        chai.request(app)
            .post('/api/register')
            .send(body)
            .end((err, res) => {
                // console.log(err);
                // console.log('************************');
                // console.log(res);
                // console.log('************************');
                done();
            })
    })
})