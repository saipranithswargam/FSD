const request = require('supertest');
const app = require('../app');
const Hospitals = require('../models/hospitals')
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

// describe('POST /patients/register', () => {
//     it('should register a new patient with valid data', async () => {
//         //change the mail id to test this feature 
//         const newPatientData = {
//             name: 'John Doe',
//             email: 'johndoe@example.com',
//             password: 'password123',
//             mobileNumber: '1234567890',
//             height: 180,
//             weight: 75,
//             bloodGroup: 'O+',
//             state: 'California',
//             city: 'Los Angeles',
//             pincode: '90001',
//             age: 30,
//             gender: 'male',
//             maritalStatus: 'yes',
//             allergies: "'Pollen', 'Peanuts'"
//         };

//         const response = await request(app)
//             .post('/patients/register')
//             .send(newPatientData);
//         expect(response.status).toBe(200);
//         expect(response.body.message).toEqual('success');
//     });
// });