import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Navbar } from '@/components/layout/Navbar';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '@/test-utils';

describe('Navbar', () => {
  test('renders brand and links', () => {
    renderWithProviders(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/Health/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Bloom/).length).toBeGreaterThan(0);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Services/i)).toBeInTheDocument();
    expect(screen.getByText(/Doctors/i)).toBeInTheDocument();
  });

  test('mobile menu toggles', () => {
    renderWithProviders(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const button = screen.getByRole('button', { name: /Open menu|Close menu/i });
    fireEvent.click(button);
    // After opening, 'Book Now' should be visible in mobile menu
    expect(screen.getAllByText(/Book Now/i).length).toBeGreaterThan(0);
  });
});
