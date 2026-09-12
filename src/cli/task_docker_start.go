package main

import (
	"fmt"
	"os"
	"strconv"
)

// Runtime API configuration forwarded to the container when no
// env file is available, matching the variables read at runtime.
var dockerRuntimeEnvVars = []string{
	"PORT",
	"SITE_ENV",
	"SITE_URL",
	"SITE_AUTHOR",
	"SITE_TITLE",
	"SITE_DESC",
	"SITE_LANG",
	"SITE_TIMEZONE",
	"SITE_REPO",
	"SITE_PORT",
	"SITE_FEED_TITLE",
	"SITE_FEED_DESC",
	"SITE_FEED_DEFAULT_TITLE",
	"SITE_GITHUB_ID",
	"SITE_POSTHOG_ID",
	"SITE_POSTHOG_API_HOST",
	"SITE_POSTHOG_UI_HOST",
}

func TaskDockerStart() {
	TaskDockerStop()

	port := strconv.Itoa(EnvGetPort())

	args := []string{
		"run", "-d",
		"--name", dockerContainerName,
		"--publish", port + ":" + port,
	}

	if FsExists(".env") {
		LogInfo("Env file found, loading vars from it.")
		args = append(args, "--env-file", ".env")
	} else {
		LogInfo("No env file found, relying on system environment vars.")

		for _, varName := range dockerRuntimeEnvVars {
			if EnvGet(varName) != "" {
				args = append(args, "--env", varName)
			}
		}
	}

	args = append(args, dockerImageName)

	containerID, err := CmdOutput("docker", args...)

	if err != nil {
		LogError(fmt.Sprintf("Cmd Error: %s", err.Error()))
		os.Exit(1)
	}

	LogSuccess("Docker container started: " + containerID)
}
