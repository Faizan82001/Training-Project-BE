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

describe('api/audit-trail/list API test', () => {

    it('should return audit trail data for a valid runNo', async () => {
        const res = await chai.request(app).get('/api/audit-trail/list/46240').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an('array');
        for (const item of res.body.data) {
            expect(item).to.have.property('firstName');
            expect(item).to.have.property('lastName');
            expect(item).to.have.property('createdAt');
            expect(item).to.have.property('updatedAt');
            expect(item).to.have.property('status');
            expect(item).to.have.property('runNo');
            expect(item).to.have.property('message');
        }
    });

    it('Give error if something is missing in the field', async () => {
        const res = await chai.request(app).get('/api/audit-trail/list/4624').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Invalid Request.');
    });

    it('invalid token', async () => {
        const res = await chai.request(app).get('/api/audit-trail/list/46240').set({
            Authorization: 'Bearer xyz'
        });
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Invalid token');
    });

    it('no token', async () => {
        const res = await chai.request(app).get('/api/audit-trail/list/46240').set({
            Authorization: 'Bearer'
        });
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Invalid token');
    });
});
