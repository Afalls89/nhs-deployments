const {
	findDeploymentsToLive,
	timeToLive,
	dateConversion,
	getAverageReleaseTimesByProjectGroup,
	findFailedReleases,
	getFailedReleasesByProjectGroup,
	getLiveDeploymentsForEachDay
} = require("../utils/utils");

const testData = {
	projects: [
		{
			project_id: "9f564a48-e40c-11e9-bc4f-acb57d6c5605",
			project_group: "Spaniel",
			environments: [
				{
					environment: "Integration"
				},
				{
					environment: "Test"
				},
				{
					environment: "Live"
				}
			],
			releases: [
				{
					version: "1.1.1.001",
					deployments: [
						{
							environment: "Integration",
							created: "2019-10-01T06:40:01.000Z",
							state: "Success",
							name: "Deploy to Integration"
						},
						{
							environment: "Test",
							created: "2019-10-02T08:23:58.000Z",
							state: "Success",
							name: "Deploy to Test"
						},
						{
							environment: "Live",
							created: "2019-10-01T09:02:17.000Z",
							state: "Success",
							name: "Deploy to Live"
						}
					]
				},
				{
					version: "1.1.1.002",
					deployments: [
						{
							environment: "Live",
							created: "2019-10-01T06:40:01.000Z",
							state: "Success",
							name: "Deploy to Live"
						},
						{
							environment: "Live",
							created: "2019-10-01T08:23:58.000Z",
							state: "Success",
							name: "Deploy to Live"
						},
						{
							environment: "Live",
							created: "2019-10-02T09:02:17.000Z",
							state: "Success",
							name: "Deploy to Live"
						}
					]
				}
			]
		},
		{
			project_id: "9f564a48-e50c-11e9-bc4f-acb57d6c5605",
			project_group: "retriever",
			environments: [
				{
					environment: "Integration"
				},
				{
					environment: "Test"
				},
				{
					environment: "Live"
				}
			],
			releases: [
				{
					version: "1.1.1.001",
					deployments: [
						{
							environment: "Integration",
							created: "2019-10-01T06:40:01.000Z",
							state: "Success",
							name: "Deploy to Integration"
						},
						{
							environment: "Test",
							created: "2019-10-02T08:23:58.000Z",
							state: "Success",
							name: "Deploy to Test"
						},
						{
							environment: "Live",
							created: "2019-10-01T09:02:17.000Z",
							state: "Success",
							name: "Deploy to Live"
						}
					]
				},
				{
					version: "1.1.1.001",
					deployments: [
						{
							environment: "Integration",
							created: "2019-10-01T06:40:01.000Z",
							state: "Success",
							name: "Deploy to Integration"
						},
						{
							environment: "Test",
							created: "2019-10-02T08:23:58.000Z",
							state: "Success",
							name: "Deploy to Test"
						},
						{
							environment: "Live",
							created: "2019-10-01T09:02:17.000Z",
							state: "Success",
							name: "Deploy to Live"
						}
					]
				},
				{
					version: "1.1.1.002",
					deployments: [
						{
							environment: "Integration",
							created: "2019-10-01T06:40:01.000Z",
							state: "Success",
							name: "Deploy to Live"
						},
						{
							environment: "Test",
							created: "2019-10-01T08:23:58.000Z",
							state: "Success",
							name: "Deploy to Live"
						},
						{
							environment: "Live",
							created: "2019-10-02T09:02:17.000Z",
							state: "Success",
							name: "Deploy to Live"
						}
					]
				}
			]
		},
		{
			project_id: "9f564a48-e50c-11e9-bc4f-acb57d6c5605",
			project_group: "Spaniel2",
			environments: [
				{
					environment: "Integration"
				},
				{
					environment: "Test"
				},
				{
					environment: "Live"
				}
			],
			releases: [
				{
					version: "1.1.1.001",
					deployments: [
						{
							environment: "Integration",
							created: "2019-10-01T06:40:01.000Z",
							state: "Success",
							name: "Deploy to Integration"
						},
						{
							environment: "Test",
							created: "2019-10-02T08:23:58.000Z",
							state: "Success",
							name: "Deploy to Test"
						},
						{
							environment: "Live",
							created: "2019-10-01T09:02:17.000Z",
							state: "Success",
							name: "Deploy to Live"
						}
					]
				},
				{
					version: "1.1.1.001",
					deployments: [
						{
							environment: "Integration",
							created: "2019-10-01T06:40:01.000Z",
							state: "Success",
							name: "Deploy to Integration"
						},
						{
							environment: "Test",
							created: "2019-10-02T08:23:58.000Z",
							state: "Success",
							name: "Deploy to Test"
						},
						{
							environment: "Live",
							created: "2019-10-01T09:02:17.000Z",
							state: "Success",
							name: "Deploy to Live"
						}
					]
				},
				{
					version: "1.1.1.002",
					deployments: [
						{
							environment: "Integration",
							created: "2019-10-01T06:40:01.000Z",
							state: "Success",
							name: "Deploy to Live"
						},
						{
							environment: "Test",
							created: "2019-10-01T08:23:58.000Z",
							state: "Success",
							name: "Deploy to Live"
						},
						{
							environment: "Live",
							created: "2019-10-02T09:02:17.000Z",
							state: "Success",
							name: "Deploy to Live"
						}
					]
				}
			]
		},
		{
			project_id: "9f564a48-e40c-11e9-bc4f-acb57d6c5605",
			project_group: "Spaniel3",
			environments: [
				{
					environment: "Integration"
				},
				{
					environment: "Test"
				},
				{
					environment: "Live"
				}
			],
			releases: [
				{
					version: "1.1.1.001",
					deployments: [
						{
							environment: "Integration",
							created: "2019-10-01T06:40:01.000Z",
							state: "Success",
							name: "Deploy to Integration"
						},
						{
							environment: "Test",
							created: "2019-10-02T08:23:58.000Z",
							state: "Success",
							name: "Deploy to Test"
						},
						{
							environment: "Live",
							created: "2019-10-01T09:02:17.000Z",
							state: "Success",
							name: "Deploy to Live"
						}
					]
				},
				{
					version: "1.1.1.002",
					deployments: [
						{
							environment: "Live",
							created: "2019-10-01T06:40:01.000Z",
							state: "Success",
							name: "Deploy to Live"
						},
						{
							environment: "Live",
							created: "2019-10-01T08:23:58.000Z",
							state: "Success",
							name: "Deploy to Live"
						},
						{
							environment: "Live",
							created: "2019-10-02T09:02:17.000Z",
							state: "Success",
							name: "Deploy to Live"
						}
					]
				},
				{
					version: "1.1.1.001",
					deployments: [
						{
							environment: "Integration",
							created: "2019-10-01T06:40:01.000Z",
							state: "Success",
							name: "Deploy to Integration"
						},
						{
							environment: "Test",
							created: "2019-10-02T08:23:58.000Z",
							state: "Success",
							name: "Deploy to Test"
						},
						{
							environment: "Live",
							created: "2019-10-01T09:02:17.000Z",
							state: "Failed",
							name: "Deploy to Live"
						}
					]
				},
				{
					version: "1.1.1.001",
					deployments: [
						{
							environment: "Integration",
							created: "2019-10-01T06:40:01.000Z",
							state: "Success",
							name: "Deploy to Integration"
						},
						{
							environment: "Test",
							created: "2019-10-02T08:23:58.000Z",
							state: "Success",
							name: "Deploy to Test"
						}
					]
				}
			]
		},
		{
			project_id: "9f564a48-e40c-11e9-bc4f-acb57d6c5605",
			project_group: "Spaniel",
			environments: [
				{
					environment: "Integration"
				},
				{
					environment: "Test"
				},
				{
					environment: "Live"
				}
			],
			releases: [
				{
					version: "1.1.1.001",
					deployments: [
						{
							environment: "Integration",
							created: "2019-10-01T06:40:01.000Z",
							state: "Success",
							name: "Deploy to Integration"
						},
						{
							environment: "Test",
							created: "2019-10-02T08:23:58.000Z",
							state: "Success",
							name: "Deploy to Test"
						},
						{
							environment: "Live",
							created: "2019-10-01T09:02:17.000Z",
							state: "Success",
							name: "Deploy to Live"
						}
					]
				},
				{
					version: "1.1.1.002",
					deployments: [
						{
							environment: "Live",
							created: "2019-10-01T06:40:01.000Z",
							state: "Success",
							name: "Deploy to Live"
						},
						{
							environment: "Live",
							created: "2019-10-01T08:23:58.000Z",
							state: "Success",
							name: "Deploy to Live"
						},
						{
							environment: "Live",
							created: "2019-10-02T09:02:17.000Z",
							state: "Success",
							name: "Deploy to Live"
						}
					]
				}
			]
		},
		{
			project_id: "9f564a48-e50c-11e9-bc4f-acb57d6c5605",
			project_group: "retriever",
			environments: [
				{
					environment: "Integration"
				},
				{
					environment: "Test"
				},
				{
					environment: "Live"
				}
			],
			releases: [
				{
					version: "1.1.1.001",
					deployments: [
						{
							environment: "Integration",
							created: "2019-10-01T06:40:01.000Z",
							state: "Success",
							name: "Deploy to Integration"
						},
						{
							environment: "Test",
							created: "2019-10-02T08:23:58.000Z",
							state: "Success",
							name: "Deploy to Test"
						},
						{
							environment: "Live",
							created: "2019-10-01T09:02:17.000Z",
							state: "Success",
							name: "Deploy to Live"
						}
					]
				},
				{
					version: "1.1.1.002",
					deployments: [
						{
							environment: "Integration",
							created: "2019-10-01T06:40:01.000Z",
							state: "Failed",
							name: "Deploy to integration"
						},
						{
							environment: "Test",
							created: "2019-10-01T08:23:58.000Z",
							state: "Success",
							name: "Deploy to Test"
						},
						{
							environment: "Live",
							created: "2019-10-02T09:02:17.000Z",
							state: "Success",
							name: "Deploy to Live"
						}
					]
				},
				{
					version: "1.1.1.002",
					deployments: [
						{
							environment: "Integration",
							created: "2019-10-01T06:40:01.000Z",
							state: "Success",
							name: "Deploy to integration"
						},
						{
							environment: "Test",
							created: "2019-10-01T08:23:58.000Z",
							state: "Success",
							name: "Deploy to Test"
						},
						{
							environment: "Live",
							created: "2019-10-02T09:02:17.000Z",
							state: "Failed",
							name: "Deploy to Live"
						}
					]
				}
			]
		}
	]
};

describe("findDeploymentsToLive", () => {
	test("finds Deployments to live environment and updates deploymentData object ", () => {
		const deployments = testData.projects[0].releases[1].deployments;

		let deploymentData = {
			Monday: 0,
			Tuesday: 0,
			Wednesday: 0,
			Thursday: 0,
			Friday: 0,
			Saturday: 0,
			Sunday: 0
		};

		findDeploymentsToLive(deployments, deploymentData);

		expect(deploymentData).toEqual({
			Monday: 0,
			Tuesday: 0,
			Wednesday: 2,
			Thursday: 1,
			Friday: 0,
			Saturday: 0,
			Sunday: 0
		});
	});
});

describe("timeToLive", () => {
	test("returns the time between a deployments integration and go Live times", () => {
		const testDeployments = testData.projects[4].releases[0].deployments;
		const testDeployments2 = testData.projects[5].releases[1].deployments;
		const testDeployments3 = testData.projects[5].releases[2].deployments;

		expect(timeToLive(testDeployments)).toBe(142.26666666666668);
		expect(timeToLive(testDeployments2)).toBe("Deployment did not go live");
		expect(timeToLive(testDeployments3)).toBe("Deployment did not go live");
	});
});

describe("getLiveDeploymentsForEachDay", () => {
	test("returns an object with the number of -Deploy to live- deployments in all projects per day", () => {
		expect(getLiveDeploymentsForEachDay(testData)).toEqual({
			Monday: 0,
			Tuesday: 0,
			Wednesday: 15,
			Thursday: 7,
			Friday: 0,
			Saturday: 0,
			Sunday: 0
		});
	});
});

describe("dateConversion", () => {
	test("converts the date format and returns the day of the week", () => {
		const date1 = testData.projects[0].releases[0].deployments[0].created;
		const date2 = testData.projects[0].releases[0].deployments[1].created;

		expect(dateConversion(date1)).toBe("Wednesday");
		expect(dateConversion(date2)).toBe("Thursday");
	});
});

describe("getAverageReleaseTimesByProjectGroup", () => {
	test("to return the release count and average time to live of a given project group", () => {
		expect(
			getAverageReleaseTimesByProjectGroup(testData)["retriever"].releaseCount
		).toBe(3);
		expect(
			getAverageReleaseTimesByProjectGroup(testData)["Spaniel"].releaseCount
		).toBe(2);
		expect(
			getAverageReleaseTimesByProjectGroup(testData)["Spaniel"]
				.averageTimeToLive
		).toBe(284);
	});
});

describe("findFailedReleases", () => {
	test("returns a string denoting whether a deployment fails to go live or not", () => {
		const deployments = testData.projects[3].releases[0].deployments;
		const deployments2 = testData.projects[3].releases[2].deployments;
		const deployments3 = testData.projects[3].releases[3].deployments;

		expect(findFailedReleases(deployments)).toBe("deployment went Live");
		expect(findFailedReleases(deployments2)).toBe("deployment to Live Failed");
		expect(findFailedReleases(deployments3)).toBe("deployment to Live Failed");
	});
});

describe("getFailedReleasesByProjectGroup", () => {
	test("returns an object with project group and failed release count", () => {
		expect(getFailedReleasesByProjectGroup(testData)).toEqual({ Spaniel3: 2 });
	});
});
