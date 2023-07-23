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

describe('api/trip-requests/dataprovided/:runNo API test', () => {

    it('Data provided', async () => {
        const res = await chai
            .request(app)
            .patch('/api/trip-requests/dataprovided/46240')
            .set({
                Authorization: 'Bearer ' + token
            });
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
            'Trip data updated successfully.'
        );
    });

    it('run no is incorrect', async () => {
        const res = await chai.request(app).patch('/api/trip-requests/dataprovided/96345').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Please upload face sheet and pcs documents.');
    });

    it('Invalid Request if run no is present but status is not valid', async () => {
        const res = await chai.request(app).patch('/api/trip-requests/dataprovided/46240').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Invalid Request.');
    });

    it('Invalid Request if run no is present but documents not uploaded', async () => {
        const res = await chai.request(app).patch('/api/trip-requests/dataprovided/12346').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Please upload face sheet and pcs documents.');
    });

    it('invalid token', async () => {
        const res = await chai.request(app).patch('/api/trip-requests/dataprovided/46240').set({
            Authorization: 'Bearer xyz'
        });
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Invalid token');
    });

    it('no token', async () => {
        const res = await chai.request(app).patch('/api/trip-requests/dataprovided/46240').set({
            Authorization: 'Bearer'
        });
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Invalid token');
    });
});
