# GCP Compute List Export Tool
Export your current compute instances to a CSV format in local directory

This script obtain all the projects and compute instances within those projects and export this data to a .csv format in the same directory 

## Getting Started
Make sure node and gcloud is installed on your system
[https://cloud.google.com/sdk/docs/install](https://cloud.google.com/sdk/docs/install)
[https://nodejs.org/en/download/](https://nodejs.org/en/download/)
#### 1. Clone the repository and navigate to the directory
```shell
git clone https://github.com/sadasystems/gcp-compute-tool.git
cd gcp-compute-tool
```
#### 2. Authenticate yourself with Google
```
gcloud auth login
```

#### 3. Install all dependencies 
```shell
npm install
```

#### 4. Run Script
```shell
node main.js
```
