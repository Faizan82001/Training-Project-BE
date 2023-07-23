const chai = require('chai');
const app = require('../../app');
const chaiHttp = require('chai-http');
const { expect } = chai;
const users = require('../seeds/users');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');
const Helper = require('../../utils/s3helper');

chai.use(chaiHttp);

describe('DELETE /api/trip-requests/docs/:runNo', () => {
    const token = jwt.sign(
        { id: users[3].id, roleId: users[3].roleId, email: users[3].email },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        });

    let deleteStub;

    beforeEach(() => {
        deleteStub = sinon.stub(Helper, 'delete');
    });

    afterEach(() => {
        deleteStub.restore();
    });

    it('should delete image successfully.', async () => {
        const res = await chai
            .request(app)
            .delete('/api/trip-requests/docs/23375?documentName=23375-face_sheet.jpg')
            .set({
                Authorization: 'Bearer ' + token
            });

        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('faceSheet document deleted successfully.');
    });

    it('documentName missing', async () => {
        const res = await chai
            .request(app)
            .delete('/api/trip-requests/docs/12345')
            .set({
                Authorization: 'Bearer ' + token
            });

        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Invalid Request.');
    });
});
