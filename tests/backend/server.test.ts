import request from 'supertest';
const app = require('../../backend/server');

describe('Backend API', () => {
  test('GET /api/doctors returns list', async () => {
    const res = await request(app).get('/api/doctors');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('POST /api/book-appointment with valid data succeeds', async () => {
    // get first doctor to obtain available slot
    const doctors = (await request(app).get('/api/doctors')).body;
    const doctor = doctors[0];
    const slot = doctor.slots && doctor.slots[0];
    const payload = {
      doctorId: doctor.id,
      patientName: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
      symptoms: ['Fever'],
      date: '2026-02-14',
      time: slot
    };

    const res = await request(app).post('/api/book-appointment').send(payload);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.appointment).toBeDefined();
  });

  test('POST /api/symptom-check returns recommendation', async () => {
    const res = await request(app).post('/api/symptom-check').send({ selectedSymptoms: ['Chest Pain'] });
    expect(res.status).toBe(200);
    expect(res.body.recommendation).toBeTruthy();
    expect(res.body.severity).toBeDefined();
  });
});
