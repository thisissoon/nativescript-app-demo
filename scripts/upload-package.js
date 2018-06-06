// @ts-check

(async function() {
  const { google } = require('googleapis');
  const fs = require('fs');
  const path = require('path');
  // @ts-ignore
  const pkg = require('./package.json');

  console.log('Beginning app publishing');

  const fileName = 'soon-app-demo.apk';
  const filePath = path.join(__dirname, 'dist', fileName);
  const keyPath = path.join(__dirname, 'jwt.json');
  const packageName = 'com.thisissoon.demo';
  const editId = `${new Date().getTime()}`;
  const scopes = 'https://www.googleapis.com/auth/androidpublisher';

  console.log('Logging into Google Play Store...');

  let client;

  try {
    client = await google.auth.getClient({
      keyFile: keyPath,
      scopes
    });
  } catch (e) {
    console.error('There was an error', e.message);
  }

  console.log('Logged into Google Play Store!');

  const play = google.androidpublisher({
    version: 'v2',
    auth: client,
    params: {
      packageName
    }
  });

  const apk = require('fs').readFileSync(filePath);

  try {
    console.log('Creating edit...');

    const edit = await play.edits.insert({
      resource: {
        id: editId,
        expiryTimeSeconds: 600
      }
    });

    console.log('Edit created:', edit.data.id);

    console.log('Uploading apk...');

    const upload = await play.edits.apks.upload({
      editId: edit.data.id,
      media: {
        mimeType: 'application/vnd.android.package-archive',
        body: apk
      }
    });

    console.log(`Apk successfully uploaded: versionCode is ${upload.data.versionCode}`);

    console.log('Updating edit...');

    const update = await play.edits.tracks.update({
      editId: edit.data.id,
      track: 'alpha',
      resource: {
        track: 'alpha',
        versionCodes: [+upload.data.versionCode]
      }
    });

    console.log('Commiting edit...');

    const commit = await play.edits.commit({
      editId: edit.data.id
    });

    console.log('Successfully published app to Google Play Store!');
  } catch (e) {
    console.error('There was an error', e.message);
  }
})();
