# SOON_ Native App Demo

An example [iOS][ios] and [Android][android] app built with [Angular][angular] and [NativeScript][nativescript]. This repo also includes example build and publishing workflow using [CircleCI][circleci] to the [Google Play Store][play-store] and the [Apple App Store][app-store].

## Getting Started

This guide has been mainly influenced by nativescript docs on how to publish apps to app stores. This article [here][nativescript-publish] in particular is a good guide. This [video][nativescript-video] is also useful for iOS certificates and how they work.

### Clone the repository

To get you started you can simply clone the repository using [git][git] and install the dependencies

```bash
cd path/to/parent/directory
git clone git@github.com:thisissoon/nativescript-app-demo.git --depth 1
cd nativescript-app-demo
```

### Installation

There are three main dependancies you will need to install on your machine first to run and build this project:

* [Node.js][nodejs] - Required to run the [NativeScript CLI][nativescript] and to build the [Angular][angular] bundle.
* [Android SDK][android-studio] - Required to build the native [Android][android] app. You can get this by installing [Android Studio][android-studio]
* [Xcode][xcode] __(OSX only)__ - Required to run and build iOS apps.

Once you have these dependancies installed you can install the [NativeScript CLI][nativescript] globally using [npm][npm] by running:

```bash
npm install -g nativescript@latest
```

Then install local dependancies by running:

```bash
npm install
```

## Development

### Run iOS app (OSX only)

```bash
npm run start:ios
```

Under the hood this simply runs `tns run android`. Nativescript will then:
* Compile and build the iOS app
* Start the iOS simulator
* Install the app on the simulator and launch it
* Watch for changes and relaunch the app

### Run Android app

```bash
npm run start:android
```

Under the hood this simply runs `tns run android`. Nativescript will then:
* Compile and build the Android app
* Start the Android simulator
* Install the app on the simulator and launch it
* Watch for changes and relaunch the app

## Deployment

### Deployment to Apple AppStore

__TODO__


### Deployment to Google Play Store

#### Create a private key for your app

Use the `keytool` tool to create a private key to sign your application with. This key basically is used to prove that you or your company are one's building the app . *Note:* This key must be used to sign all future versions of your app and is not replacable so keep it safe and secure.

Create your key by running the below and follow the prompts:

```bash
keytool -genkey -v -keystore {my-key.jks} -keyalg RSA -keysize 2048 -validity 10000 -alias {my-alias} -keypass {my-secret-password} -storepass {my-secret-password}
```


#### Build first version of your app and sign it

First replace all references of `com.thisissoon.demo` in this project with your own app id. Then build the app and sign it too ready to be published to the play store.

```bash
npm run build:android -- --release --key-store-path <my-key.jks>  --key-store-password <my-secret-password> --key-store-alias <my-alias> --key-store-alias-password <my-secret-password> --copy-to <my-app.apk>
```

#### Create your app in the Play Store

For the first release you'll have to upload your app to the Store manually. After that this can be automated.

Create an account and application in the [Google Play Console][google-play-console]. Then go to **Release_management** > **App_releases**. There you will see some tracks for **production**, **open** and **closed**. For the first release I would recommend choosing a closed track as you can specify excatly who see's your app.

Click the **Manage** > **Create release** and where it says **Android App Bundles and APKs to add** upload your `.apk` file. Fill in the rest of the information and click **Review** and submit your app. This may take a few hours to appear in the app store. Make sure your also fill in the **Store presence** section as that must be done before your app can be published.

#### Publish app through CircleCI

Once your app has been published you can then publish updates using [CircleCI][circleci] using [git][git] tags. [CircleCI][circleci] has been configured to build and publish the app when new tags are pushed to [GitHub][github].

The [CircleCI][circleci] build uses the [Google API Node.js library][google-api-node] to create a new edit and upload and commit the edit to any track you'd like. You'll need to create a [Google developer account][google-api-console] first and create a project for your Play Store apps. Then create a service account to use to authenticate api requests in [CircleCI][circleci].

To create a service account click on *burger menu* > *IAM & Admin* > *Service accounts* > *Create Service Account*. Fill in the fields making sure to check `Furish a new private key` and download the key. *Note:* Keep this private key secure as this will allow anyone to make requests from your Google developer account.

You'll also need to link your [Play Store account][google-play-console] and [Google developer account][google-api-console] by going to the [Google Play console][google-play-console] then click on *Developer account* > *API access* and link the service account.

In [CircleCI][circleci] select your project and click *Start building*. In the project settings you'll need to put in your `key-store-alias` as `KEY_STORE_ALIAS`, `key-store-alias-password` as `KEY_STORE_ALIAS_PASSWORD` and `key-store-password` as `KEY_STORE_PASSWORD` from the private key you used to sign your app in environment variables.

You'll also need to enter your private key from the Google service account as `PLAY_STORE_JWT`. Finally run in terminal run `cat {my-key.jks} | base64` to base64 encode your app's key and enter this into environment variables in [CircleCI][circleci] as `ANDROID_KEY_BASE64`.


#### Making Releases

Run `npm run release` to create a new release. This will use [Standard Version][standard-version] to create a new release. [Standard Version][standard-version] will generate / update the changelog based on commits generated using [Commitizen CLI][commitizen], update the version number following semantic versioning rules and then commit and tag the commit for the release. Simply run `git push --follow-tags origin master` to trigger a new build in [CircleCI][circleci] and publish a new version of your app.

#### Making Commits

This repo uses [Commitizen CLI][commitizen] and [Conventional Changelog][conventional-changelog] to create commits and generate changelogs. Instead of running `git commit` run `git cz` and follow the prompts. Changelogs will then be generated when creating new releases by running `npm run release`.

[circleci]: https://circleci.com/
[android]: https://www.android.com/
[ios]: https://www.apple.com/uk/ios/ios-11/
[angular]: https://angular.io/
[nativescript]: https://www.nativescript.org/
[nativescript-publish]: https://www.nativescript.org/blog/steps-to-publish-your-nativescript-app-to-the-app-stores
[nativescript-video]: https://www.youtube.com/watch?v=5gKuR2UCOnM
[play-store]: https://play.google.com/store
[app-store]: https://www.apple.com/uk/ios/app-store/
[nodejs]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/
[android-studio]: https://developer.android.com/studio/
[git]: http://git-scm.com/
[xcode]: https://developer.apple.com/xcode/
[google-play-console]: https://play.google.com/apps/publish/
[github]: https://github.com/
[commitizen]: http://commitizen.github.io/cz-cli/
[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[conventional-changelog]: https://github.com/conventional-changelog/conventional-changelog
[standard-version]: https://github.com/conventional-changelog/standard-version
[google-api-node]: https://github.com/google/google-api-nodejs-client
[google-api-console]: https://console.developers.google.com/apis/
