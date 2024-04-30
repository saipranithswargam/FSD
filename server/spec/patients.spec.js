const request = require('supertest');
const app = require('../app');
describe('POST /patients/login', () => {
    it('should login a patient with valid credentials', async () => {
        const response = await request(app)
            .post('/patients/login')
            .send({ email: '1w@gmail.com', password: 'Sai@061229' });
        expect(response.status).toBe(200);
    });

    it('should return 401 for invalid email or password', async () => {
        const response = await request(app)
            .post('/patients/login')
            .send({ email: 'invalid@email.com', password: 'invalidpassword' });
        expect(response.status).toBe(401);
    });
});
