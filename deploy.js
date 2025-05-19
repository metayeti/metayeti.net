import ftp from 'vinyl-ftp';
import fs from 'vinyl-fs';
import { config } from 'dotenv';

config();

// Configure the FTP connection with better error handling
const conn = ftp.create({
	host: process.env.FTP_HOST,
	user: process.env.FTP_USER,
	password: process.env.FTP_PASSWORD,
	parallel: 3,         // Reduced parallel connections for stability
	log: console.log,
	timeOffset: 0,       // Ensure proper timestamp comparison
	secure: false,       // Set to true if you need FTPS
	idleTimeout: 10000,  // Increase timeout for better reliability
	reload: true         // Force directory cache reload
});

const localFiles = 'dist/**';
const remotePath = process.env.FTP_REMOTE_PATH;

console.log(`Deploying to: ${process.env.FTP_REMOTE_PATH}`);

function deploy() {
	return fs.src(localFiles, { 
		buffer: true,       // Change to buffer mode for better reliability
		base: 'dist/'       // Set the base to ensure proper path resolution
	})
		// Remove .newer() to ensure all files are uploaded, not just new ones
		.pipe(conn.dest(remotePath))
		.on('error', function(err) {
			console.error('Error during upload:', err);
			process.exit(1);  // Exit with error code
		})
		.on('end', function() {
			console.log('Deploy completed successfully!');
		});
}

// Add error handling for the overall process
try {
	deploy();
} catch (error) {
	console.error('Deploy failed:', error);
	process.exit(1);
}
