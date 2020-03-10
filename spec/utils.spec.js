const { timeToLive } = require("../utils/utils");

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

describe("timeToLive", () => {
	test("returns the time between a deployments integration and go Live", () => {
		const testDeployments = testData.projects[0].releases[0].deployments;
		const testDeployments2 = testData.projects[1].releases[1].deployments;
		const testDeployments3 = testData.projects[1].releases[2].deployments;

		expect(timeToLive(testDeployments)).toBe(8536000);
		expect(timeToLive(testDeployments2)).toBe("Deployment did not go live");
		expect(timeToLive(testDeployments3)).toBe("Deployment did not go live");
	});
});
