exports.findDTL = deployments => {
	const DeployToLive = deployments.reduce((count, deployment) => {
		if (deployment.name === "Deploy to Live") {
			++count;
		}
		return count;
	}, 0);

	return DeployToLive;
};

exports.dateConversion = date => {
	console.log(date);

	const dateDeployed = new Date(date);
	const day = dateDeployed.getDay();

	daysOfTheWeek = {
		1: "monday",
		2: "tuesday",
		3: "wednesday",
		4: "thursday",
		5: "friday",
		6: "saturday",
		7: "sunday"
	};

	const deploymentDay = daysOfTheWeek[day];

	console.log(deploymentDay);

	return deploymentDay;
};
