const data = require("./input-file/projects.json");
const {
	formatDeploymentData,
	getAverageReleaseTimesByProjectGroup,
	getLiveDeploymentsForEachDay,
	formatReleaseTimeData,
	createCSV,
	getFailedReleasesByProjectGroup,
	formatFailedReleasesData
} = require("./utils/utils");

const deploymentData = getLiveDeploymentsForEachDay(data);

const formattedDeploymentData = formatDeploymentData(deploymentData);

const fieldsDeploymentData = ["DayOfWeek", "LiveDeployments"];

const pathDeploymentData = "./output-files/1_deployment_frequency.csv";

createCSV(formattedDeploymentData, fieldsDeploymentData, pathDeploymentData);

//

const releaseTimeData = getAverageReleaseTimesByProjectGroup(data);

const formattedReleaseTimeData = formatReleaseTimeData(releaseTimeData);

const fieldsReleaseTimeData = ["ProjectGroup", "AverageTimeToLive"];

const pathReleaseTimeData = "./output-files/2_slow_releases.csv";

createCSV(formattedReleaseTimeData, fieldsReleaseTimeData, pathReleaseTimeData);

//

const failedReleasesData = getFailedReleasesByProjectGroup(data);

const formattedFailedReleasesData = formatFailedReleasesData(
	failedReleasesData
);

const fieldsFailedReleasesData = ["ProjectGroup", "FailedReleases"];

const pathFailedReleasesData = "./output-files/3_failing_releases.csv";

createCSV(
	formattedFailedReleasesData,
	fieldsFailedReleasesData,
	pathFailedReleasesData
);
