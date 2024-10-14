# ICONTACTX - PAY

## Getting Started

For this project we're using [pnpm](https://pnpm.io/es/installation) instead npm. So please first install it.

At the moment of this develop we're using the next packages versions:

-   NodeJS - v21.5.0
-   NPM - v10.2.4
-   PNPM - v8.15.1

```bash
# Install dependencies
pnpm install
```

## RUN DEV
```
pnpm run dev
```

## Deployment
```bash
pnpm run build
```

## Upload S3

### Install AWSCLI
```bash
brew install make
brew install awscli
```

### Configure AWSCLI
```bash
aws configure
aws sts get-caller-identity
```

### Upload
```bash
make all
```
