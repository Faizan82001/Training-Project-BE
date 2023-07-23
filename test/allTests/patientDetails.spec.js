const chai = require('chai');
const app = require('../../app');
const chaiHttp = require('chai-http');
const { expect } = chai;
const users = require('../seeds/users');
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);

describe('GET /api/billing-admin/patient/:runNo', () => {
    const token = jwt.sign(
        { id: users[4].id, roleId: users[4].roleId, email: users[4].email },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        });

    it('should give patient details.', async () => {
        const res = await chai
            .request(app)
            .get('/api/billing-admin/patient/12347')
            .set({
                Authorization: 'Bearer ' + token
            });

        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.name).to.be.equal('Maria Gracia');
        expect(res.body.data.patientGender).to.be.equal('Female');
        expect(res.body.data.status).to.be.equal('Assigned for Review');
    });

    it('no patient found.', async () => {
        const res = await chai
            .request(app)
            .get('/api/billing-admin/patient/6348')
            .set({
                Authorization: 'Bearer ' + token
            });

        expect(res).to.have.status(404);
        expect(res.body.message).to.be.equal('Patient not found for this trip number.');
    });
});
