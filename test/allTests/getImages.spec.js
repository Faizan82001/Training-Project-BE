const chai = require('chai');
const app = require('../../app');
const chaiHttp = require('chai-http');
const { expect } = chai;
const users = require('../seeds/users');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');
const Helper = require('../../utils/s3helper');

chai.use(chaiHttp);


describe('get images', () => {
    const token = jwt.sign(
        { id: users[3].id, roleId: users[3].roleId, email: users[3].email },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        });

    let getSignedUrlStub;

    beforeEach(() => {
        getSignedUrlStub = sinon.stub(Helper, 'getSignedURL').resolves('https://signedUrl123.com');
    });

    afterEach(() => {
        getSignedUrlStub.restore();
    });

    it('should return images', async () => {
        const res = await chai
            .request(app)
            .get('/api/trip-requests/trip-image?runNo=12347')
            .set({
                Authorization: 'Bearer ' + token
            });
        expect(res).to.have.status(200);
        expect(res.body.data.faceSheet).to.equal('https://signedUrl123.com');
        expect(res.body.data.pcs).to.equal('https://signedUrl123.com');
        expect(res.body.data.aob).to.equal('https://signedUrl123.com');
        expect(res.body.data.other1).to.equal('https://signedUrl123.com');
        expect(res.body.data.other2).to.equal('https://signedUrl123.com');
        expect(res.body.data.other3).to.equal('https://signedUrl123.com');
        expect(res.body.data.other4).to.equal('https://signedUrl123.com');
    });

    it('no run number in params', async () => {
        const res = await chai
            .request(app)
            .get('/api/trip-requests/trip-image?runNo=')
            .set({
                Authorization: 'Bearer ' + token
            });
        expect(res).to.have.status(400);
    });

    it('run no does not exist', async () => {
        const res = await chai
            .request(app)
            .get('/api/trip-requests/trip-image?runNo=12')
            .set({
                Authorization: 'Bearer ' + token
            });
        expect(res).to.have.status(404);
    });
});


describe('if image data is not present', async () => {
    const token = jwt.sign(
        { id: users[3].id, roleId: users[3].roleId, email: users[3].email },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        });

    it('should return null in place of images', async () => {
        const res = await chai
            .request(app)
            .get('/api/trip-requests/trip-image?runNo=12346')
            .set({
                Authorization: 'Bearer ' + token
            });
        expect(res).to.have.status(200);
        expect(res.body.data.faceSheet).to.equal(null);
        expect(res.body.data.pcs).to.equal(null);
        expect(res.body.data.aob).to.equal(null);
        expect(res.body.data.other1).to.equal(null);
        expect(res.body.data.other2).to.equal(null);
        expect(res.body.data.other3).to.equal(null);
        expect(res.body.data.other4).to.equal(null);
    });

});
