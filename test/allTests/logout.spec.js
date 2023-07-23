const chai = require('chai');
const app = require('../../app');
const chaiHttp = require('chai-http');
const { expect } = chai;
const users = require('../seeds/users');
const jwt = require('jsonwebtoken');
const User = require('../../models').user;
const sinon = require('sinon');

chai.use(chaiHttp);

describe('POST /api/auth/logout', () => {
    const token = jwt.sign(
        { id: users[4].id, roleId: users[4].roleId, email: users[4].email },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        });

    it('should logout a user by updating their fcmToken to null', async () => {
        const res = await chai
            .request(app)
            .post('/api/auth/logout')
            .set({
                Authorization: 'Bearer ' + token
            });
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('User logged out successfully.');
    });

    it('should throw an error when calling the logout controller', async () => {
        const stub = sinon.stub(User, 'update').throws(new Error('mock error'));
        const res = await chai
            .request(app)
            .post('/api/auth/logout')
            .set({
                Authorization: 'Bearer ' + token
            });
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Invalid token');
        stub.restore();
    });

    it('no token', async () => {
        const res = await chai
            .request(app)
            .post('/api/auth/logout')
            .set({
                Authorization: 'Bearer '
            });
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Invalid token');
    });
});
