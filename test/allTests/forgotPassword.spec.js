const chai = require('chai');
const app = require('../../app');
const chaiHttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
const emailHelper = require('../../utils/emailSender');

chai.use(chaiHttp);

describe('api/auth/forgot-password API test', () => {

    let sendEmailStub;

    beforeEach(() => {
        sendEmailStub = sinon.stub(emailHelper, 'sendEmail');
    });

    afterEach(() => {
        sendEmailStub.restore();
    });

    it('correct and valid email', async () => {
        const res = await chai.request(app).post('/api/auth/forgot-password').send({
            email: 'john.doe12@yopmail.com'
        });
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Link to reset password is sent to the registered email address.');
    });

    it('invalid email', async () => {
        const res = await chai.request(app).post('/api/auth/forgot-password').send({
            email: 'john.doe12'
        });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('You have entered invalid email address. Please, enter a valid email address.');
    });

    it('user not found', async () => {
        const res = await chai.request(app).post('/api/auth/forgot-password').send({
            email: 'envkt@example.com'
        });
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('User not found.');
    });
});
