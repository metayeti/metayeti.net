import ftp from 'vinyl-ftp';
import fs from 'vinyl-fs';
import { config } from 'dotenv';

config();

const conn = ftp.create({
  host: process.env.FTP_HOST,
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  parallel: 5,
  log: console.log
});

const localFiles = 'dist/**';
const remotePath = process.env.FTP_REMOTE_PATH;

console.log(process.env.FTP_REMOTE_PATH);

function deploy() {
  return fs.src(localFiles, { buffer: false })
    .pipe(conn.newer(remotePath))
    .pipe(conn.dest(remotePath));
}

deploy();
