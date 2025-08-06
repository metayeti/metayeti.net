/*

This is the deployment script for metayeti.net.
 
It requires a .env file to be put into root with the following contents:

---

FTP_HOST=ftp_address
FTP_USER=username
FTP_PASSWORD=password
FTP_REMOTE_PATH=/site_root

---

When running `npm run deploy` the site will automatically rebuild first before deploying.
Run `npm run deploy-only` to skip rebuilding.

 */

import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';
import Client from 'ftp';
import { glob } from 'glob';
import { green, yellow } from 'console-log-colors';

config();

// FTP connection config
const ftpConfig = {
	host: process.env.FTP_HOST,
	user: process.env.FTP_USER,
	password: process.env.FTP_PASSWORD,
	connTimeout: 10000,
	pasvTimeout: 10000,
	keepalive: 10000
};

// binary file extensions to explicitly handle in binary mode
const binaryExtensions = ['.ico', '.png', '.jpg', '.jpeg', '.gif', '.mp3', '.pdf', '.zip', '.woff', '.woff2', '.ttf', '.eot', '.svg', '.webp', '.webm'];

// source directory and remote path
const sourceDir = 'dist';
const remotePath = process.env.FTP_REMOTE_PATH;

console.log(`Deploying to: ${remotePath}`);

function isBinaryFile(filePath) {
	// determine if a file is binary based on extension
	const ext = path.extname(filePath).toLowerCase();
	return binaryExtensions.includes(ext);
}

async function ensureRemoteDir(client, remoteDir) {
	// create remote directories recursively
	const parts = remoteDir.split('/').filter(Boolean);
	let currentPath = '';
	
	for (const part of parts) {
		currentPath += '/' + part;
		try {
			await new Promise((resolve, reject) => {
				client.mkdir(currentPath, true, (err) => {
					if (err && err.code !== 550) { // ignore "File exists" errors
						reject(err);
					}
					else {
						resolve();
					}
				});
			});
		} catch (error) {
			console.log(`Note: Directory may already exist: ${currentPath}`);
		}
	}
}

async function getRemoteFileInfo(client, remoteFilePath) {
	// get remote file information (size and modification time)
	return new Promise((resolve, reject) => {
		client.list(remoteFilePath, (err, list) => {
			if (err) {
				// if we get an error, assume the file doesn't exist
				resolve(null);
			}
			else if (list && list.length > 0) {
				resolve({
					size: list[0].size,
					date: list[0].date
				});
			}
			else {
				resolve(null);
			}
		});
	});
}

function shouldUploadFile(localStats, remoteInfo) {
	// skip upload if remote file exists and is newer or same age
	if (!remoteInfo) {
		return true; // remote file doesn't exist, upload it
	}
	
	// compare modification dates
	const localTime = localStats.mtime.getTime();
	const remoteTime = remoteInfo.date.getTime();
	
	if (localTime > remoteTime) {
		return true; // local file is newer, upload it
	}
	else if (localTime === remoteTime && localStats.size !== remoteInfo.size) {
		return true; // same timestamp but different size, upload it
	}
	
	return false; // remote file is up to date, skip upload
}

function uploadFile(client, localFilePath, remoteFilePath, isBinary) {
	// upload a single file
	return new Promise((resolve, reject) => {
		const readStream = fs.createReadStream(localFilePath);
		
		client.put(readStream, remoteFilePath, (err) => {
			if (err) {
				reject(err);
			}
			else {
				console.log(green('Uploaded: ') + `${localFilePath} → ${remoteFilePath} ${isBinary ? green('(binary mode)') : green('(text mode)')}`);
				resolve();
			}
		});
	});
}

async function deploy() {
	const client = new Client();
	let filesProcessed = 0;
	let filesUploaded = 0;
	let filesSkipped = 0;
	
	try {
		// connect to the FTP server
		await new Promise((resolve, reject) => {
			client.on('ready', resolve);
			client.on('error', reject);
			client.connect(ftpConfig);
		});
		
		console.log('\nFTP connection established.\n');
		
		// get all files in the dist directory
		const files = glob.sync(`${sourceDir}/**/*`, { nodir: true });
		
		// process each file
		for (const localFile of files) {
			filesProcessed++;
			const relativeFilePath = path.relative(sourceDir, localFile);
			const remoteFilePath = path.posix.join(remotePath, relativeFilePath.split(path.sep).join('/'));
			const remoteDir = path.posix.dirname(remoteFilePath);
			
			// determine if it's a binary file
			const isBinary = isBinaryFile(localFile);
			
			// get local file stats
			const localStats = fs.statSync(localFile);
			
			// get remote file info if it exists
			const remoteInfo = await getRemoteFileInfo(client, remoteFilePath);
			
			// check if file needs to be uploaded
			if (shouldUploadFile(localStats, remoteInfo)) {
				// set transfer mode
				if (isBinary) {
					client.binary((err) => {
						if (err) console.error(`Error setting binary mode: ${err}`);
					});
				}
				else {
					client.ascii((err) => {
						if (err) console.error(`Error setting ascii mode: ${err}`);
					});
				}
				
				// ensure remote directory exists
				await ensureRemoteDir(client, remoteDir);
				
				// upload the file
				await uploadFile(client, localFile, remoteFilePath, isBinary);
				filesUploaded++;
			}
			else {
				console.log(yellow('Skipped: ') + localFile + yellow(' (unchanged)'));
				filesSkipped++;
			}
		}
		
		console.log(`\nDeploy completed successfully!\n`);
		console.log(`Files processed: ${filesProcessed}`);
		console.log(`Files ${green('uploaded')}: ${filesUploaded}`);
		console.log(`Files ${yellow('skipped')}: ${filesSkipped}`);

	} catch (error) {
		console.error('Deploy failed:', error);
		process.exit(1);
	} finally {
		client.end();
		process.exit(0);
	}
}

deploy();
