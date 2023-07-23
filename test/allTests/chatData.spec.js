const chai = require('chai');
const app = require('../../app');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const users = require('../seeds/users');
const expect = chai.expect;

chai.use(chaiHttp);

const token = jwt.sign(
    { id: users[5].id, roleId: users[5].roleId, email: users[5].email },
    process.env.JWT_SECRET,
    {
        expiresIn: '1d'
    }
);

describe('api/trip-requests/chat-data/:runNo API test', () => {

    it('chat data send successfully', async () => {
        const res = await chai
            .request(app)
            .get('/api/trip-requests/chat-data/46240')
            .set({
                Authorization: 'Bearer ' + token
            });
        expect(res).to.have.status(200);
        expect(res.body.data).to.have.property('creatorId');
        expect(res.body.data).to.have.property('assignee');
        expect(res.body.data).to.have.property('creatorInitial');
        expect(res.body.data).to.have.property('assigneeInitial');
    });

    it('run no is incorrect', async () => {
        const res = await chai.request(app).get('/api/trip-requests/chat-data/96345').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Trip not found');
    });

    it('invalid token', async () => {
        const res = await chai.request(app).get('/api/trip-requests/chat-data/46240').set({
            Authorization: 'Bearer xyz'
        });
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Invalid token');
    });

    it('no token', async () => {
        const res = await chai.request(app).get('/api/trip-requests/chat-data/46240').set({
            Authorization: 'Bearer'
        });
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Invalid token');
    });
});
