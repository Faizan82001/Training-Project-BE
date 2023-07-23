const chai = require('chai');
const app = require('../../app');
const chaiHttp = require('chai-http');
const { expect } = chai;
const users = require('../seeds/users');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');
const Helper = require('../../utils/s3helper');
const fs = require('fs');

chai.use(chaiHttp);

describe('POST /api/trip-requests/docs/:runNo', () => {
    const token = jwt.sign(
        { id: users[3].id, roleId: users[3].roleId, email: users[3].email },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        });

    const image = fs.readFileSync('./test/seeds/mockData/pexels-stephan-seeber-1261728.jpg', { encoding: 'base64' });

    let uploadStub;

    beforeEach(() => {
        uploadStub = sinon.stub(Helper, 'upload');
    });

    afterEach(() => {
        uploadStub.restore();
    });

    it('should upload image successfully.', async () => {
        const res = await chai
            .request(app)
            .post('/api/trip-requests/docs/23375')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                documentName: '23375-face_sheet.jpg',
                image
            });

        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('faceSheet document uploaded successfully.');
    });

    it('documentName missing', async () => {
        const res = await chai
            .request(app)
            .post('/api/trip-requests/docs/12345')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                image
            });

        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('documentName field is required.');
    });
});
