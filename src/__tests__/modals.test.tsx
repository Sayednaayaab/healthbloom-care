import React from 'react';
import { screen, waitFor, fireEvent, within } from '@testing-library/react';
import { BookingModal } from '@/components/modals/BookingModal';
import { SymptomsModal } from '@/components/modals/SymptomsModal';
import { TelehealthModal } from '@/components/modals/TelehealthModal';
import { PatientPortalModal } from '@/components/modals/PatientPortalModal';
import { renderWithProviders } from '@/test-utils';

describe('Modals', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  test('BookingModal loads doctors and progresses to datetime', async () => {
    const mockDoctors = [
      { id: 1, name: 'Dr. Test', specialty: 'Testology', rating: 5, reviews: 10, experience: '5 years', availability: 'Available Today', image: 'DT', slots: ['09:00'] }
    ];

    global.fetch = jest.fn((url) => {
      if (url === '/api/doctors') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(mockDoctors) } as any);
      }
      if (url === '/api/book-appointment') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ success: true, appointment: {} }) } as any);
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) } as any);
    }) as any;

    const onClose = jest.fn();
    renderWithProviders(<BookingModal isOpen={true} onClose={onClose} />);

    // Wait for doctor to appear
    await waitFor(() => expect(screen.getByText(/Choose a Doctor/i)).toBeInTheDocument());
    await screen.findByText(/Dr. Test/);

    // Click doctor card to go to datetime
    fireEvent.click(await screen.findByText(/Dr. Test/));
    await waitFor(() => expect(screen.getByText(/Schedule with/i)).toBeInTheDocument());
  });

  test('SymptomsModal allows selection and posts analysis', async () => {
    global.fetch = jest.fn((url, opts) => {
      if (url === '/api/symptom-check') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ severity: 'high', recommendation: 'Seek help', remedies: ['Rest'], consultDoctor: true }) } as any);
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) } as any);
    }) as any;

    const onClose = jest.fn();
    renderWithProviders(<SymptomsModal isOpen={true} onClose={onClose} />);

    // Select a symptom
    await waitFor(() => expect(screen.getByText(/What symptoms are you experiencing/i)).toBeInTheDocument());
    fireEvent.click(screen.getByText(/Fever/));

    // Click analyze
    fireEvent.click(screen.getByRole('button', { name: /Check My Symptoms/i }));

    await waitFor(() => expect(screen.getByText(/Assessment Results/i)).toBeInTheDocument());
  });

  test('TelehealthModal shows online doctors and can start call flow', async () => {
    const mockOnline = [
      { id: 1, name: 'Dr. Online', specialty: 'OnlineCare', rating: 4.8, reviews: 20, experience: '10 years', image: 'DO', online: true }
    ];

    global.fetch = jest.fn((url) => {
      if (url === '/api/online-doctors') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(mockOnline) } as any);
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) } as any);
    }) as any;

    const onClose = jest.fn();
    renderWithProviders(<TelehealthModal isOpen={true} onClose={onClose} />);

    await waitFor(() => expect(screen.getByText(/Doctors Available Now/i)).toBeInTheDocument());
    await screen.findByText(/Dr. Online/);
    fireEvent.click(await screen.findByText(/Dr. Online/));

    await waitFor(() => expect(screen.getByText(/Ready to connect with Dr. Online/i)).toBeInTheDocument());
  });

  test('PatientPortalModal allows login flow', async () => {
    const onClose = jest.fn();
    renderWithProviders(<PatientPortalModal isOpen={true} onClose={onClose} />);

    // Should show login tab (use role to disambiguate)
    expect(screen.getByRole('tab', { name: /Login/i })).toBeInTheDocument();

    // Fill login inputs and submit (target the dialog submit button)
    const dialog = screen.getByRole('dialog');
    fireEvent.change(within(dialog).getByLabelText(/Email/), { target: { value: 'a@b.com' } });
    fireEvent.change(within(dialog).getByLabelText(/Password/), { target: { value: 'password' } });
    fireEvent.click(within(dialog).getByRole('button', { name: /Login/i }));

    // After login, welcome should appear
    await waitFor(() => expect(screen.getByText(/Welcome back/i)).toBeInTheDocument());
  });
});
