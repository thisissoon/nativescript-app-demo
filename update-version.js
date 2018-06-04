// @ts-check

(function() {
  const fs = require('fs');
  const pkg = require('./package.json');

  console.log('updating version numbers in AndroidManifest.xml...');

  const versionCodeRegex = /android:versionCode=\".*\"/;
  const versionNameRegex = /android:versionName=\".*\"/;
  const file = 'app/App_Resources/Android/AndroidManifest.xml';

  let manifest = fs.readFileSync(file, 'utf8').toString();
  manifest = manifest.replace(versionNameRegex, `android:versionName="${pkg.version}"`);

  const found = manifest.match(versionCodeRegex);
  const versionCode = parseInt(found[0].split('"')[1], 10) + 1;
  manifest = manifest.replace(versionCodeRegex, `android:versionCode="${versionCode}"`);
  console.log(manifest);

  fs.writeFileSync(file, manifest, 'utf-8');
  console.log('AndroidManifest.xml updated!');
})();
