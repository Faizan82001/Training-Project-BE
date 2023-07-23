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

describe('GET api/billing-manager/list-billing-admin', () => {
    it('should return data', async () => {
        const res = await chai.request(app)
            .get('/api/billing-manager/list-billing-admin')
            .set({ Authorization: 'Bearer ' + token });

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
    });
});
