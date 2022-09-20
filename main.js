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
    const start = new shell_cmd();
    const result = await start.execCommand(
      `gcloud beta billing projects list --billing-account=${process.env.SADA_BILLING_ACCOUNT_ID} --format=json`
    );
    const data = JSON.parse(result);
    data.forEach((project) => {
      projects.push(project.projectId);
    });
  } catch (error) {
    console.log("**Error querying for projects >>>", error);
    return "Error looking for project";
  }
}

await checkForProject();
console.log("project", projects);

let finalData = [];

async function getComputeList() {
  try {
    const results = projects.map(async (project) => {
      // console.log("project", project);
      const start = new shell_cmd();
      const result = await start.execCommand(
        `gcloud compute instances list --project ${project} --format=json`
      );
      const data = JSON.parse(result);
      // console.log("data", data);
      data.forEach((instance) => {
        finalData.push({
          project: project,
          name: instance.name,
          machineType: instance.machineType.split("/").pop(),
          status: instance.status,
          zone: instance.zone.split("/").pop(),
          diskSizeGb: (instance.disks.map((object) => object.diskSizeGb)).toString(),
          diskType: (instance.disks.map((obj) => obj.type)).toString(),
        });
      });
      // console.log(finalData);
      // await parseTOCSV();
    });
    return await Promise.all(results);
  } catch (error) {
    console.log("**Error querying for instances >>>", error);
    return "Error looking for instance";
  }
}

await getComputeList();
console.log(" final data", finalData);

async function parseTOCSV() {
  const test = finalData.map(async (obj) => {
    console.log("entering map", obj);
    let stuff;
    await fetch("https://gcpinstances.doit-intl.com/data.json")
      .then((res) => res.text())
      .then((text) => {
        stuff = JSON.parse(text);
      });
    const result = stuff[obj.machineType.split("-")[0]][obj.machineType];
    return {
      ...obj,
      cpu: result.specs.cores,
      memory: result.specs.memory,
    };
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
}

await parseTOCSV();
