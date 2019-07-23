process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server');
let should = chai.should();
let db_init = require('../controllers/database_util/init');

var models  = require('../controllers/models');

chai.use(chaiHttp);


describe('Suspend student', function(){
    before(() => db_init.dropAndInit());

    it('should return error if no "student" field in request body.', (done) => {
        
        chai.request(app)
            .post('/api/suspend')
            .send({studentss: "studentmary@gmail.com"})
            .end((err, res) => {    // err object refers to connection error, not API error like 404 etc
                res.should.have.status(400);
                should.exist(res.body.message);
                res.body.message.should.equal("'student' field not found in request body.")
                done();
            });
    }); 

    it('should return error if "student" field does not contain a string.', (done) => {
        
        chai.request(app)
            .post('/api/suspend')
            .send({student: ["studentmary@gmail.com"]})
            .end((err, res) => {    // err object refers to connection error, not API error like 404 etc
                res.should.have.status(400);
                should.exist(res.body.message);
                res.body.message.should.equal("Type of data in 'student' field must be a string.")
                done();
            });
    }); 

    it('should return error if indicated student does not exist in database.', (done) => {
        
        chai.request(app)
            .post('/api/suspend')
            .send({student: "studentdoesnotexist@gmail.com"})
            .end((err, res) => {    // err object refers to connection error, not API error like 404 etc
                res.should.have.status(400);
                should.exist(res.body.message);
                res.body.message.should.equal("Indicated student email not found.")
                done();
            });
    }); 

    it('should successfully suspend a student.', (done) => {
        
        chai.request(app)
            .post('/api/suspend')
            .send({student: "studentmary@gmail.com"})
            .end((err, res) => {    // err object refers to connection error, not API error like 404 etc
                res.should.have.status(204);
                done();
            });
    }); 
    
    it('should successfully suspend a student.', (done) => {
        chai.request(app)
            .post('/api/suspend')
            .send({student: "studentmary@gmail.com"})
            .end((err, res) => {    // err object refers to connection error, not API error like 404 etc
                res.should.have.status(204);
                models.Student.findByPk("studentmary@gmail.com").then((st) => {
                    st.suspend.should.be.true;
                    done();
                });
                
            });
    }); 

    it('should still be a success when suspending an already suspended student.', (done) => {
        
        chai.request(app)
            .post('/api/suspend')
            .send({student: "studentbob@gmail.com"})
            .end((err, res) => {    // err object refers to connection error, not API error like 404 etc
                res.should.have.status(204);
                chai.request(app)
                    .post('/api/suspend')
                    .send({student: "studentbob@gmail.com"})
                    .end((err, res) => {    // err object refers to connection error, not API error like 404 etc
                        res.should.have.status(204);
                        models.Student.findByPk("studentmary@gmail.com").then((st) => {
                            st.suspend.should.be.true;
                            done();
                        });
                    });
            });
    });  
});