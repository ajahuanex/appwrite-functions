const sdk = require("node-appwrite");
const path = require("path")

const {google} = require('googleapis');

const KEYFILEPATH = path.join(__dirname, "../assets/key.json");
console.log('keyfile.....:', KEYFILEPATH);
const SCOPES = ['https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.metadata',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive.photos.readonly',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/drive.scripts',
  'https://www.googleapis.com/auth/drive.activity',
  'https://www.googleapis.com/auth/drive.activity.readonly',
  'https://www.googleapis.com/auth/documents'];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
  const client = new sdk.Client();

  const folderId='0AHiqxMoeTuR3Uk9PVA'
  const service = google.drive({
    version: 'v3',
    auth: auth
  });
  const fileMetadata = {
    name: Date.now().toString(),
    mimeType: 'application/vnd.google-apps.folder',
    parents: [folderId]
  };
  var iD='123'

  try {
    const folderExpediente = await service.files.create({
      requestBody: fileMetadata,
      fields: 'id,name',
      supportsAllDrives: true,
    })
     iD = folderExpediente.data.id;
    console.log(iD)
  } catch (error) {
    console.log(error)
  }

  // You can remove services you don't use
  const account = new sdk.Account(client);
  const avatars = new sdk.Avatars(client);
  const database = new sdk.Databases(client);
  const functions = new sdk.Functions(client);
  const health = new sdk.Health(client);
  const locale = new sdk.Locale(client);
  const storage = new sdk.Storage(client);
  const teams = new sdk.Teams(client);
  const users = new sdk.Users(client);

  if (
    !req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
    !req.variables['APPWRITE_FUNCTION_API_KEY']
  ) {
    console.warn("Environment variables are not set. Function cannot use Appwrite SDK.");
  } else {
    client
      .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
      .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
      .setKey(req.variables['APPWRITE_FUNCTION_API_KEY'])
      .setSelfSigned(true);
  }

  res.json({
    areDevelopersAwesome: true,
  });
};
