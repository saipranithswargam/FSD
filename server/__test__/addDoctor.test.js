const request = require('supertest');
const { app } = require('../server');
const Doctor = require('../models/doctors');
const redisClient = require("../cacheClient/redis-client")
jest.mock('../models/doctors');

describe('POST /addDoctor', () => {
    it('responds with 200 status and saves the patient', async () => {
        const newPatient = {
            name: 'John Doe',
            email: 'johndoe@example.com',
        };

        Doctor.prototype.save.mockResolvedValue();

        const response = await request(app)
            .post('/addDoctor')
            .send(newPatient);

        expect(response.status).toBe(200);

        expect(Doctor.prototype.save).toHaveBeenCalled();
    }, 10000);

});

afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    redisClient.quit()
    done();
});
