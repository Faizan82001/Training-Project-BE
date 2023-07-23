const chai = require('chai');
const app = require('../../app');
const chaiHttp = require('chai-http');
const { expect } = chai;
const users = require('../seeds/users');
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);

describe('/api/trip-requests/search/:runNo', () => {
    const token = jwt.sign(
        { id: users[3].id, roleId: users[3].roleId, email: users[3].email },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        });

    it('should return trip request data', async () => {
        const res = await chai
            .request(app)
            .get('/api/trip-requests/search/46238')
            .set({
                Authorization: 'Bearer ' + token
            });
        expect(res).to.have.status(200);
        expect(res.body.data.runNo).to.be.equal(46238);
        expect(res.body.data.serviceType).to.be.equal('ALS');
        expect(res.body.data.nurseName).to.be.equal(`${users[3].firstName} ${users[3].lastName}`);
        expect(res.body.data.assigneeName).to.be.equal(null);
    });

    it('incorrect trip number', async () => {
        const res = await chai
            .request(app)
            .get('/api/trip-requests/search/23375')
            .set({
                Authorization: 'Bearer ' + token
            });
        expect(res).to.have.status(404);
        expect(res.body.message).to.be.equal('Data not found.');
    });
});
