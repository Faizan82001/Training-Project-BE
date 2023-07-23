const Trip = require('../models').trip;
const Document = require('../models').document;
const Patient = require('../models').patient;
const AuditTrail = require('../models').audit_trail;

const tripseed = require('./seeds/trips');
const docsseed = require('./seeds/docs');
const patientseed = require('./seeds/patient');
const auditTrailSeed = require('./seeds/auditTrail');

describe('adding seed data', () => {
    it('should add document seed to database', async () => {
        await Document.bulkCreate(docsseed);
    });
    it('should add trip seed to database', async () => {
        await Trip.bulkCreate(tripseed);
    });
    it('should add patient seed to database', async () => {
        await Patient.bulkCreate(patientseed);
    });
    it('should add audit trail seed to database', async () => {
        await AuditTrail.bulkCreate(auditTrailSeed);
    });
});
