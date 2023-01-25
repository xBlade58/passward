# PassWard

## Introduction
PassWard is a simple Desktop Web App for managing and storing credentials. It was developed using Angular (15.0.2) together with Electron (22.0.0).

## Basic Features
In summary, the following features are implemented:
* create, edit and delete a credential
* assign or remove tags while creating/editing credentials
* search for any keyword or filter by multiple tags

The credentials are stored in a [storage.json](src/storage.json), which is prefilled with test data. For encryption and decryption of passwords, we developed a custom, native Node module called [passwardcrypto](passwardcrypto/addon.cc), written in C++. The encryption itself is done using the Caesar cipher. 

## How to start the App
Starting the app is basically the same for all platforms. But depending on the platform, the prerequisites vary, especially due to the build of the C++ module, which was created using [node-gyp](https://www.npmjs.com/package/node-gyp).

### On Windows
For Windows, do the following:

1. Install Node.js 18 (we used 18.13.0).
2. Install one of the following Python versions: v3.7, v3.8, v3.9 v3.10.
3. Install C++ Build Environment: Visual Studio ("Desktop Development with C++" workload) *or* Visaul Studio Build Tools (with "Visual C++ build tools" workload).
4. Run `npm install -g node-gyp`.
5. Navigate to root directory of the project and run `npm install`. This should create a `./passwardcrypto/build` folder.
6. If no such subfolder is created, navigate to `./passwardcrypto` and run `node-gyp configure` and `node-gyp build`. Then run `npm install` on the root folder.
7. As Electron has a different application binary interface form a given Node.js binary, native modules need to be recompiled for Electron. Therefore, you need to run `.\node_modules\.bin\electron-rebuild.cmd` (in the root folder).
8. Run `npm start`. This should open the app.


### On Mac
For macOS, do the following:

1. Install Node.js 18 (we used 18.30.0).
2. Install one of the following Python versions: v3.7, v3.8, v3.9, v3.10
3. Install XCode Command Line Tools, which will install `clang`, `clang++` and `make`. 
   1. Install the XCode Command Line Tools standalone by running xcode-select --install. -- OR --
   2. Alternatively, if you already have the full Xcode installed, you can install the Command Line Tools under the menu Xcode -> Open Developer Tool -> More Developer Tools....
4. Run `npm install -g node-gyp`.
5. Navigate to root directory of the project and run `npm install`. This should create a `./passwardcrypto/build` folder.
6. If no such subfolder is created, navigate to `./passwardcrypto` and run `node-gyp configure` and `node-gyp build`. Then run `npm install` on the root folder.
7. As Electron has a different application binary interface form a given Node.js binary, native modules need to be recompiled for Electron. Therefore, you need to run `.\node_modules\.bin\electron-rebuild.cmd` (in the root folder).
8. Run `npm start`. This should open the app.

If you experience any problems installing node-gyp, please visit https://www.npmjs.com/package/node-gyp (especially if your macOS Catalina is equal to or higher than 10.15).

## How to run Tests
In order to run some UI tests as well as Integration tests for inter-process calls, just execute `npm test`.
The test can be found under [./tests](tests/main.spec.ts). We only tested the Electron part of our application.


## Further Notes
Some points worth mentioning:

* There is a small ["bug"](https://github.com/angular/components/issues/13574) in the [Angular implementation](https://material.angular.io/components/chips/overview#chips-autocomplete) regarding the input field for creating Chips (Tags) together with autocomplete. When adding a Tag while creating a credential, you can search first look at existing Tags. For example, if you type "St" and then select "Streaming" as the Tag, both "St" and "Streaming" will be added into the field. Workarounds for this issue didn't work, so we didn't want to waste much time solving it.
* We didn't prioritize form validation, empty fields may be saved.
* We didn't prioritize designing a pretty or proper UI.
