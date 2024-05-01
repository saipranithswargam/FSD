const request = require('supertest')

const { app } = require('../server.js')

const Patients = require("../models/patients.js")
const redisClient = require("../cacheClient/redis-client")
jest.mock("../models/patients.js")

describe("get all patients", (done) => {
    test('get all patients', async () => {
        const response = await request(app)
            .get("/getpatients");
        expect(response.status).toBe(200);
    })
})
afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    redisClient.quit();
    done();
});
