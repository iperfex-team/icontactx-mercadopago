#!make
all: build update

build:
	pnpm run build

update:
	aws s3 sync dist/ s3://icontactx-ui/  --acl public-read
	aws s3 ls s3://icontactx-ui/
