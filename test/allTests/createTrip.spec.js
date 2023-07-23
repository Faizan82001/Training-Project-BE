const chai = require('chai');
const app = require('../../app');
const chaiHttp = require('chai-http');
const { expect } = chai;
const users = require('../seeds/users');
const jwt = require('jsonwebtoken');
const { updateDocsStatus } = require('../../utils/fireStoreHelper');
const Document = require('../../models').document;

chai.use(chaiHttp);

describe('POST /api/trip-requests/create', () => {
    const token = jwt.sign(
        { id: users[3].id, roleId: users[3].roleId, email: users[3].email },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        });

    it('document validation failed', async () => {
        const res = await chai
            .request(app)
            .post('/api/trip-requests/create')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                runNo: 46239,
                serviceType: 'ALS'
            });

        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Please upload face sheet and pcs documents.');
    });

    it('field required validation failed', async () => {
        const res = await chai
            .request(app)
            .post('/api/trip-requests/create')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                runNo: 46239
            });

        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('serviceType field is required.');
    });

    it('should trip create successfully', async () => {
        const res = await chai
            .request(app)
            .post('/api/trip-requests/create')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                runNo: 46501,
                serviceType: 'CCT'
            });

        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Trip created successfully.');
    });

    it('ocr validation failed', async () => {
        await updateDocsStatus(23375, { faceSheet: true, pcs: true });
        await Document.upsert({ runNo: 23375, faceSheet: 'documentName', pcs: 'pcs' });
        const res = await chai
            .request(app)
            .post('/api/trip-requests/create')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                runNo: 23375,
                serviceType: 'CCT'
            });

        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('OCR is unable to identify the information. Can you please reupload faceSheet?');
    });
});
