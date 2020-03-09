const data = require("./input-file/projects.json");
const {
	formatDeployData,
	averageReleaseTimesByProjectGroup,
	allLiveDeploymentsForEachDay,
	formatReleaseData,
	createCSV
} = require("./utils/utils");

const deployData = allLiveDeploymentsForEachDay(data);

const deploymentData = formatDeployData(deployData);

const fieldsDeployData = ["DayOfWeek", "LiveDeployments"];

const pathDeployData = "./output-files/1_deployment_frequency.csv";

createCSV(deploymentData, fieldsDeployData, pathDeployData);

//

const releaseTime = averageReleaseTimesByProjectGroup(data);

const releaseData = formatReleaseData(releaseTime);

const fieldsReleaseData = ["ProjectGroup", "AverageTimeToLive"];

const pathReleaseData = "./output-files/2_slow_releases.csv";

createCSV(releaseData, fieldsReleaseData, pathReleaseData);
