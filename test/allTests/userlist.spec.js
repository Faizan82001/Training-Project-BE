const chai = require('chai');
const app = require('../../app');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const users = require('../seeds/users');

const token = jwt.sign(
    { id: users[0].id, roleId: users[0].roleId, email: users[0].email },
    process.env.JWT_SECRET,
    {
        expiresIn: '1d'
    }
);

describe('api/billing-manager/users API test', () => {
    it('listing users with correct data format', async () => {
        const res = await chai.request(app).get('/api/billing-manager/users').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.rows).to.be.an('array');
        expect(res.body.data.rows[0]).to.have.property('firstName');
        expect(res.body.data.rows[0]).to.have.property('lastName');
        expect(res.body.data.rows[0]).to.have.property('email');
        expect(res.body.data.rows[0]).to.have.property('roleId');
        expect(res.body.data.rows[0]).to.have.property('status');
    });

    it('listing users with no requested query parameter', async () => {
        const res = await chai.request(app).get('/api/billing-manager/users').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(200);
    });

    it('listing users with both requested field', async () => {
        const res = await chai.request(app).get('/api/billing-manager/users?role_id=2&status=invited').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.rows).to.be.an('array');
        expect(res.body.data.rows[0]).to.have.property('firstName');
        expect(res.body.data.rows[0]).to.have.property('lastName');
        expect(res.body.data.rows[0]).to.have.property('email');
        expect(res.body.data.rows[0]).to.have.property('roleId');
        expect(res.body.data.rows[0]).to.have.property('status');
    });

    it('listing users with only role field', async () => {
        const res = await chai.request(app).get('/api/billing-manager/users?role_id=2').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.rows).to.be.an('array');
        expect(res.body.data.rows[0]).to.have.property('firstName');
        expect(res.body.data.rows[0]).to.have.property('lastName');
        expect(res.body.data.rows[0]).to.have.property('email');
        expect(res.body.data.rows[0]).to.have.property('roleId');
        expect(res.body.data.rows[0]).to.have.property('status');
    });

    it('listing users with only status field', async () => {
        const res = await chai.request(app).get('/api/billing-manager/users?status=invited').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.rows).to.be.an('array');
        expect(res.body.data.rows[0]).to.have.property('firstName');
        expect(res.body.data.rows[0]).to.have.property('lastName');
        expect(res.body.data.rows[0]).to.have.property('email');
        expect(res.body.data.rows[0]).to.have.property('roleId');
        expect(res.body.data.rows[0]).to.have.property('status');
    });

    it('listing users with both requested field including pagination', async () => {
        const res = await chai.request(app).get('/api/billing-manager/users?role_id=2&status=invited&page=1').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.rows).to.be.an('array');
        expect(res.body.data.rows[0]).to.have.property('firstName');
        expect(res.body.data.rows[0]).to.have.property('lastName');
        expect(res.body.data.rows[0]).to.have.property('email');
        expect(res.body.data.rows[0]).to.have.property('roleId');
        expect(res.body.data.rows[0]).to.have.property('status');
    });

    it('pagination field type is wrong', async () => {
        const res = await chai.request(app).get('/api/billing-manager/users?role_id=2&status=invited&page=showpage').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Invalid Page request.');
    });

    it('invalid token', async () => {
        const res = await chai.request(app).get('/api/billing-manager/users').set({
            Authorization: 'Bearer xyz'
        });
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Invalid token');
    });

    it('no token', async () => {
        const res = await chai.request(app).get('/api/billing-manager/users').set({
            Authorization: 'Bearer'
        });
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Invalid token');
    });
});
