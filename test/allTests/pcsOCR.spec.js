const chai = require('chai');
const app = require('../../app');
const chaiHttp = require('chai-http');
const { expect } = chai;
const seed = require('../seeds/pcsRes');
const crypto = require('crypto');
const sinon = require('sinon');
const Helper = require('../../utils/s3helper');
const { setDocStatus } = require('../../utils/fireStoreHelper');

chai.use(chaiHttp);

describe('api/ocr/pcs API test', () => {
    const lambdaHeader = crypto.createHash('sha256').update(process.env.LAMBDA_AUTHORIZATION_KEY).digest('hex');
    let deleteStub;

    beforeEach(() => {
        deleteStub = sinon.stub(Helper, 'delete');
    });

    afterEach(() => {
        deleteStub.restore();
    });

    it('successfully create patient', async () => {
        const res = await chai.request(app).post('/api/ocr/pcs')
            .set({
                'lambda-header': lambdaHeader
            })
            .send({
                ...seed[0]
            });
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('pcs data logged successfully.');
    });

    it('missing field', async () => {
        const res = await chai.request(app).post('/api/ocr/pcs')
            .set({
                'lambda-header': lambdaHeader
            })
            .send({
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('key field is required.');
    });

    it('invalid header', async () => {
        const res = await chai.request(app).post('/api/ocr/pcs')
            .set({
                'lambda-header': 'xyz'
            })
            .send({
            });
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Invalid token');
    });

    it('pcs ocr validation failed', async () => {
        await setDocStatus(46501, 'creator-id');
        const res = await chai.request(app).post('/api/ocr/pcs')
            .set({
                'lambda-header': lambdaHeader
            })
            .send({
                ...seed[1]
            });
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('pcs data logging failed due to OCR validation.');
    });
});
