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

	// console.log(duration);
	const durationToLive = duration.liveTime - duration.integrationTime;

	// console.log(durationToLive);

	return durationToLive;
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
