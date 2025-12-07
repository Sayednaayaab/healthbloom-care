# TODO: Enhance Healthcare Website with Functional Modals and Backend

## Information Gathered
- Frontend: React + TypeScript + Vite + Tailwind CSS + shadcn/ui
- Existing sections: ServicesSection, DoctorsSection, SymptomCheckerSection, BloomBot
- Current buttons are non-functional, using DetailDialog for basic info
- No backend present; need to add Node.js/Express server
- Mock data needed for doctors (5-10), symptoms (20+), programs, assessments

## Plan: Detailed Code Update Plan

### Backend Setup
- [ ] Create `backend/` directory with Express server
- [ ] Add API routes: `/api/doctors`, `/api/book-appointment`, `/api/symptoms`, `/api/programs`, `/api/assessment`
- [ ] Add mock data files for doctors, symptoms, programs
- [ ] Implement basic CRUD for appointments (in-memory for now)
- [ ] Add CORS, JSON middleware

### Modal Components
- [x] Create `BookingModal.tsx` - Doctor selection, calendar, form, confirmation
- [x] Create `SymptomsModal.tsx` - Symptom selection, analysis, results
- [x] Create `TelehealthModal.tsx` - Online doctors, video call placeholder
- [x] Create `PatientPortalModal.tsx` - Login, dashboard with appointments
- [ ] Create `ProgramsModal.tsx` - Program cards, enrollment
- [ ] Create `AssessmentModal.tsx` - Quiz questions, results, recommendations

### Frontend Updates
- [x] Update `HeroSection.tsx` - Add onClick handlers to CTA buttons for BookingModal, SymptomsModal, TelehealthModal
- [x] Update `Navbar.tsx` - Add onClick handlers to Patient Portal and Book Now buttons for PatientPortalModal and BookingModal
- [ ] Update `ServicesSection.tsx` - Replace DetailDialog with functional modals for "Get Started" buttons
- [x] Update `DoctorsSection.tsx` - Fix incomplete DetailDialog, add BookingModal and TelehealthModal
- [x] Update `SymptomCheckerSection.tsx` - Enhance assessment dialog with real logic
- [ ] Update `BloomBot.tsx` - Add modal triggers for quick replies and messages
- [ ] Update `WellnessSection.tsx` - Add programs and assessment modals
- [ ] Add global state/context for user sessions, modal management

### Dependencies & Config
- [ ] Update `package.json` - Add backend dependencies (express, cors, etc.)
- [ ] Create `backend/package.json`
- [ ] Add proxy config in Vite for API calls
- [ ] Update `tailwind.config.ts` if needed for new styles

## Dependent Files to be Edited
- `src/components/sections/ServicesSection.tsx`
- `src/components/sections/DoctorsSection.tsx`
- `src/components/sections/SymptomCheckerSection.tsx`
- `src/components/BloomBot.tsx`
- `src/components/sections/WellnessSection.tsx` (if exists)
- `package.json`
- New files: backend/server.js, modals/, mock-data/

## Followup Steps
- [ ] Test all modals and API endpoints
- [ ] Add loading states and error handling
- [ ] Implement real-time features (WebSocket for online status)
- [ ] Add authentication (JWT) for portal
- [ ] Deploy backend separately or integrate
- [ ] Add unit tests for components and API
