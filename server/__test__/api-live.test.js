const request = require('supertest')

const { app } = require('../server')
const redisClient = require("../cacheClient/redis-client")
describe('testing api is live', () => {
    test('checking api is live', done => {
        request(app)
            .get("/")
            .then(response => {
                expect(response.statusCode).toBe(200);
                done()
            })
    })
})
afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    redisClient.quit();
    done();
});
