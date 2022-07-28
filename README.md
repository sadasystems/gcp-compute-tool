# GCP Compute List Export Tool
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
Make sure this user has sufficient permissions at YOUR ORGANIZATION level IAM
```shell
gcloud auth login
```

#### 3. Install all dependencies with clean install
```shell
npm ci
```

#### 4. Run Script
```shell
In the .env file, enter the ORGANIZATION ID that you want to do analysis on.
```

#### 5. Run Script
```shell
node main.js
```
