import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	base: './',
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	/* Configure the server to be accessible from external devices
     for testing purposes. */
	server: {
		host: '0.0.0.0', // Listen on all interfaces
		port: 5173, // Default port (optional)
	},
});
