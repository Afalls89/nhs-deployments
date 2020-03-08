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
