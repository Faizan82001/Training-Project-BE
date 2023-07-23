const chai = require('chai');
const app = require('../../app');
const chaiHttp = require('chai-http');
const { expect } = chai;
const users = require('../seeds/users');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');
const Trip = require('../../models').trip;

chai.use(chaiHttp);

describe('/api/trip-requests/trips', () => {
    let token;

    it('should return trips for logged in nurse user', async () => {
        token = jwt.sign(
            { id: users[3].id, roleId: users[3].roleId, email: users[3].email },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            });
        const res = await chai
            .request(app)
            .get('/api/trip-requests/trips')
            .set({
                Authorization: 'Bearer ' + token
            });
        expect(res).to.have.status(200);
        expect(res.body.data.runNoOfTrips).to.be.an('array');
        expect(res.body.data.currentUser).to.be.equal(users[3].id);
    });

    it('should return trips for logged in billing admin user', async () => {
        token = jwt.sign(
            { id: users[4].id, roleId: users[4].roleId, email: users[4].email },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            });
        const res = await chai
            .request(app)
            .get('/api/trip-requests/trips')
            .set({
                Authorization: 'Bearer ' + token
            });
        expect(res).to.have.status(200);
        expect(res.body.data.runNoOfTrips).to.be.an('array');
        expect(res.body.data.currentUser).to.be.equal(users[4].id);
    });

    it('should throw an error when calling the getTrips controller', async () => {
        const stub = sinon.stub(Trip, 'findAll').throws(new Error('mock error'));
        const res = await chai
            .request(app)
            .get('/api/trip-requests/trips')
            .set({
                Authorization: 'Bearer ' + token
            });
        expect(res).to.have.status(500);
        expect(res.body.message).to.equal('Server Error');
        stub.restore();
    });
});
