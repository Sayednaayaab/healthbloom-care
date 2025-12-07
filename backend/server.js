const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 284,
    experience: "15+ years",
    availability: "Available Today",
    image: "SC",
    slots: ["09:00", "10:00", "14:00", "15:00"],
    online: true
  },
  {
    id: 2,
    name: "Dr. Michael Roberts",
    specialty: "Family Medicine",
    rating: 4.8,
    reviews: 412,
    experience: "12+ years",
    availability: "Available Tomorrow",
    image: "MR",
    slots: ["11:00", "13:00", "16:00"],
    online: false
  },
  {
    id: 3,
    name: "Dr. Priya Sharma",
    specialty: "Dermatologist",
    rating: 5.0,
    reviews: 198,
    experience: "10+ years",
    availability: "Available Today",
    image: "PS",
    slots: ["10:30", "12:00", "15:30"],
    online: true
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Pediatrician",
    rating: 4.9,
    reviews: 356,
    experience: "18+ years",
    availability: "Available Today",
    image: "JW",
    slots: ["08:00", "09:30", "11:00", "14:30"],
    online: false
  },
  {
    id: 5,
    name: "Dr. Emily Davis",
    specialty: "Neurologist",
    rating: 4.7,
    reviews: 223,
    experience: "14+ years",
    availability: "Available Tomorrow",
    image: "ED",
    slots: ["10:00", "13:30", "16:00"],
    online: true
  },
  {
    id: 6,
    name: "Dr. Robert Kim",
    specialty: "Orthopedic Surgeon",
    rating: 4.8,
    reviews: 189,
    experience: "16+ years",
    availability: "Available Today",
    image: "RK",
    slots: ["09:00", "11:30", "14:00"],
    online: false
  }
];

const symptoms = [
  { id: 1, name: "Fever", severity: "medium", remedies: ["Take paracetamol 500mg", "Rest and hydrate"] },
  { id: 2, name: "Headache", severity: "low", remedies: ["Take ibuprofen 400mg", "Apply cold compress"] },
  { id: 3, name: "Chest Pain", severity: "high", remedies: ["Seek immediate medical attention", "Call emergency services"] },
  { id: 4, name: "Joint Pain", severity: "medium", remedies: ["Apply ice pack", "Take anti-inflammatory medication"] },
  { id: 5, name: "Vision Issues", severity: "medium", remedies: ["Rest eyes", "Consult eye specialist"] },
  { id: 6, name: "Breathing Problems", severity: "high", remedies: ["Use inhaler if prescribed", "Seek medical help"] },
  { id: 7, name: "Nausea", severity: "low", remedies: ["Ginger tea", "Anti-nausea medication"] },
  { id: 8, name: "Fatigue", severity: "low", remedies: ["Get adequate sleep", "Stay hydrated"] },
  { id: 9, name: "Dizziness", severity: "medium", remedies: ["Sit down immediately", "Check blood pressure"] },
  { id: 10, name: "Cough", severity: "low", remedies: ["Honey and lemon tea", "Cough syrup"] },
  { id: 11, name: "Sore Throat", severity: "low", remedies: ["Salt water gargle", "Throat lozenges"] },
  { id: 12, name: "Skin Rash", severity: "medium", remedies: ["Avoid irritants", "Use hydrocortisone cream"] },
  { id: 13, name: "Abdominal Pain", severity: "medium", remedies: ["BRAT diet", "Consult doctor if severe"] },
  { id: 14, name: "Back Pain", severity: "medium", remedies: ["Apply heat", "Gentle stretching"] },
  { id: 15, name: "Muscle Pain", severity: "low", remedies: ["Rest affected muscle", "Massage gently"] },
  { id: 16, name: "Swelling", severity: "medium", remedies: ["Elevate affected area", "Compression bandage"] },
  { id: 17, name: "Weight Loss", severity: "medium", remedies: ["Balanced diet", "Consult nutritionist"] },
  { id: 18, name: "Insomnia", severity: "low", remedies: ["Establish sleep routine", "Avoid screens before bed"] },
  { id: 19, name: "Anxiety", severity: "medium", remedies: ["Deep breathing exercises", "Talk to counselor"] },
  { id: 20, name: "Depression", severity: "high", remedies: ["Seek professional help", "Support network"] }
];

const programs = [
  {
    id: 1,
    name: "Weight Loss Program",
    description: "Personalized weight management with nutrition and exercise plans",
    duration: "12 weeks",
    price: "$199"
  },
  {
    id: 2,
    name: "Diabetes Management",
    description: "Comprehensive care for diabetes patients with monitoring and education",
    duration: "Ongoing",
    price: "$149/month"
  },
  {
    id: 3,
    name: "Mental Wellness",
    description: "Stress management, anxiety reduction, and mental health support",
    duration: "8 weeks",
    price: "$129"
  },
  {
    id: 4,
    name: "Heart Health",
    description: "Cardiovascular wellness with diet, exercise, and monitoring",
    duration: "16 weeks",
    price: "$249"
  },
  {
    id: 5,
    name: "Senior Care",
    description: "Comprehensive health management for seniors",
    duration: "Ongoing",
    price: "$179/month"
  }
];

let appointments = [];

// Routes
app.get('/api/doctors', (req, res) => {
  res.json(doctors);
});

app.get('/api/doctors/:id', (req, res) => {
  const doctor = doctors.find(d => d.id === parseInt(req.params.id));
  if (doctor) {
    res.json(doctor);
  } else {
    res.status(404).json({ error: 'Doctor not found' });
  }
});

app.get('/api/online-doctors', (req, res) => {
  const onlineDoctors = doctors.filter(d => d.online);
  res.json(onlineDoctors);
});

app.post('/api/book-appointment', (req, res) => {
  const { doctorId, patientName, email, phone, symptoms, date, time } = req.body;

  const doctor = doctors.find(d => d.id === doctorId);
  if (!doctor) {
    return res.status(404).json({ error: 'Doctor not found' });
  }

  if (!doctor.slots.includes(time)) {
    return res.status(400).json({ error: 'Time slot not available' });
  }

  const appointment = {
    id: uuidv4(),
    doctorId,
    doctorName: doctor.name,
    patientName,
    email,
    phone,
    symptoms,
    date,
    time,
    status: 'confirmed',
    createdAt: new Date()
  };

  appointments.push(appointment);

  // Remove booked slot
  doctor.slots = doctor.slots.filter(slot => slot !== time);

  res.json({
    success: true,
    appointment,
    message: 'Appointment booked successfully!'
  });
});

app.get('/api/symptoms', (req, res) => {
  res.json(symptoms);
});

app.post('/api/symptom-check', (req, res) => {
  const { selectedSymptoms } = req.body;

  if (!selectedSymptoms || selectedSymptoms.length === 0) {
    return res.status(400).json({ error: 'No symptoms selected' });
  }

  const symptomData = symptoms.filter(s => selectedSymptoms.includes(s.name));

  // Simple rule-based analysis
  const highSeverity = symptomData.filter(s => s.severity === 'high');
  const mediumSeverity = symptomData.filter(s => s.severity === 'medium');

  let recommendation = '';
  let severity = 'low';

  if (highSeverity.length > 0) {
    recommendation = 'Please seek immediate medical attention. Call emergency services if symptoms worsen.';
    severity = 'high';
  } else if (mediumSeverity.length > 1) {
    recommendation = 'Consider consulting a healthcare professional soon for proper evaluation.';
    severity = 'medium';
  } else if (mediumSeverity.length === 1) {
    recommendation = 'Monitor your symptoms. Consult a doctor if they persist or worsen.';
    severity = 'medium';
  } else {
    recommendation = 'Your symptoms appear mild. Rest, stay hydrated, and monitor your condition.';
    severity = 'low';
  }

  const remedies = symptomData.flatMap(s => s.remedies);

  res.json({
    severity,
    recommendation,
    remedies: [...new Set(remedies)], // Remove duplicates
    consultDoctor: severity !== 'low'
  });
});

app.get('/api/programs', (req, res) => {
  res.json(programs);
});

app.post('/api/enroll-program', (req, res) => {
  const { programId, name, email } = req.body;

  const program = programs.find(p => p.id === programId);
  if (!program) {
    return res.status(404).json({ error: 'Program not found' });
  }

  // Mock enrollment
  res.json({
    success: true,
    message: `Successfully enrolled in ${program.name}!`,
    enrollmentId: uuidv4()
  });
});

app.post('/api/free-assessment', (req, res) => {
  // Mock assessment quiz results
  const recommendations = [
    "Based on your answers, we recommend our Weight Loss Program",
    "Your responses suggest our Mental Wellness program would be beneficial",
    "Consider our Heart Health program for comprehensive cardiovascular care",
    "Our Diabetes Management program aligns with your health goals"
  ];

  const randomRec = recommendations[Math.floor(Math.random() * recommendations.length)];

  res.json({
    score: Math.floor(Math.random() * 100),
    recommendations: [randomRec],
    programs: programs.slice(0, 2)
  });
});

app.get('/api/user-appointments', (req, res) => {
  // Mock user appointments - in real app, would require authentication
  const userAppointments = appointments.slice(-3); // Last 3 appointments
  res.json(userAppointments);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
