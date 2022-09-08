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
      `gcloud beta billing projects list --billing-account=${process.env.SADA_BILLING_ACCOUNT_ID} --format=json`
    );
    const data = JSON.parse(result);
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

let finalData = [];
async function getComputeList() {
  try {
    return Promise.all(
      projects.map(async (project) => {
        const computeApi = new shell_cmd();
        await computeApi.execCommand(
          `gcloud services enable compute.googleapis.com --project ${project}`
        );
        const start = new shell_cmd();
        const result = await start.execCommand(
          `gcloud compute instances list --project ${project} --format=json`
        );
        const data = JSON.parse(result);
        data.forEach(async (instance) => {
          finalData.push({
            project: project,
            name: instance.name,
            machineType: instance.machineType.split("/").pop(),
            status: instance.status,
            zone: instance.zone.split("/").pop(),
            diskSizeGb: instance.disks.map((object) => object.diskSizeGb),
            diskType: instance.disks.map((obj) => obj.type),
          });
        });
      })
    );
  } catch (error) {
    console.log("**Error querying for instances >>>", error);
    return "Error looking for instance";
  }
}

await getComputeList();
// console.log(finalData);
// Results.map(obj => ({ ...obj, Active: 'false' }))
const test = finalData.map(async (obj) => {
  let stuff;
  await fetch("https://gcpinstances.doit-intl.com/data.json")
    .then((res) => res.text())
    .then((text) => {
      stuff = JSON.parse(text);
    });
  const result = stuff[obj.machineType.split("-")[0]][obj.machineType];
  return ({
    ...obj,
    cpu: result.specs.cores,
    memory: result.specs.memory
  })
});
const results = await Promise.all(test);
// console.log(results);
const options = {
  fieldSeparator: ",",
  quoteStrings: '"',
  decimalSeparator: ".",
  showLabels: true,
  showTitle: true,
  title: "List of Compute Instances",
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true,
};
const csvExporter = new ExportToCsv(options);

const csvData = csvExporter.generateCsv(results, true);
fs.writeFileSync("data.csv", csvData);
