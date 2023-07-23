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

describe('api/billing-admin/requests API test', () => {
    it('listing data with correct data format', async () => {
        const res = await chai.request(app).get('/api/billing-admin/requests').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.be.an('object');
        expect(res.body.requestCount).to.be.an('number');
        expect(res.body.paginationData).to.be.an('object');
    });

    it('listing users with no requested query parameter', async () => {
        const res = await chai.request(app).get('/api/billing-admin/requests').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(200);
        expect(res.body.data[0].status).to.equal('New Request');
        expect(res.body).to.have.property('requestCount');
        expect(res.body.paginationData).to.be.an('object');
    });

    it('listing users where request type is invalid', async () => {
        const res = await chai.request(app).get('/api/billing-admin/requests?requestType=ap').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Invalid Request.');
    });

    it('listing users where myRequest is invalid', async () => {
        const res = await chai.request(app).get('/api/billing-admin/requests?requestType=pending&myRequest=any').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Invalid Request.');
    });

    it('listing users where request type is pending', async () => {
        const res = await chai.request(app).get('/api/billing-admin/requests?requestType=pending').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(200);
        expect(res.body.data[0].status).to.be.oneOf(['Assigned for Review', 'Request more Information', 'Data Provided']);
        expect(res.body).to.have.property('requestCount');
        expect(res.body.paginationData).to.be.an('object');
    });

    it('listing users where request type is approved', async () => {
        const res = await chai.request(app).get('/api/billing-admin/requests?requestType=approved').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(200);
        expect(res.body.data[0].status).to.be.oneOf(['Approved', 'Approved with Exception']);
    });

    it('listing users where request type is approved and page request is wrong', async () => {
        const res = await chai.request(app).get('/api/billing-admin/requests?requestType=approved&page=two').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Invalid Page request.');

    });

    it('listing users where request type is pending and status is Assigned for Review', async () => {
        const res = await chai.request(app).get('/api/billing-admin/requests?requestType=pending&status=Assigned for Review').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(200);
        expect(res.body.data[0].status).to.equal('Assigned for Review');
        expect(res.body).to.have.property('requestCount');
        expect(res.body.paginationData).to.be.an('object');
    });

    it('listing users where request type is approved and status is Approved', async () => {
        const res = await chai.request(app).get('/api/billing-admin/requests?requestType=approved&status=Approved').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(200);
        expect(res.body.data[0].status).to.equal('Approved');
        expect(res.body).to.have.property('requestCount');
        expect(res.body.paginationData).to.be.an('object');
    });

    it('listing users where request type is pending and myRequest is true', async () => {
        const res = await chai.request(app).get('/api/billing-admin/requests?requestType=pending&myRequest=true').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(200);
        expect(res.body.data[0].status).to.be.oneOf(['Assigned for Review', 'Request more Information', 'Data Provided']);
        expect(res.body).to.have.property('requestCount');
        expect(res.body.paginationData).to.be.an('object');
    });

    it('llisting users where request type is pending, status is Assigned and myRequest is true', async () => {

        const res = await chai.request(app)
            .get('/api/billing-admin/requests?requestType=pending&status=Assigned for Review&myRequest=true').set({
                Authorization: `Bearer ${token}`
            });
        expect(res).to.have.status(200);
        expect(res.body.data[0].status).to.equal('Assigned for Review');
        expect(res.body).to.have.property('requestCount');
        expect(res.body.paginationData).to.be.an('object');
    });

    it('invalid token', async () => {
        const res = await chai.request(app).get('/api/billing-admin/requests?requestType=approved').set({
            Authorization: 'Bearer xyz'
        });
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Invalid token');
    });

    it('no token', async () => {
        const res = await chai.request(app).get('/api/billing-admin/requests?requestType=approved').set({
            Authorization: 'Bearer'
        });
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Invalid token');
    });
});
