exports.findDTL = (deployments, deployData) => {
	const DeployToLive = deployments.reduce((deployData, deployment) => {
		if (deployment.environment === "Live") {
			const dayOfTheWeek = this.dateConversion(deployment.created);

			++deployData[dayOfTheWeek];
		}
		return deployData;
	}, deployData);

	return DeployToLive;
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

exports.averageReleaseTimesByProjectGroup = (data, releaseTime) => {
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

		// console.log(releaseTime, "<<<<<<<<<<<<<<<<<<<releaseTime");

		if (releaseTime[project_group]) {
			// console.log(
			// 	releaseTime[project_group].releaseCount,
			// 	"<<<<<<<<<<<<<<<<<releaseCount"
			// );
			// console.log(
			// 	releaseTime[project_group].time,
			// 	">>>>>>>>>>>>>>>>>>>>>> time"
			// );
			if (!releaseTime[project_group].averageTimeToLive) {
				releaseTime[project_group].averageTimeToLive = 0;
			}
			releaseTime[project_group].averageTimeToLive +=
				releaseTime[project_group].time /
				releaseTime[project_group].releaseCount;

			// console.log(
			// 	project_group,
			// 	releaseTime[project_group].releaseCount,
			// 	releaseTime[project_group].averageTimeToLive,
			// 	"<<<<<<<<<<averageTimeToLive"
			// );
		}
	});

	// console.log(Object.entries(releaseTime));
};

exports.formatReleaseData = releaseTime => {
	// console.log(releaseTime);
	const groupsAndTimes = Object.entries(releaseTime);
	// console.log(groupsAndTimes);
	const formattedReleaseData = groupsAndTimes.reduce((formattedData, group) => {
		const key = group[0];
		const value = group[1].averageTimeToLive;
		formattedData.push({ [key]: value });

		return formattedData;
	}, []);

	console.log(formattedReleaseData);
};
