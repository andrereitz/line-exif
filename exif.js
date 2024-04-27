const fs = require('fs');
const { exec } = require('child_process');

let timeStamp = null;
let filepath = null;

if(process.argv[2]) {
  filepath = process.argv[2];
} else {
  console.error('One command line argument is required')
  return;
}

console.log("the file path", filepath)

try {
  const file = fs.readFileSync(`${filepath}.json`, {encoding: 'utf8'})
  const json = JSON.parse(file)
  timeStamp = json.photoTakenTime.timestamp

} catch(err) {
  console.log('Error reading file, check your file name and path!', err);
  return
}

if(!timeStamp) {
  console.error('Metada file has no timestamp field (photo taken time)');
  return
}

const date = new Date(timeStamp * 1000)
const year = date.getUTCFullYear();
const month = String(date.getUTCMonth() + 1).padStart(2, '0');
const day = String(date.getUTCDate()).padStart(2, '0');
const hours = String(date.getUTCHours() % 12) || 12;
const minutes = String(date.getUTCMinutes()).padStart(2, '0');
const seconds = String(date.getUTCSeconds()).padStart(2, '0');
const period = date.getUTCHours() < 12 ? 'AM' : 'PM'

const datestring = `${year}:${month}:${day} ${hours}:${minutes}:${seconds} ${period}`;
console.log(`Date string found in JSON: ${datestring}`)

const command = `exiftool "-AllDates=${datestring}" -TimeZone="UTC" -overwrite_original "${filepath}" -v -m`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing command: ${error}`);
  }
  console.log('===========> exiftool says:')
  if(stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.log(`stdout: ${stdout}`);
});