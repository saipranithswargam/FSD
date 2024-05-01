const request = require("supertest");
const { app } = require("../server");
const Patient = require("../models/patients")

jest.mock("../models/patients.js")

describe('patient added', function () {
    afterEach(function () {
        jest.clearAllMocks();
    });

    it('patiend added successfully', function (done) {
        Patient.prototype.save.mockResolvedValueOnce({});
        request(app)
            .post('/patients/register')
            .send({ name: "saipranith", email: "saipranith@gmail.com", mobileNum: "8885816487", password: "test", height: "180", weight: "50", bloodGroup: "B positive", city: "Kanpur", state: "UP", pincode: "500013", age: 21, gender: "male", married: "yes", allergies: "peanut" })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(Patient.prototype.save).toHaveBeenCalled();
                done();
            });
    });

});