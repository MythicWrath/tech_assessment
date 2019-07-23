process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server');
let should = chai.should();
let db_init = require('../controllers/database_util/init');


chai.use(chaiHttp);


describe('Retrieve list of students for notification', function(){
    before(() => db_init.dropAndInit());

    it('should return error if no "teacher" field in request body.', (done) => {
        let body = {
            notification: "Hello!",
        }

        chai.request(app)
            .post('/api/retrievefornotifications')
            .send(body)
            .end((err, res) => {    // err object refers to connection error, not API error like 404 etc
                res.should.have.status(400);
                should.exist(res.body.message);
                res.body.message.should.equal("'teacher' field not found in request body.")
                done();
            });
    }); 

    it('should return error if no "notification" field in request body.', (done) => {
        let body = {
            teacher: "teacherlana@gmail.com",
        }

        chai.request(app)
            .post('/api/retrievefornotifications')
            .send(body)
            .end((err, res) => {    // err object refers to connection error, not API error like 404 etc
                res.should.have.status(400);
                should.exist(res.body.message);
                res.body.message.should.equal("'notification' field not found in request body.")
                done();
            });
    }); 

    it('should return error if indicated teacher email does not exist.', (done) => {
        let body = {
            teacher: "teacherdoesnotexist@gmail.com",
            notification: "Hello!",
        }

        chai.request(app)
            .post('/api/retrievefornotifications')
            .send(body)
            .end((err, res) => {    // err object refers to connection error, not API error like 404 etc
                res.should.have.status(400);
                should.exist(res.body.message);
                res.body.message.should.equal("Indicated teacher email not found.")
                done();
            });
    }); 

    it('should return error if "notification" field does not contain a string.', (done) => {
        let body = {
            teacher: "teacherlana@gmail.com",
            notification: ["Hello! @studentagnes@gmail.com @studentdonotexist@gmail.com"],
        } 

        chai.request(app)
            .post('/api/retrievefornotifications')
            .send(body)
            .end((err, res) => {    // err object refers to connection error, not API error like 404 etc
                res.should.have.status(400);
                should.exist(res.body.message);
                res.body.message.should.equal("Type of data in 'notification' field must be a string.")
                done();
            });
    });

    it('should return error if mentioned student email(s) do not exist.', (done) => {
        let body = {
            teacher: "teacherdoesnotexist@gmail.com",
            notification: "Hello! @studentagnes@gmail.com @studentdonotexist@gmail.com",
        }

        chai.request(app)
            .post('/api/retrievefornotifications')
            .send(body)
            .end((err, res) => {    // err object refers to connection error, not API error like 404 etc
                res.should.have.status(400);
                should.exist(res.body.message);
                res.body.message.should.equal("One or more of the mentioned student email(s) not found.")
                done();
            });
    }); 

    it('should return success for good request (No mentions).', (done) => {
        let body = {
            teacher: "teacherjoe@gmail.com",
            notification: "Hello all!",
        }

        let gdRes = {recipients: [
            'studentjon@gmail.com',
            'studentkelly@gmail.com',
            'studentmark@gmail.com',
        ].sort()}

        chai.request(app)
            .post('/api/retrievefornotifications')
            .send(body)
            .end((err, res) => {    // err object refers to connection error, not API error like 404 etc
                res.should.have.status(200);
                should.exist(res.body.recipients);

                var recipients = res.body.recipients.sort();
                recipients.should.deep.equal(gdRes.recipients);
                done();
            });
    }); 

    it('should return success for good request (With mentions).', (done) => {
        let body = {
            teacher: "teacherlana@gmail.com",
            notification: "Hello all! @studentagnes@gmail.com @studentjon@gmail.com",
        }

        let gdRes = {recipients: [
            'studenthon@gmail.com',
            'studentkelly@gmail.com',
            'studentmary@gmail.com',
            'studentsally@gmail.com',
            'studentagnes@gmail.com',
            'studentjon@gmail.com',
        ].sort()}

        chai.request(app)
            .post('/api/retrievefornotifications')
            .send(body)
            .end((err, res) => {    // err object refers to connection error, not API error like 404 etc
                res.should.have.status(200);
                should.exist(res.body.recipients);

                var recipients = res.body.recipients.sort();
                recipients.should.deep.equal(gdRes.recipients);
                done();
            });
    }); 


});