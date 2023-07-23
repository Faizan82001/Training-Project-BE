const chai = require('chai');
const app = require('../../app');
const chaiHttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
const sendEmail = require('../../utils/emailSender');

chai.use(chaiHttp);

describe('api/auth/login API test', () => {

    let sendEmailStub;

    beforeEach(() => {
        sendEmailStub = sinon.stub(sendEmail, 'sendEmail');
    });

    afterEach(() => {
        sendEmailStub.restore();
    });

    it('correct email and password', async () => {
        const res = await chai.request(app).post('/api/auth/login').send({
            email: 'maria@yopmail.com',
            password: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E=',
            fcmToken: 'sdadaxad'
        });
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Logged in successfully.');
        expect(res.body.data.id).to.equal('6c6c730f-0834-4e57-9d55-3be5be66c021');
        expect(res.body.data.firstName).to.equal('Maria');
        expect(res.body.data.lastName).to.equal('Nelson');
        expect(res.body.data.email).to.equal('maria@yopmail.com');
        expect(res.body.data.roleId).to.equal(2);
    });

    it('incorrect email', async () => {
        const res = await chai.request(app).post('/api/auth/login').send({
            email: 'john.doe1@yopmail.com',
            password: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E='
        });
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Either email id or password is incorrect.');
    });

    it('incorrect password', async () => {
        const res = await chai.request(app).post('/api/auth/login').send({
            email: 'john.doe12@yopmail.com',
            password: 'U2FsdGVkX187UyEbNUWrbo8yaibt4HlxP2QQrPvL0kI='
        });
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Either email id or password is incorrect.');
    });

    it('invalid email', async () => {
        const res = await chai.request(app).post('/api/auth/login').send({
            email: 'kadkamcls',
            password: 'password'
        });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('You have entered invalid email address. Please, enter a valid email address.');
    });

    it('invalid password', async () => {
        const res = await chai.request(app).post('/api/auth/login').send({
            email: 'john.doe12@yopmail.com',
            password: 'U2FsdGVkX19KnEUwMpEcIz/s1HQd/ZWNcj7iv0GNrsk='
        });
        expect(res).to.have.status(400);
        // eslint-disable-next-line max-len
        expect(res.body.message).to.equal('Please enter a password that has minimum 8 and maximum 20 character. It should contain atleast 1 uppercase, 1 lowercase letter, 1 special character and 1 number.');
    });

    it('no email', async () => {
        const res = await chai.request(app).post('/api/auth/login').send({
            email: '',
            password: 'U2FsdGVkX1+SIP2+T7vex1orp3qG5FSsJqWfnpEHYNQ='
        });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Email field is required.');
    });

    it('no password', async () => {
        const res = await chai.request(app).post('/api/auth/login').send({
            email: 'john.doe12@yopmail.com',
            password: ''
        });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Password field is required.');
    });

    it('invited user with random password', async () => {
        const res = await chai.request(app).post('/api/auth/login').send({
            email: 'steve@yopmail.com',
            password: 'U2FsdGVkX187UyEbNUWrbo8yaibt4HlxP2QQrPvL0kI='
        });
        expect(res).to.have.status(403);
        expect(res.body.message).
            to.equal('Set password using link sent to you on your email. if you don\'t get the link contact system admin.');
    });

    it('inactive user', async () => {
        const res = await chai.request(app).post('/api/auth/login').send({
            email: 'andrea@yopmail.com',
            password: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E='
        });
        expect(res).to.have.status(403);
        expect(res.body.message).to.equal('You are currently inactived user. Contanct system admin for login.');
    });
});
