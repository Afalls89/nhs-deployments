const data = require("./input-file/projects.json");
const { findDTL, formatDeployData, timeToLive } = require("./utils/utils");
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

let releaseTime = {};

const allLiveDeploymentsForEachDay = (data, deployData) => {
	data.projects.forEach(project => {
		project.releases.forEach(release => {
			findDTL(release.deployments, deployData);
		});
	});
};

allLiveDeploymentsForEachDay(data, deployData);

const deploymentData = formatDeployData(deployData);

const fields = ["DayOfWeek", "LiveDeployments"];

const json2csvParser = new Parser({ fields });
const csv = json2csvParser.parse(deploymentData);

// console.log(csv);

// fs.writeFile("./output-files/1_deployment_frequency.csv", csv);

//Projects with slow releases

const averageReleaseTimesByProjectGroup = (data, releaseTime) => {
	data.projects.forEach(project => {
		const wentLive = project.environments.filter(environment => {
			if (Object.values(environment).includes("Live")) {
				return true;
			}
		});

		if (wentLive.length > 0) {
			const project_group = project.project_group;
			releaseTime[project_group] = {};
			project.releases.forEach(release => {
				const durationToLive = timeToLive(release.deployments);

				releaseTime[project.project_group].time += durationToLive;
				releaseTime[project.project_group].releaseCount += 1;
			});
		}
	});

	// console.log(Object.entries(releaseTime));
};

averageReleaseTimesByProjectGroup(data, releaseTime);

// separate projects by project groups

//for every project group that doesn't go from integration to Live remove from project group

//for every project capture the duration between the integration time and Live time

// for every project group sum the durations and divide by the number of projects

//written to file "2_slow_release.csv"

//Failing releases

// separate projects by project groups

// extract projects that do not have a Live

module.exports = {
	findDTL,
	allLiveDeploymentsForEachDay,
	averageReleaseTimesByProjectGroup
};
