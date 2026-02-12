# HealthBloom - Healthcare Problem Solver Project

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=flat-square&logo=tailwind-css)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

---

## Overview

This project explores solutions to common healthcare challenges through modern web technologies. It demonstrates implementations of features like symptom checking, appointment booking, telehealth consultations, and AI-powered health assistance using React, TypeScript, and Node.js.

---

## Project Objectives

### Key Features Implemented

| Feature | Description | Tech Approach |
|---------|-------------|---------------|
| **AI Symptom Checker** | Interactive symptom analysis tool | React components with state management |
| **Appointment Booking** | Scheduling system with modal interfaces | TypeScript forms and validation |
| **Telehealth Interface** | Video consultation mockup | Responsive UI components |
| **Health Bot (BloomBot)** | Conversational AI assistant | Component-based chat interface |
| **Patient Portal** | User dashboard for health records | Modular React architecture |

### Technical Goals
- Demonstrate scalable frontend architecture with React and TypeScript
- Implement responsive, accessible UI using Tailwind CSS and Radix UI
- Explore backend integration patterns with Node.js
- Showcase modern development workflows with Vite

---

## Tech Stack

### Frontend
- **React 18** - Component-based UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives

### Backend
- **Node.js** - JavaScript runtime for server-side logic
- **Express.js** - Web framework for API endpoints

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Bun** - Fast package manager (alternative to npm)

---

## Getting Started

### Prerequisites
- Node.js 18+
- Modern web browser
- Code editor (VS Code recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/healthbloom/healthbloom-care.git
cd healthbloom-care

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Backend Setup

```bash
cd backend
npm install
npm start
```

---

## Project Structure

```
healthbloom-care/
├── src/
│   ├── components/
│   │   ├── modals/          # Interactive modals (Booking, Symptoms, etc.)
│   │   ├── sections/        # Page sections (Hero, Services, etc.)
│   │   └── ui/              # Reusable UI components
│   ├── pages/               # Main application pages
│   └── hooks/               # Custom React hooks
├── backend/
│   └── server.js            # Node.js backend server
├── public/                  # Static assets
└── package.json             # Project dependencies
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Make your changes
4. Run tests and linting (`npm run lint`)
5. Commit your changes (`git commit -am 'Add new feature'`)
6. Push to the branch (`git push origin feature/new-feature`)
7. Create a Pull Request

### Development Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built as a demonstration of healthcare technology solutions using modern web development practices.**

