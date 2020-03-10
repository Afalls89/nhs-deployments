const {
	findDTL,
	timeToLive,
	dateConversion,
	averageReleaseTimesByProjectGroup,
	findFailedDeployments,
	failedReleasesByProjectGroup,
	allLiveDeploymentsForEachDay
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

describe("findDTL", () => {
	test("returns the number of live environments in deployments array ", () => {
		const deployments = testData.projects[0].releases[1].deployments;

		let deployData = {
			Monday: 0,
			Tuesday: 0,
			Wednesday: 0,
			Thursday: 0,
			Friday: 0,
			Saturday: 0,
			Sunday: 0
		};

		findDTL(deployments, deployData);

		expect(deployData).toEqual({
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
	test("returns the time between a deployments integration and go Live", () => {
		const testDeployments = testData.projects[4].releases[0].deployments;
		const testDeployments2 = testData.projects[5].releases[1].deployments;
		const testDeployments3 = testData.projects[5].releases[2].deployments;

		expect(timeToLive(testDeployments)).toBe(142.26666666666668);
		expect(timeToLive(testDeployments2)).toBe("Deployment did not go live");
		expect(timeToLive(testDeployments3)).toBe("Deployment did not go live");
	});
});

describe("allLiveDeploymentsForEachDay", () => {
	test("returns the number of -Deploy to live- deployments in all projects", () => {
		expect(allLiveDeploymentsForEachDay(testData)).toEqual({
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
	test("converts the date format", () => {
		const date1 = testData.projects[0].releases[0].deployments[0].created;
		const date2 = testData.projects[0].releases[0].deployments[1].created;

		expect(dateConversion(date1)).toBe("Wednesday");
		expect(dateConversion(date2)).toBe("Thursday");
	});
});

describe("averageReleaseTimesByProjectGroup", () => {
	test("to return the release count of a given project", () => {
		expect(
			averageReleaseTimesByProjectGroup(testData)["retriever"].releaseCount
		).toBe(3);
		expect(
			averageReleaseTimesByProjectGroup(testData)["Spaniel"].releaseCount
		).toBe(2);
		expect(
			averageReleaseTimesByProjectGroup(testData)["Spaniel"].averageTimeToLive
		).toBe(284);
	});
});

describe("findFailedDeployments", () => {
	test("returns true if deployment fails to go live", () => {
		const deployments = testData.projects[3].releases[0].deployments;
		const deployments2 = testData.projects[3].releases[2].deployments;
		const deployments3 = testData.projects[3].releases[3].deployments;

		expect(findFailedDeployments(deployments)).toBe("deployment went Live");
		expect(findFailedDeployments(deployments2)).toBe(
			"deployment to Live Failed"
		);
		expect(findFailedDeployments(deployments3)).toBe(
			"deployment to Live Failed"
		);
	});
});

describe("failedReleasesByProjectGroup", () => {
	test("to return failed deployment count", () => {
		expect(failedReleasesByProjectGroup(testData)).toEqual({ Spaniel3: 2 });
	});
});
