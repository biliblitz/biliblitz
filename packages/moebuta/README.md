# Moebuta

Main package for the website.

## Build

```bash
yarn build
```

## Deploy & Configuration

Prepare an empty folder with read/write access for storage (such as `/var/moebuta`).

```bash
mkdir /var/moebuta
```

Create a `.env` file.

```conf
MOEBUTA_MONGO_URL=mongodb://127.0.0.1:27017/
MOEBUTA_MONGO_DBNAME=moebuta
MOEBUTA_MOUNT_POINT=/var/moebuta
```
