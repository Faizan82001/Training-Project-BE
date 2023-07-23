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

describe('GET api/billing-manager/total-requests', () => {
    it('should return total request count with percentage with default parameter', async () => {
        const res = await chai.request(app)
            .get('/api/billing-manager/total-requests')
            .set('Authorization', `Bearer ${token}`);

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data').that.is.an('array');
    });

    it('should return invalid date format', async () => {
        const res = await chai.request(app)
            .get('/api/billing-manager/total-requests?startDate=01-01-2022&lastDate=04-01-2022')
            .set('Authorization', `Bearer ${token}`);

        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Invalid date format.');
    });

    it('should return error if there is start and end date is more than 3 months', async () => {
        const res = await chai.request(app)
            .get('/api/billing-manager/total-requests?startDate=2023-01-01&endDate=2023-04-02')
            .set('Authorization', `Bearer ${token}`);

        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Please verify start and end date.');
    });
});

