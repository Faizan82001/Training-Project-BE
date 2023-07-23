const chai = require('chai');
const app = require('../../app');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const users = require('../seeds/users');

const token = jwt.sign(
    { id: users[4].id, roleId: users[4].roleId, email: users[4].email },
    process.env.JWT_SECRET,
    {
        expiresIn: '1d'
    }
);

describe('api/billing-admin/change-status/:runNo API test', () => {

    it('Invalid Request if run no is incorrect', async () => {
        const res = await chai.request(app).patch('/api/billing-admin/change-status/46239').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Invalid Request.');
    });

    it('Invalid Request if run no is not present in the database', async () => {
        const res = await chai.request(app).patch('/api/billing-admin/change-status/4').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Invalid Request.');
    });

    it('Invalid Request if run no is present but status is not valid', async () => {
        const res = await chai.request(app).patch('/api/billing-admin/change-status/46239').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Invalid Request.');
    });

    it('Updating data when run no is correct and status is New Request and assignee is not assigned', async () => {
        const res = await chai.request(app).patch('/api/billing-admin/change-status/46238').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Request Assigned Successfully.');
    });

    it('Updating data when run no is correct and status is Assigned for Review and assignee is same as loggedin user', async () => {
        const res = await chai.request(app).patch('/api/billing-admin/change-status/46238').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Request Unassigned Successfully.');
    });

    it('invalid token', async () => {
        const res = await chai.request(app).patch('/api/billing-admin/change-status/46240').set({
            Authorization: 'Bearer xyz'
        });
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Invalid token');
    });

    it('no token', async () => {
        const res = await chai.request(app).patch('/api/billing-admin/change-status/46240').set({
            Authorization: 'Bearer'
        });
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Invalid token');
    });
});
