const { Parser } = require("json2csv");
const fs = require("file-system");

exports.allLiveDeploymentsForEachDay = data => {
	let deployData = {
		Monday: 0,
		Tuesday: 0,
		Wednesday: 0,
		Thursday: 0,
		Friday: 0,
		Saturday: 0,
		Sunday: 0
	};
	data.projects.forEach(project => {
		project.releases.forEach(release => {
			this.findDTL(release.deployments, deployData);
		});
	});
	return deployData;
};

exports.findDTL = (deployments, deployData) => {
	const DeployToLive = deployments.reduce((deployData, deployment) => {
		if (deployment.environment === "Live") {
			const dayOfTheWeek = this.dateConversion(deployment.created);

			++deployData[dayOfTheWeek];
		}
		return deployData;
	}, deployData);
};

exports.timeToLive = deployments => {
	const duration = deployments.reduce((durationData, deployment) => {
		if (
			deployment.name === "Deploy to Live" &&
			deployment.state === "Success"
		) {
			const date = new Date(deployment.created);
			const dateInMs = date.getTime();
			durationData.liveTime = dateInMs;
		}

		if (
			deployment.name === "Deploy to Integration" &&
			deployment.state === "Success"
		) {
			const date = new Date(deployment.created);
			const dateInMs = date.getTime();
			durationData.integrationTime = dateInMs;
		}
		return durationData;
	}, {});

	if (Object.keys(duration).length > 1) {
		const durationToLive =
			(duration.liveTime - duration.integrationTime) / 60000;

		return durationToLive;
	} else {
		return "Deployment did not go live";
	}
};

exports.dateConversion = date => {
	const dateDeployed = new Date(date);

	const day = dateDeployed.getDay();

	daysOfTheWeek = {
		0: "Monday",
		1: "Tuesday",
		2: "Wednesday",
		3: "Thursday",
		4: "Friday",
		5: "Saturday",
		6: "Sunday"
	};

	const deploymentDay = daysOfTheWeek[day];

	return deploymentDay;
};

exports.formatDeployData = deployData => {
	const daysAndDeployments = Object.entries(deployData);
	formatedDeployData = daysAndDeployments.reduce(
		(formatedData, dayAndCount) => {
			formatedData.push({
				DayOfWeek: dayAndCount[0],
				LiveDeployments: dayAndCount[1]
			});
			return formatedData;
		},
		[]
	);

	return formatedDeployData;
};

exports.averageReleaseTimesByProjectGroup = data => {
	let releaseTime = {};
	data.projects.forEach(project => {
		const project_group = project.project_group;

		const wentLive = project.environments.filter(environment => {
			if (Object.values(environment).includes("Live")) {
				return true;
			}
		});

		if (wentLive.length > 0) {
			project.releases.forEach(release => {
				const durationToLive = this.timeToLive(release.deployments);

				if (typeof durationToLive === "number") {
					if (!releaseTime[project_group]) {
						releaseTime[project_group] = {};
					}
					if (!releaseTime[project_group].time) {
						releaseTime[project_group].time = 0;
					}
					releaseTime[project_group].time += durationToLive;

					if (!releaseTime[project_group].releaseCount) {
						releaseTime[project_group].releaseCount = 0;
					}
					++releaseTime[project_group].releaseCount;
				}
			});
		}

		if (releaseTime[project_group]) {
			if (!releaseTime[project_group].averageTimeToLive) {
				releaseTime[project_group].averageTimeToLive = 0;
			}
			releaseTime[project_group].averageTimeToLive += Math.round(
				releaseTime[project_group].time /
					releaseTime[project_group].releaseCount
			);
		}
	});
	return releaseTime;
};

exports.formatReleaseData = releaseTime => {
	const groupsAndTimes = Object.entries(releaseTime);
	groupsAndTimes.sort(function(a, b) {
		return a[1].averageTimeToLive - b[1].averageTimeToLive;
	});
	groupsAndTimes.reverse();

	const formattedReleaseData = groupsAndTimes.reduce((formattedData, group) => {
		const project = group[0];
		const time = group[1].averageTimeToLive;
		formattedData.push({ ProjectGroup: project, AverageTimeToLive: time });

		return formattedData;
	}, []);
	return formattedReleaseData;
};

exports.createCSV = (content, fields, path) => {
	const json2csvParser = new Parser({ fields });
	const csv = json2csvParser.parse(content);

	fs.writeFile(path, csv);
};

exports.findFailedDeployments = deployments => {
	const haveDeploymentsFailed = deployments.reduce(
		(deploymentData, deployment) => {
			if (
				deployment.name === "Deploy to Live" &&
				deployment.state === "Success"
			) {
				deploymentData.Live = true;
			}

			if (
				deployment.name === "Deploy to Integration" &&
				deployment.state === "Success"
			) {
				deploymentData.integration = true;
			}
			return deploymentData;
		},
		{ integration: false, Live: false }
	);

	if (
		haveDeploymentsFailed.integration === true &&
		haveDeploymentsFailed.Live === false
	) {
		return "deployment to Live Failed";
	} else if (
		haveDeploymentsFailed.integration === true &&
		haveDeploymentsFailed.Live === true
	) {
		return "deployment went Live";
	} else {
		return "integration failed";
	}
};

exports.failedReleasesByProjectGroup = data => {
	let failedReleases = {};
	data.projects.forEach(project => {
		const project_group = project.project_group;
		project.releases.forEach(release => {
			const failedDeployments = this.findFailedDeployments(release.deployments);

			if (failedDeployments === "deployment to Live Failed") {
				if (!failedReleases[project_group]) {
					failedReleases[project_group] = 0;
				}
				++failedReleases[project_group];
			}
		});
	});

	return failedReleases;
};

exports.formatFailedReleases = failedReleases => {
	const groupsAndFailCount = Object.entries(failedReleases);
	groupsAndFailCount.sort(function(a, b) {
		return a[1] - b[1];
	});
	groupsAndFailCount.reverse();

	const formattedFailedDeploymentsData = groupsAndFailCount.reduce(
		(formattedData, group) => {
			const project = group[0];
			const count = group[1];
			formattedData.push({ ProjectGroup: project, FailedReleases: count });

			return formattedData;
		},
		[]
	);
	return formattedFailedDeploymentsData;
};
