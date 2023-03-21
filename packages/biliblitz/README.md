# biliblitz

Main package for the website.

## Build

```bash
yarn build
```

## Deploy & Configuration

Prepare an empty folder with read/write access for storage (such as `/var/biliblitz`).

```bash
mkdir /var/biliblitz
```

Create a `.env` file.

```conf
BILIBLITZ_MONGO_URL=mongodb://127.0.0.1:27017/
BILIBLITZ_MONGO_DBNAME=biliblitz
BILIBLITZ_MOUNT_POINT=/var/biliblitz
```
