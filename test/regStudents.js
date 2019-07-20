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
                res.should.have.status(400);
                res.should.be.json;
                res.body.message.should.equal("'teacher' field is missing.")
                done();
            })
    })

    it('should return error if students field is missing', (done) => {
        let body = {
            teacher: "teacherken@gmail.com"
        }

        chai.request(app)
            .post('/api/register')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.json;
                res.body.message.should.equal("'students' field is missing.")
                done();
            })
    })

    it('should have at least one student in student field', (done) => {
        let body = {
            teacher: "teacherken@gmail.com",
            students: [],
        }

        chai.request(app)
            .post('/api/register')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.json;
                res.body.message.should.equal("'students' field should not be empty.")
                done();
            })
    })

    it('should use an existing teacher email', (done) => {
        let body = {
            teacher: "teacherabc@gmail.com",
            students: ["studentjon@gmail.com"],
        }

        chai.request(app)
            .post('/api/register')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.json;
                res.body.message.should.equal("Indicated teacher email does not exist.")
                done();
            })
    })

    it('should use existing student emails', (done) => {
        let body = {
            teacher: "teacherlana@gmail.com",
            students: [
                "studentjon@gmail.com",
                "studentabc@gmail.com",
                "studenthon@gmail.com",
            ],
        }

        chai.request(app)
            .post('/api/register')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.json;
                res.body.message.should.equal("One of the student email does not exist.")
                done();
            })
    })
})