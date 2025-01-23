# @unlimdev/bunnycdn-storage

[BunnyCDN](https://bunny.net/) EDGE Storage API Client.

# Building
```shell
npm ci
npm run build
```

# Installation

`npm install @unlimdev/bunnycdn-storage --save`

# Usage

To manage resources of StorageZone all request must be authorized.
Module is able to read environment variables or use provided values

The necessary values are:

* Storage Zone Name - the name of zone you created at dash.bunny.net
* API Key - the password value from "FTP & API Access" of Storage Zone
* Region - the code of the primary region configured for the StorageZone, e.g. `ny`, `syd` or empty for default region

## Using Environment Variables

Module reads the following environment variables **if no corresponding values provided**:
* `BUNNY_CDN_STORAGE_ZONE` - the name of the StorageZone to use
* `BUNNY_CDN_API_KEY` - the API key (password) for authorization
* `BUNNY_CDN_REGION` - primary region code for StorageZone

The list of codes for non-default regions listed [here](https://docs.bunny.net/reference/storage-api#storage-endpoints). 

```shell
export BUNNY_CDN_STORAGE_ZONE="my-zone-name"
export BUNNY_CDN_API_KEY="read-write-key-password"
export BUNNY_CDN_REGION="ny" # if not set, defaults to Falkenstein (storage.bunnycdn.com)
```

```js
const { BunnyCDNStorage } = require('@unlimdev/bunnycdn-storage')

const bunnyStorageClient = new BunnyCDNStorage()
```

## Pass Values

```js
const { BunnyCDNStorage } = require('@unlimdev/bunnycdn-storage')

// Specific region (ny.storage.bunnycdn.com), if not provided defaults to Falkenstein (storage.bunnycdn.com)
const bunnyStorageClient = new BunnyCDNStorage('my-storage-zone', 'password', 'ny')
```

## Possible Operations

```js
// list all files in zone / path
const files = await bunnyStorageClient.list();
const filesInDir = await bunnyStorageClient.list('/images');

// upload a file from buffer or filename
bunnyStorageClient.upload('/tmp/bunny.jpg');
bunnyStorageClient.upload(fs.readFileSync('/tmp/bunny.jpg'), 'bunny.jpg')

// download a file from the servers
bunnyStorageClient.download('bunny.jpg'); // Buffer (default)
bunnyStorageClient.download('bunny.jpg', 'arraybuffer'); // Buffer
bunnyStorageClient.download('bunny.jpg', 'stream'); // ReadableStream

// delete a file
bunnyStorageClient.delete('bunny.jpg');
```
# Disclaimer

This repository is **NOT** official BunnyCDN package.

Official packages are listed [here](https://docs.bunny.net/reference/storage-api#api-libraries).
