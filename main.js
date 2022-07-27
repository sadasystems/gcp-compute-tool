import shell_cmd from "./shell_cmd.js";
import { ExportToCsv } from "export-to-csv";
import fs from 'fs';

let projects = [];
async function checkForProject() {
  try {
    const start = new shell_cmd();
    const result = await start.execCommand(
      "gcloud projects list --format=json"
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
async function getComputeList() {
  try {
    projects.forEach(async (project) => {
      const computeApi = new shell_cmd();
      await computeApi.execCommand(`gcloud services enable compute.googleapis.com --project ${project}`)
      const start = new shell_cmd();
      const result = await start.execCommand(
        `gcloud compute instances list --project ${project} --format=json`
      );
      const data = JSON.parse(result);
      const finalResult = data.map((instance) => ({
        project: project,
        name: instance.name,
        machineType: instance.machineType.split("/").pop(),
        status: instance.status,
        zone: instance.zone.split("/").pop(),
      }));
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
      if (finalResult) {
        const csvData = csvExporter.generateCsv(finalResult, true);
        fs.writeFileSync('data.csv',csvData)
      }
    });
  } catch (error) {
    console.log("**Error querying for instances >>>", error);
    return "Error looking for instance";
  }
}

await getComputeList();
