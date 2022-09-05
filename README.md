# GCP Compute List Export Tool and migrate to sada billing account id
Export your current compute instances to a CSV format in local directory

This script will extract all the projects and compute instances within those projects and export this data to a .csv format in the same directory 

## Getting Started
Make sure node and gcloud is installed on your system

gcloud - [https://cloud.google.com/sdk/docs/install](https://cloud.google.com/sdk/docs/install)

nodejs - [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

Make sure the USER running this script has sufficient permissions at the organization level to search all assets, enable compute instance etc.

#### 1. Clone the repository and navigate to the directory
```shell
git clone https://github.com/sadasystems/gcp-compute-tool.git
cd gcp-compute-tool
```
#### 2. Authenticate yourself with Google
Install gcloud beta
Make sure this user has sufficient permissions at YOUR ORGANIZATION level IAM
After gcloud init, make sure you select project in the same as the organization
```shell
gcloud components install beta --quiet
gcloud default application login 
gcloud init
```

#### 3. Install all dependencies with clean install
```shell
npm install
```

#### 4. Run Script
```shell
In the .env file, enter the ORGANIZATION ID and BILLING ACCOUNT ID (Only if you are going to migrate projects to sada billing account) 
```

#### 5. Run Script
```shell
node main.js
```

To Migrate projects to billing account 

#### 6. Migrate projects to sada billing account
```shell
node migrateProjectsToSada.js
```
