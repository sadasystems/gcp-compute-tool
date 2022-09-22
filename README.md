# GCP Compute List Export Tool 
Export your current compute instances to a CSV format in local directory

This script will extract all the projects and compute instances within those projects and export this data to a .csv format in the same directory 

## Demo
<img width="1177" alt="image" src="https://user-images.githubusercontent.com/63981576/191659756-72ea8ab1-f8cb-429b-9faf-a277d4cca0ed.png">


## Getting Started
Make sure node and gcloud is installed on your system

gcloud - [https://cloud.google.com/sdk/docs/install](https://cloud.google.com/sdk/docs/install)

nodejs - [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

## User needs compute.instances.list permission for each project

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
In the .env file, enter the SADA_BILLING_ACCOUNT_ID (Or any billing id that you want to do analysis on)
```

#### 5. Run Script
```shell
node main.js
```

### It will take 1-2 minutes to process through all the projects (be a little patient! :))
