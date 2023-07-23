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
    { id: users[0].id, roleId: users[0].roleId, email: users[0].email },
    process.env.JWT_SECRET,
    {
        expiresIn: '1d'
    }
);

describe('api/auth/createuser API test', () => {
    let sendEmailStub;

    beforeEach(() => {
        sendEmailStub = sinon.stub(emailHelper, 'sendEmail');
    });

    afterEach(() => {
        sendEmailStub.restore();
    });

    it('user create', async () => {
        const res = await chai
            .request(app)
            .post('/api/billing-manager/user')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                firstName: 'jay',
                lastName: 'prajapati',
                email: 'jayyprajapati@yopmail.com',
                roleId: 2
            });
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
            'User created and activation email sent to user.'
        );
    });

    it('email is already in use', async () => {
        const res = await chai
            .request(app)
            .post('/api/billing-manager/user')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                firstName: 'jay',
                lastName: 'prajapati',
                email: 'jayyprajapati@yopmail.com',
                roleId: 2
            });
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('User already exists');
    });

    it('Invalid email address', async () => {
        const res = await chai
            .request(app)
            .post('/api/billing-manager/user')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                firstName: 'jay',
                lastName: 'prajapati',
                email: 'jayprajapati',
                roleId: 2
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal(
            'You have entered invalid email address. Please, enter a valid email address.'
        );
    });

    it('should return error if firstName is missing', async () => {
        const res = await chai
            .request(app)
            .post('/api/billing-manager/user')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                firstName: '',
                lastName: 'prajapati',
                email: 'jayprajapati@yopmail.com',
                roleId: 2
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('firstName field is required.');
    });

    it('should return error if lastName is missing', async () => {
        const res = await chai
            .request(app)
            .post('/api/billing-manager/user')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                firstName: 'jay',
                lastName: '',
                email: 'jayprajapati@yopmail.com',
                roleId: 2
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('lastName field is required.');
    });

    it('should return error if email is missing', async () => {
        const res = await chai
            .request(app)
            .post('/api/billing-manager/user')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                firstName: 'jay',
                lastName: 'prajapati',
                email: '',
                roleId: 2
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Email field is required.');
    });

    it('should return error if role is missing', async () => {
        const res = await chai
            .request(app)
            .post('/api/billing-manager/user')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                firstName: 'jay',
                lastName: 'prajapati',
                email: 'jaypyprajapati@yopmail.com',
                roleId: ''
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('roleId field is required.');
    });
});
