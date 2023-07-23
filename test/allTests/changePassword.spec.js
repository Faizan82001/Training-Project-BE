const jwt = require('jsonwebtoken');
const chai = require('chai');
const app = require('../../app');
const chaiHttp = require('chai-http');
const { expect } = chai;
const users = require('../seeds/users');

chai.use(chaiHttp);

const token = jwt.sign(
    { id: users[0].id, roleId: users[0].roleId, email: users[0].email },
    process.env.JWT_SECRET,
    {
        expiresIn: '1d'
    }
);

describe('api/auth/change-password API test', () => {
    it('success change password attempt', async () => {
        const res = await chai
            .request(app)
            .post('/api/auth/change-password')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                oldPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E=',
                newPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E=',
                confirmPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E='
            });
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Password changed successfully.');
    });

    it('incorrect old password', async () => {
        const res = await chai
            .request(app)
            .post('/api/auth/change-password')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                oldPassword: 'U2FsdGVkX19wYzm/dyJ7NMTuKHwTvVXU/YKLxHLQTc4=',
                newPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E=',
                confirmPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E='
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal(
            'Your password is incorrect.Please enter correct password.'
        );
    });

    it('invalid new password', async () => {
        const res = await chai
            .request(app)
            .post('/api/auth/change-password')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                oldPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E=',
                newPassword: 'U2FsdGVkX18tNXHL0WUlIA0tokcbdd0N2Ve5FLypbLI=',
                confirmPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E='
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal(
            // eslint-disable-next-line max-len
            'Please enter a password that has minimum 8 and maximum 20 character. It should contain atleast 1 uppercase, 1 lowercase letter, 1 special character and 1 number.'
        );
    });

    it('invalid confirm password', async () => {
        const res = await chai
            .request(app)
            .post('/api/auth/change-password')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                oldPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E=',
                newPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E=',
                confirmPassword: 'U2FsdGVkX18tNXHL0WUlIA0tokcbdd0N2Ve5FLypbLI='
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal(
            'Your password and confirm password are not matched.'
        );
    });

    it('empty old password', async () => {
        const res = await chai
            .request(app)
            .post('/api/auth/change-password')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                oldPassword: 'U2FsdGVkX1+jLrnK/I83R0nXk2JgZTEIlsQE7wJdmWQ=',
                newPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E=',
                confirmPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E='
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('oldPassword field is required.');
    });

    it('empty confirm password', async () => {
        const res = await chai
            .request(app)
            .post('/api/auth/change-password')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                oldPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E=',
                newPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E=',
                confirmPassword: 'U2FsdGVkX18mNXpFPjCHLACdcbALDhVYS8OA44rfits='
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Confirm Password field is required.');
    });

    it('no oldPassword field', async () => {
        const res = await chai
            .request(app)
            .post('/api/auth/change-password')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                newPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E=',
                confirmPassword: 'U2FsdGVkX18tNXHL0WUlIA0tokcbdd0N2Ve5FLypbLI='
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('oldPassword field is required.');
    });

    it('no newPassword field', async () => {
        const res = await chai
            .request(app)
            .post('/api/auth/change-password')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                oldPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E=',
                confirmPassword: 'U2FsdGVkX18tNXHL0WUlIA0tokcbdd0N2Ve5FLypbLI='
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('newPassword field is required.');
    });

    it('no confirmPassword field', async () => {
        const res = await chai
            .request(app)
            .post('/api/auth/change-password')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                oldPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E=',
                newPassword: 'U2FsdGVkX18tNXHL0WUlIA0tokcbdd0N2Ve5FLypbLI='
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('confirmPassword field is required.');
    });

    it('invalid token', async () => {
        const res = await chai
            .request(app)
            .post('/api/auth/change-password')
            .set({
                Authorization: 'Bearer xyz'
            })
            .send({
                oldPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E=',
                newPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E=',
                confirmPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E='
            });
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Invalid token');
    });

    it('no token', async () => {
        const res = await chai
            .request(app)
            .post('/api/auth/change-password')
            .set({
                Authorization: 'Bearer'
            })
            .send({
                oldPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E=',
                newPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E=',
                confirmPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E='
            });
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Invalid token');
    });

    it('inactive user can\'t change password', async () => {
        const newToken = jwt.sign(
            { id: users[2].id, roleId: users[2].roleId, email: users[2].email },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );
        const res = await chai
            .request(app)
            .post('/api/auth/change-password')
            .set({
                Authorization: 'Bearer ' + newToken
            })
            .send({
                oldPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E=',
                newPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E=',
                confirmPassword: 'U2FsdGVkX183S07ZN4wxbEF/TmVmErvMAigwIIaYN1E='
            });
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('User not authorized.');
    });
});
