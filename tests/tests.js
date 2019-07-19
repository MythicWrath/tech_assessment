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
            .end((err, res) => {
                res.should.have.status(204);
                err.should.be.null;
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
            .post('./api/register')
            .send(body)
            .end((err, res) => {
                res.should.be.null;
                
            })
    })

    it('should return error if student field is missing', (done) => {
        let body = {
            teacher: "teacherken@gmail.com"
        }

        chai.request(app)
            .post('./api/register')
            .send(body)
            .end((err, res) => {
                
            })
    })
})