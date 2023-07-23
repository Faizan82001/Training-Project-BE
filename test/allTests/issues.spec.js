const chai = require('chai');
const app = require('../../app');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const users = require('../seeds/users');
const sinon = require('sinon');
const emailHelper = require('../../utils/emailSender');
const expect = chai.expect;

chai.use(chaiHttp);

const token = jwt.sign(
    { id: users[3].id, roleId: users[3].roleId, email: users[3].email },
    process.env.JWT_SECRET,
    {
        expiresIn: '1d'
    }
);

describe('/api/report-issue API test', () => {

    let sendEmailStub;

    beforeEach(() => {
        sendEmailStub = sinon.stub(emailHelper, 'sendEmail');
    });

    afterEach(() => {
        sendEmailStub.restore();
    });

    it('Report Submitted', async () => {
        const res = await chai
            .request(app)
            .post('/api/report-issue')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                title: 'trip issue',
                description: 'this is a test issue'
            });
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
            'Report Submitted Successfully.'
        );
    });

    it('should return an error for missing title', async () => {
        const res = await chai
            .request(app)
            .post('/api/report-issue')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                title: '',
                description: 'This is a test issue'
            });
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('title field is required.');
    });

    it('should return an error for missing description', async () => {
        const res = await chai
            .request(app)
            .post('/api/report-issue')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                title: 'trip issue',
                description: ''
            });
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('description field is required.');
    });
});
