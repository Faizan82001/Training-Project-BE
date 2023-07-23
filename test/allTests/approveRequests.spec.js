const chai = require('chai');
const app = require('../../app');
const chaiHttp = require('chai-http');
const { expect } = chai;
const users = require('../seeds/users');
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);

describe('testing approve request api', () => {
    const token = jwt.sign(
        { id: users[4].id, roleId: users[4].roleId, email: users[4].email },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        });

    it('should return request details', async () => {
        const res = await chai
            .request(app)
            .patch('/api/billing-admin/approve-request?runNo=12345')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                patient: {
                    id: '77aab84a-4d72-4db4-840b-24d5a3c937a3',
                    name: 'Maria Gracia',
                    mrn: '12345',
                    dob: '1963-03-02T18:30:00.000Z',
                    patientGender: 'Female',
                    tripRunNo: 12345,
                    pickupLocation: 'james street',
                    pickupDateTime: '1963-03-02T18:30:00.000Z',
                    destinationAddress: '80 Avenue Street'
                }
            });
        expect(res).to.have.status(200);
    });

    it('no run number in query', async () => {
        const res = await chai
            .request(app)
            .patch('/api/billing-admin/approve-request?runNo=')
            .set({
                Authorization: 'Bearer ' + token
            });
        expect(res).to.have.status(400);
    });

    it('patient field required validation', async () => {
        const res = await chai
            .request(app)
            .patch('/api/billing-admin/approve-request?runNo=12345')
            .set({
                Authorization: 'Bearer ' + token
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('patient field is required.');
    });

    it('patient name field required validation', async () => {
        const res = await chai
            .request(app)
            .patch('/api/billing-admin/approve-request?runNo=12345')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
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
            .patch('/api/billing-admin/approve-request?runNo=12345')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
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

    it('invalid request', async () => {
        const res = await chai
            .request(app)
            .patch('/api/billing-admin/approve-request?runNo=12345')
            .set({
                Authorization: 'Bearer ' + token
            })
            .send({
                patient: {
                    id: '77aab84a-4d72-4db4-840b-24d5a3c937a3',
                    name: 'Maria Gracia',
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
        expect(res.body.message).to.equal('Invalid Request.');
    });
});
