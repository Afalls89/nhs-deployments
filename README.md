# `NHS deployments data`

This application will extract the following statistical data from a "projects.json" file that is downloaded to the "input-file" folder and output a csv file in the "output-files":

- Day of week deployment frequency

  - Generates the report "1_deployment_frequency.csv" based on the number of deployments to Live (successful or
    unsuccessful).

  - Example output:

    - DayOfWeek,LiveDeployments
    - Monday,<?>
    - Tuesday,<?>
    - Wednesday,<?>
    - Thursday,<?>
    - Friday,<?>
    - Saturday,<?>
    - Sunday,<?>

* Projects with slow releases

  - Generates the report "2_slow_releases.csv based" on the average time taken in minutes for a successful release to go from Integration to Live, grouped by project_group and ordered by the time taken (longest first).

  - Example output:

    - ProjectGroup,AverageTimeToLive
    - Alpha,100000
    - Beta,10000
    - Gamma,1000
    - ...

* Failing releases

  - Generates the report "03_failing_releases.csv" that identifies project groups with the highest number of releases that have a successful deployment to Integration but never have a corresponding successful deployment to Live. The output is ordered by the count (highest first).

  - Example output:

    - ProjectGroup,FailedReleases
    - Beta,100
    - Alpha,20
    - Gamma,10

---

## `Getting Started`

These instructions will provide you with a copy of the project on your local machine for development and testing purposes.

On your local machine using terminal navigate to the directory where you unzipped this repository.
Download the "projects.json" file to the "input-file" folder.

in the terminal type:

```

npm i

```

### `Prerequisites`

Node.js version needs to be v12.10.0 or higher.

---

## `Running the app & tests`

In order to run the application, run the following script:

```
npm run app

```

In order to run utils tests, run the following script:

```

npm run test

```

## `Authors`

- **Andrew Falls** - [Afalls89](https://github.com/Afalls89)
