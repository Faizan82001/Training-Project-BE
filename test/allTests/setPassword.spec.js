const chai = require('chai');
const app = require('../../app');
const chaiHttp = require('chai-http');
const { expect } = chai;
const User = require('../../models').user;
const users = require('../seeds/users');
const sinon = require('sinon');
const emailHelper = require('../../utils/emailSender');

chai.use(chaiHttp);

describe('api/auth/set-password API test', () => {
    let token;
    let sendEmailStub;

    beforeEach(() => {
        sendEmailStub = sinon.stub(emailHelper, 'sendEmail');
    });

    afterEach(() => {
        sendEmailStub.restore();
    });
    beforeEach(async () => {
        await chai.request(app).post('/api/auth/forgot-password').send({
            email: 'john.doe12@yopmail.com'
        });
        const result = await User.findOne({
            where: { email: users[0].email },
            attributes: ['token']
        });
        token = JSON.parse(JSON.stringify(result)).token;
    });
    it('set password sucessfully', async () => {
        const res = await chai
            .request(app)
            .post(`/api/auth/set-password/${token}`)
            .send({
                password: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E=',
                confirmPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E='
            });
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Password changed successfully.');
    });

    it('invalid token', async () => {
        const res = await chai
            .request(app)
            .post('/api/auth/set-password/sdjsncdsifesms')
            .send({
                password: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E=',
                confirmPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E='
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Invalid token');
    });

    it('no password field', async () => {
        const res = await chai
            .request(app)
            .post(`/api/auth/set-password/${token}`)
            .send({
                confirmPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E='
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('password field is required.');
    });

    it('no confirm password field', async () => {
        const res = await chai
            .request(app)
            .post(`/api/auth/set-password/${token}`)
            .send({
                password: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E='
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('confirmPassword field is required.');
    });

    it('invalid password', async () => {
        const res = await chai
            .request(app)
            .post(`/api/auth/set-password/${token}`)
            .send({
                password: 'U2FsdGVkX18tNXHL0WUlIA0tokcbdd0N2Ve5FLypbLI=',
                confirmPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E='
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal(
            // eslint-disable-next-line max-len
            'Please enter a password that has minimum 8 and maximum 20 character. It should contain atleast 1 uppercase, 1 lowercase letter, 1 special character and 1 number.'
        );
    });

    it('wrong confirm password', async () => {
        const res = await chai
            .request(app)
            .post(`/api/auth/set-password/${token}`)
            .send({
                password: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E=',
                confirmPassword: 'U2FsdGVkX18tNXHL0WUlIA0tokcbdd0N2Ve5FLypbLI='
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal(
            'Your password and confirm password are not matched.'
        );
    });

    it('token expired', async () => {
        await User.update(
            {
                expiryDate: new Date('2022-03-25')
            },
            {
                where: {
                    id: users[0].id
                }
            }
        );
        const res = await chai
            .request(app)
            .post(`/api/auth/set-password/${token}`)
            .send({
                password: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E=',
                confirmPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E='
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Your set password link has expired. Please try again or contact system admin.');
    });
});
