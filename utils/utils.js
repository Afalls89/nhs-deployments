exports.findDTL = deployments => {
	const DeployToLive = deployments.reduce((count, deployment) => {
		if (deployment.name === "Deploy to Live") {
			++count;
		}
		return count;
	}, 0);

	return DeployToLive;
};
