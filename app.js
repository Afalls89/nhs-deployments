const data = require("./input-file/projects.json");
const { findDTL } = require("./utils");

console.log(data.projects[0].environments);

console.log(data.projects[0].releases[0].deployments[0].created);

findDTL(deployments);

// const projectsDepLive = projects.filter(project => {
// 	const envirLive = project.environments.filter(environment => {
// 		if (Object.value(environment) === "Live") {
// 			return true;
// 		}
// 	});
// });

//Day of week deployment frequency

// number of deployments to live (successful or unsuccessful)

//sort by day

// written to file  "1_deployment_frequency.csv"

//Projects with slow releases

// separate projects by project groups

//for every project group that doesn't go from integration to Live remove from project group

//for every project capture the duration between the integration time and Live time

// for every project group sum the durations and divide by the number of projects

//written to file "2_slow_release.csv"

//Failing releases

// separate projects by project groups

// extract projects that do not have a Live

module.exports = { findDTL };
