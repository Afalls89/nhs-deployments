const { findDTL, dateConversion } = require("../utils/utils");

const { allLiveDeploymentsForEachDay } = require("../app.js");

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

		expect(findDTL(deployments, deployData)).toEqual({
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

describe("allLiveDeploymentsForEachDay", () => {
	test("returns the number of -Deploy to live- deployments in all projects", () => {
		let deployData = {
			Monday: 0,
			Tuesday: 0,
			Wednesday: 0,
			Thursday: 0,
			Friday: 0,
			Saturday: 0,
			Sunday: 0
		};

		allLiveDeploymentsForEachDay(testData, deployData);

		expect(deployData).toEqual({
			Monday: 0,
			Tuesday: 0,
			Wednesday: 4,
			Thursday: 2,
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
