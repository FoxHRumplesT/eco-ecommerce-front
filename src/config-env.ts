import { writeFile } from 'fs';
require('dotenv').config();
const environment = process.env.ENVIRONMENT;
let LOGO_URL;
const targetPath = `./src/environments/environment.prod.ts`;
const envConfigFile = `
export const environment = { 
    production: true, 
    api: 'https://blitz-dev1.azurewebsites.net',
    blobServer : 'https://blitz-blob.azurewebsites.net'
    logo: '${LOGO_URL}'};`
writeFile(targetPath, envConfigFile, function (err) {
    if (err) {
        console.log(err);
    }
})