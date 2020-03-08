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
		1: "Monday",
		2: "Tuesday",
		3: "Wednesday",
		4: "Thursday",
		5: "Friday",
		6: "Saturday",
		7: "Sunday"
	};

	const deploymentDay = daysOfTheWeek[day];

	return deploymentDay;
};
