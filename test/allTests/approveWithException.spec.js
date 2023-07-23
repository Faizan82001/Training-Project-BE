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

describe('api/billing-admin/approve-with-exception API test', () => {

    it('Approve with Exception creation', async () => {
        const res = await chai
            .request(app)
            .post('/api/billing-admin/approve-with-exception/46241')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                message: 'Approving with Exception of missing 2 files',
                patient: {
                    id: '77aab84a-4d72-4db4-840b-24d5a3c937a3',
                    name: 'Maria Gracia',
                    mrn: '12345',
                    dob: '1963-03-02T18:30:00.000Z',
                    patientGender: 'Female',
                    tripRunNo: 46241,
                    pickupLocation: 'james street',
                    pickupDateTime: '1963-03-02T18:30:00.000Z',
                    destinationAddress: '80 Avenue Street'
                }
            });
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
            'Message added to comments section and Audit trail updated.'
        );
    });

    it('Invalid Request if message field is empty', async () => {
        const res = await chai.request(app).post('/api/billing-admin/approve-with-exception/46240').set({
            Authorization: `Bearer ${token}`
        }).send({
            patient: {
                id: '77aab84a-4d72-4db4-840b-24d5a3c937a3',
                name: 'Maria Gracia',
                mrn: '12345',
                dob: '1963-03-02T18:30:00.000Z',
                patientGender: 'Female',
                tripRunNo: 12347
            }
        });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('message field is required.');
    });

    it('should return 404 if the trip is not found', async () => {
        const res = await chai.request(app).post('/api/billing-admin/approve-with-exception/4').set({
            Authorization: `Bearer ${token}`
        }).send({
            message: 'Approving with Exception of missing 2 files',
            patient: {
                id: '77aab84a-4d72-4db4-840b-24d5a3c937a3',
                name: 'Maria Gracia',
                mrn: '12345',
                dob: '1963-03-02T18:30:00.000Z',
                patientGender: 'Female',
                tripRunNo: 4,
                pickupLocation: 'james street',
                pickupDateTime: '1963-03-02T18:30:00.000Z',
                destinationAddress: '80 Avenue Street'
            }
        });
        expect(res).to.have.status(404);
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

    it('patient field required validation', async () => {
        const res = await chai
            .request(app)
            .post('/api/billing-admin/approve-with-exception/12345')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                message: 'This is test message'
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('patient field is required.');
    });

    it('patient name field required validation', async () => {
        const res = await chai
            .request(app)
            .post('/api/billing-admin/approve-with-exception/12345')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                message: 'This is test message',
                patient: {
                    id: '3e326d77-a471-4271-a3a7-1587c3382a12',
                    mrn: '12345639',
                    dob: '1963-03-02T18:30:00.000Z',
                    patientGender: 'Female',
                    tripRunNo: 12345,
                    pickupLocation: 'james street',
                    pickupDateTime: '1963-03-02T18:30:00.000Z',
                    destinationAddress: '80 Avenue Street'
                }
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('patient name field is required.');
    });

    it('invalid patient name field validation', async () => {
        const res = await chai
            .request(app)
            .post('/api/billing-admin/approve-with-exception/12345')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                message: 'This is test message',
                patient: {
                    id: 'dc865d76-793f-4ce5-a0cb-97205e7b52a0',
                    name: 'dsf98651c',
                    mrn: '12345',
                    dob: '1963-03-02T18:30:00.000Z',
                    patientGender: 'Female',
                    tripRunNo: 12345,
                    pickupLocation: 'james street',
                    pickupDateTime: '1963-03-02T18:30:00.000Z',
                    destinationAddress: '80 Avenue Street'
                }
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Please enter a valid name.');
    });
});

