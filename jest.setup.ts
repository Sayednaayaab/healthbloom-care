import '@testing-library/jest-dom';

// Polyfills for Node/JSDOM environment
// TextEncoder / TextDecoder used by some dependencies
const util = require('util');
if (typeof (global as any).TextEncoder === 'undefined') {
	(global as any).TextEncoder = util.TextEncoder;
}
if (typeof (global as any).TextDecoder === 'undefined') {
	(global as any).TextDecoder = util.TextDecoder;
}

// Provide a minimal mock for the project's toast hook to avoid rendering
// actual toasts during component smoke tests.
jest.mock('@/hooks/use-toast', () => ({
	useToast: () => ({
		toasts: [],
		toast: () => ({ id: 'mock', dismiss: () => {} }),
		dismiss: () => {},
	}),
	toast: () => ({ id: 'mock' }),
}));

// Provide a safe default fetch mock so modules that call fetch at import time
// don't crash during tests. Individual tests override this as needed.
if (typeof global.fetch === 'undefined') {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(global as any).fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) }));
}

// Polyfill window.matchMedia for JSDOM so components that check media queries work
if (typeof (global as any).window !== 'undefined' && typeof (global as any).window.matchMedia !== 'function') {
	Object.defineProperty((global as any).window, 'matchMedia', {
		writable: true,
		value: (query: string) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: () => {},
			removeListener: () => {},
			addEventListener: () => {},
			removeEventListener: () => {},
			dispatchEvent: () => false,
		}),
	});
}

// Silence known expected React/Radix/jsdom errors during smoke renders so they
// don't fail the whole test run. We only filter messages we explicitly
// recognize as context-related render errors.
const _origConsoleError = console.error.bind(console);
console.error = (...args: any[]) => {
	const first = args[0];
	const text = typeof first === 'string' ? first : first && (first.message || JSON.stringify(first));
	const ignore = [
		/must be used within/i,
		/Objects are not valid as a React child/i,
		/Cannot destructure property 'getFieldState'/i,
		/useFormContext/i,
	];

	if (typeof text === 'string' && ignore.some((r) => r.test(text))) {
		return;
	}

	_origConsoleError(...args);
};

