import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useForm, FormProvider } from 'react-hook-form';

export function createQueryClient() {
  return new QueryClient({ defaultOptions: { queries: { retry: false } } });
}

export function renderWithProviders(ui: React.ReactElement) {
  const client = createQueryClient();
  function FormWrapper({ children }: { children: React.ReactNode }) {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  }

  return render(
    <QueryClientProvider client={client}>
      <FormWrapper>{ui}</FormWrapper>
    </QueryClientProvider>,
  );
}
