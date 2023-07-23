const chai = require('chai');
const app = require('../../app');
const chaiHttp = require('chai-http');
const { expect } = chai;
const users = require('../seeds/users');
const jwt = require('jsonwebtoken');
const User = require('../../models').user;
const sinon = require('sinon');

chai.use(chaiHttp);

describe('PATCH /api/auth/set-fcm-token', () => {
    const token = jwt.sign(
        { id: users[4].id, roleId: users[4].roleId, email: users[4].email },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        });

    it('should logout a user by updating their fcmToken to null', async () => {
        const res = await chai
            .request(app)
            .patch('/api/auth/set-fcm-token')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                // eslint-disable-next-line max-len
                fcmToken: 'eAV5dADPt9oACJy6FCo-qj:APA91bG8cl-ju4r0wvMBNw2UmIpdqOI8mR_CKXyV8PiMd3OGPTgCwPdVLVUIeEov0R24ZLdxOyANkXeD-5PPyBCPwXbhhvNUx810vqnYf1V4oFsoXY0892tKojfptgV5SQ4jFD-Uv3Ni'
            });
        expect(res).to.have.status(200);
    });

    it('should throw an error when calling the setFCMToken controller', async () => {
        const stub = sinon.stub(User, 'update').throws(new Error('mock error'));
        const res = await chai
            .request(app)
            .patch('/api/auth/set-fcm-token')
            .set({
                Authorization: 'Bearer ' + token
            });
        expect(res).to.have.status(500);
        expect(res.body.message).to.equal('Server Error');
        stub.restore();
    });
});
