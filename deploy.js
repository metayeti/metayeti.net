import ftp from 'vinyl-ftp';
import fs from 'vinyl-fs';
import { config } from 'dotenv';

config();

// configure the FTP connection
const conn = ftp.create({
	host: process.env.FTP_HOST,
	user: process.env.FTP_USER,
	password: process.env.FTP_PASSWORD,
	parallel: 3,         // reduced parallel connections for stability
	log: console.log,
	timeOffset: 0,       // ensure proper timestamp comparison
	secure: false,       // set to true if you need FTPS
	idleTimeout: 10000,  // increase timeout for better reliability
	reload: true,        // force directory cache reload
	binary: true         // treat all as binary
});

// exclude binary data (only deploy text files)
// (For realiability since binary data arrives corrupted for some reason)
const localFiles = ['dist/**', '!dist/**/*.ico', '!dist/**/*.png', '!dist/**/*.jpg', '!dist/**/*.gif', '!dist/**/*.mp3'];
const remotePath = process.env.FTP_REMOTE_PATH;

console.log(`Deploying to: ${process.env.FTP_REMOTE_PATH}`);

function deploy() {
	return fs.src(localFiles, {
		buffer: true,       // change to buffer mode for better reliability
		base: 'dist/'       // set the base to ensure proper path resolution
	})
		.pipe(conn.dest(remotePath))
		.on('error', function(err) {
			console.error('Error during upload:', err);
			process.exit(1);
		})
		.on('end', function() {
			console.log('Deploy completed successfully!');
			process.exit(0);
		});
}

// add error handling for the overall process
try {
	deploy();
} catch (error) {
	console.error('Deploy failed:', error);
	process.exit(1);
}
