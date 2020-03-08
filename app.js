const data = require("./input-file/projects.json");
const { findDTL, formatDeployData } = require("./utils/utils");
const { Parser } = require("json2csv");
const fs = require("file-system");

const deployments = data.projects[0].releases[2].deployments;

let deployData = {
	Monday: 0,
	Tuesday: 0,
	Wednesday: 0,
	Thursday: 0,
	Friday: 0,
	Saturday: 0,
	Sunday: 0
};

const allLiveDeploymentsForEachDay = (data, deployData) => {
	data.projects.forEach(project => {
		project.releases.forEach(release => {
			findDTL(release.deployments, deployData);
		});
	});
};

allLiveDeploymentsForEachDay(data, deployData);

console.log(deployData);

const deploymentData = formatDeployData(deployData);

console.log(deploymentData);

const fields = ["DayOfWeek", "LiveDeployments"];

const json2csvParser = new Parser({ fields });
const csv = json2csvParser.parse(deploymentData);

console.log(csv);

fs.writeFile("./output-files/1_deployment_frequency.csv", csv);

// written to file  "1_deployment_frequency.csv"

//Projects with slow releases

// separate projects by project groups

//for every project group that doesn't go from integration to Live remove from project group

//for every project capture the duration between the integration time and Live time

// for every project group sum the durations and divide by the number of projects

//written to file "2_slow_release.csv"

//Failing releases

// separate projects by project groups

// extract projects that do not have a Live

module.exports = { findDTL, allLiveDeploymentsForEachDay };
