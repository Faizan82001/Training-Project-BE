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

describe('GET api/billing-manager/performance-counter', () => {
    it('should return error where no parameter provided', async () => {
        const res = await chai.request(app)
            .get('/api/billing-manager/performance-counter')
            .set('Authorization', `Bearer ${token}`);

        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('id field is required.');
    });

    it('should return data where id parameter provided', async () => {
        const res = await chai.request(app)
            .get('/api/billing-manager/performance-counter?id=6c6c730f-0834-4e57-9d55-3be5be66c021')
            .set('Authorization', `Bearer ${token}`);

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('totalCount');
        expect(res.body).to.have.property('data').that.is.an('array');
    });

    it('should return invalid date format', async () => {
        const res = await chai.request(app)
            .get('/api/billing-manager/performance-counter?id=6c6c730f-0834-4e57-9d55-3be5be66c021&startDate=01-01-2022&lastDate=04-01-2022')
            .set('Authorization', `Bearer ${token}`);

        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Invalid date format.');
    });
});
