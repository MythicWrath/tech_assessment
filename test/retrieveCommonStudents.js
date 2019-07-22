process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server');
let should = chai.should();

chai.use(chaiHttp);

/** Teachers with registered students:
 *  'teacherlana@gmail.com' : [
        'studentkelly@gmail.com', 
        'studentsally@gmail.com',
        'studentmary@gmail.com',
        'studenthon@gmail.com',
    ]

    'teacherjoe@gmail.com' : [
        'studentkelly@gmail.com', 
        'studentmark@gmail.com',
        'studentjon@gmail.com',
    ]

    'teacherken@gmail.com' : [
        'studentagnes@gmail.com',
    ]
 * */ 

describe('Retrieve common students', function(){
    it('should return error if no "teacher" field in query parameters.', (done) => {
        
        chai.request(app)
            .get('/api/commonstudents')
            .end((err, res) => {    // err object refers to connection error, not API error like 404 etc
                res.should.have.status(400);
                res.should.be.json;
                res.body.message.should.equal("'teacher' parameter not found in query parameters.")
                done();
            });
    }); 

    it('should return error if nonexistent teacher email is sent (only one email sent).', (done) => {
        
        chai.request(app)
            .get('/api/commonstudents?teacher=teacherabc%40gmail.com')
            .end((err, res) => {    // err object refers to connection error, not API error like 404 etc
                res.should.have.status(400);
                res.should.be.json;
                res.body.message.should.equal("One or more email addresses sent do not exist in records.")
                done();
            });
    }); 

    it('should return error if nonexistent teacher email is sent (Wrong email mixed with correct emails).', (done) => {
        
        chai.request(app)
            .get('/api/commonstudents?teacher=teacherken@gmail.com&teacher=teacherabc%40gmail.com&teacher=teacherlana@gmail.com')
            .end((err, res) => {    // err object refers to connection error, not API error like 404 etc
                res.should.have.status(400);
                res.should.be.json;
                res.body.message.should.equal("One or more email addresses sent do not exist in records.")
                done();
            });
    });  

    it('should get all common students and only common students (1 teacher)', (done) => {
        var gdRes = [
            'studentkelly@gmail.com', 
            'studentmark@gmail.com',
            'studentjon@gmail.com',
        ].sort();
        
        chai.request(app)
            .get('/api/commonstudents?teacher=teacherjoe%40gmail.com')
            .end((err, res) => {    // err object refers to connection error, not API error like 404 etc
                res.should.have.status(200);
                should.exist(res.body.students);

                var students = res.body.students.sort();
                students.should.deep.equal(gdRes);
                done();
            });
    });
    
    it('should get all common students and only common students (2 teachers)', (done) => {
        var gdRes = [
            'studentkelly@gmail.com', 
        ];
        
        chai.request(app)
            .get('/api/commonstudents?teacher=teacherjoe%40gmail.com&teacher=teacherlana%40gmail.com')
            .end((err, res) => {    // err object refers to connection error, not API error like 404 etc
                res.should.have.status(200);
                should.exist(res.body.students);

                var students = res.body.students.sort();
                students.should.deep.equal(gdRes);
                done();
            });
    });

    it('should return empty list if no common students found (1 teacher)', (done) => {
        
        chai.request(app)
            .get('/api/commonstudents?teacher=teachertom%40gmail.com')
            .end((err, res) => {    // err object refers to connection error, not API error like 404 etc
                res.should.have.status(200);
                should.exist(res.body.students);
                res.body.students.should.have.lengthOf(0);
                done();
            });
    }); 

    it('should return empty list if no common students found (2 teachers)', (done) => {
        
        chai.request(app)
            .get('/api/commonstudents?teacher=teacherjoe%40gmail.com&teacher=teacherken%40gmail.com')
            .end((err, res) => {    // err object refers to connection error, not API error like 404 etc
                res.should.have.status(200);
                should.exist(res.body.students);
                res.body.students.should.have.lengthOf(0);
                done();
            });
    }); 
});