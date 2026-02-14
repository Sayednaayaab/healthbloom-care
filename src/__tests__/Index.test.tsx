import React from 'react';
import { screen } from '@testing-library/react';
import Index from '@/pages/Index';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '@/test-utils';

describe('Index Page', () => {
  test('renders main sections and hero headline', () => {
    renderWithProviders(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    // Headline part
    expect(screen.getByText(/Care at Your Fingertips/i)).toBeInTheDocument();

    // CTA button
    expect(screen.getByRole('button', { name: /Book Appointment/i })).toBeInTheDocument();

    // Navbar logo pieces
    expect(screen.getAllByText(/Health/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Bloom/).length).toBeGreaterThan(0);
  });
});
