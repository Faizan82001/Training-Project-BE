const chai = require('chai');
const app = require('../../app');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const users = require('../seeds/users');
const expect = chai.expect;

chai.use(chaiHttp);

const token = jwt.sign(
    { id: users[4].id, roleId: users[4].roleId, email: users[4].email },
    process.env.JWT_SECRET,
    {
        expiresIn: '1d'
    }
);

describe('api/billing-admin/request-more-info API test', () => {

    it('Request more information creation', async () => {
        const res = await chai
            .request(app)
            .post('/api/billing-admin/request-more-info/46240')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                message: 'MRN No is Misssing'
            });
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
            'Message added to comments section and Audit trail updated.'
        );
    });

    it('Invalid Request if run no is not present in the database', async () => {
        const res = await chai.request(app).post('/api/billing-admin/request-more-info/4').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Trip not found');
    });

    it('Invalid Request if run no is present but status is not valid', async () => {
        const res = await chai.request(app).post('/api/billing-admin/request-more-info/46239').set({
            Authorization: `Bearer ${token}`
        });
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Trip not found');
    });

    it('invalid token', async () => {
        const res = await chai.request(app).post('/api/billing-admin/approve-with-exception/46240').set({
            Authorization: 'Bearer xyz'
        });
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Invalid token');
    });

    it('no token', async () => {
        const res = await chai.request(app).post('/api/billing-admin/approve-with-exception/46240').set({
            Authorization: 'Bearer'
        });
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Invalid token');
    });
});

