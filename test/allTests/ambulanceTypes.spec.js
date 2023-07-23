const chai = require('chai');
const app = require('../../app');
const chaiHttp = require('chai-http');
const { expect } = chai;
const users = require('../seeds/users');
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);

describe('/api/trip-requests/ambulance-types', () => {
    const validToken = jwt.sign(
        { id: users[3].id, roleId: users[3].roleId, email: users[3].email },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        });
    const invalidToken = jwt.sign(
        { id: users[4].id, roleId: users[4].roleId, email: users[4].email },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        });

    it('should return ambulance types', async () => {
        const res = await chai
            .request(app)
            .get('/api/trip-requests/ambulance-types')
            .set({
                Authorization: 'Bearer ' + validToken
            });
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.be.equal('ALS');
        expect(res.body.data[1]).to.be.equal('BLS');
        expect(res.body.data[2]).to.be.equal('CCT');
    });

    it('unauthorized access', async () => {
        const res = await chai
            .request(app)
            .get('/api/trip-requests/ambulance-types')
            .set({
                Authorization: 'Bearer ' + invalidToken
            });
        expect(res).to.have.status(401);
        expect(res.body.message).to.be.equal('User not authorized.');
    });
});
