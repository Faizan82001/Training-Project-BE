const chai = require('chai');
const app = require('../../app');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const users = require('../seeds/users');
const sinon = require('sinon');
const emailHelper = require('../../utils/emailSender');

const token = jwt.sign(
    { id: users[0].id, roleId: users[0].roleId, email: users[0].email },
    process.env.JWT_SECRET,
    {
        expiresIn: '1d'
    }
);

describe('api/billing-manager/users/activity-status/:userId API test', () => {

    it('Invalid Request if user not found', async () => {
        const res = await chai.request(app).patch('/api/billing-manager/users/activity-status/acbc730f-0834-4e57-9d55-3be5be66c029').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('User not found.');
    });

    it('change status of user from active to in-active', async () => {
        const res = await chai.request(app).patch('/api/billing-manager/users/activity-status/6c6c730f-0834-4e57-9d55-3be5be66c021').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('User status updated successfully.');
    });

    it('change status of user from in-active to active', async () => {
        const res = await chai.request(app).patch('/api/billing-manager/users/activity-status/6c6c730f-0834-4e57-9d55-3be5be66c021').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('User status updated successfully.');
    });

    it('send email if user is invited', async () => {
        const sendEmailStub = sinon.stub(emailHelper, 'sendEmail');
        const res = await chai.request(app).patch('/api/billing-manager/users/activity-status/7dc17a2f-af7b-432d-9dc8-1d9bb3ee3b51').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Set password email sent to the user successfully.');
        sendEmailStub.restore();
    });

    it('invalid token', async () => {
        const res = await chai.request(app).patch('/api/billing-manager/users/activity-status/46240').set({
            Authorization: 'Bearer xyz'
        });
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Invalid token');
    });

    it('no token', async () => {
        const res = await chai.request(app).patch('/api/billing-manager/users/activity-status/46240').set({
            Authorization: 'Bearer'
        });
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Invalid token');
    });
});
