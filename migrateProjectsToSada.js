import shell_cmd from "./shell_cmd.js";
import { ExportToCsv } from "export-to-csv";
import fs from "fs";
import _ from "lodash";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

let projects = [];
async function checkForProject() {
  try {
    const cloudAssets = new shell_cmd();
    await cloudAssets.execCommand(`gcloud services enable cloudasset.googleapis.com`);
    const start = new shell_cmd();
    const result = await start.execCommand(
      `gcloud beta billing projects list --billing-account=${process.env.OLD_BILLING_ACCOUNT_ID} --format=json`
    );
    const data = JSON.parse(result);
    console.log(data)
    data.forEach((project) => {
      projects.push(project.projectId);
    });
    console.log(projects);
  } catch (error) {
    console.log("**Error querying for projects >>>", error);
    return "Error looking for project";
  }
}

await checkForProject();

async function migrateProjects() {
  try {
    return Promise.all(
      projects.map(async (project) => {
        const config = new shell_cmd();
        await config.execCommand(`gcloud config set project ${project}`);
        const start = new shell_cmd();
        const result = await start.execCommand(
          `gcloud beta billing projects link ${project} --billing-account=${process.env.SADA_BILLING_ACCOUNT_ID}`
        );
        console.log('billing moved', result);
      })
    );
  } catch (error) {
    console.log("**Error querying for projects >>>", error);
    return "Error looking for project";
  }
}

await migrateProjects();