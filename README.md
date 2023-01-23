
* Introduction (electron version usw.)
* How to start (+ node Version 18.30)
* How to execute Tests
* Basic Features/routings

# PassWard

## Introduction
PassWard is a simple Desktop Web App for managing and storing credentials. It was developed using Angular (15.0.2) together with Electron (22.0.0).

## Basic Functionality
In summary, the following features are implemented:
* create, edit and delete a credential
* assign or remove tags while creating/editing credentials
* search for any keyword or filter by multiple tags

The credentials are stored in a [storage.json](src/storage.json), which is prefilled with test data. For encryption and decryption of passwords, we developed a custom, native Node module called [passwardcrypto](passwardcrypto/addon.cc), written in C++. The encryption itself is done using the Caesar cipher. 

## How to start the app


### On Windows

### On Mac

## How to run tests
Run `npx playwright test`

## Further Notes
