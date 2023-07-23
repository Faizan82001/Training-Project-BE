const chai = require('chai');
const app = require('../../app');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const users = require('../seeds/users');
const sinon = require('sinon');
const Issues = require('../../models').issues;

const token = jwt.sign(
    { id: users[3].id, roleId: users[3].roleId, email: users[3].email },
    process.env.JWT_SECRET,
    {
        expiresIn: '1d'
    }
);

describe('GET /api/report-issue/issue-list', () => {

    it('should return a list of issues', async () => {
        const res = await chai.request(app).get('/api/report-issue/issue-list').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
    });

    it('should throw an error when calling the issuelist controller', async () => {
        const stub = sinon.stub(Issues, 'findAll').throws(new Error('mock error'));
        const res = await chai.request(app).get('/api/report-issue/issue-list').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(500);
        expect(res.body.message).to.equal('Server Error');
        stub.restore();
    });
});
