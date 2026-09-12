package main

import (
	"fmt"
	"os"
	"os/exec"
	"strings"
)

// Site configuration needed at build time, matching the
// build arguments declared in Dockerfile.
var dockerBuildEnvVars = []string{
	"SITE_ENV",
	"SITE_URL",
	"SITE_AUTHOR",
	"SITE_TITLE",
	"SITE_DESC",
	"SITE_LANG",
	"SITE_TIMEZONE",
	"SITE_REPO",
	"SITE_FEED_TITLE",
	"SITE_FEED_DESC",
	"SITE_FEED_DEFAULT_TITLE",
	"SITE_POSTHOG_ID",
	"SITE_POSTHOG_API_HOST",
	"SITE_POSTHOG_UI_HOST",
}

func TaskDockerBuild() {
	if FsExists(".env") {
		LogInfo("Env file found; using it for build-time site configuration.")
	} else {
		LogInfo("No env file found; using system environment variables for build-time site configuration.")
	}

	args := []string{
		"build",
		"--platform", "linux/amd64",
		"--tag", dockerImageName,
		"--build-arg", "SITE_BUILD_DIR=" + EnvGet("SITE_BUILD_DIR", "build"),
		"--build-arg", "SITE_CONFIG_HASH=" + dockerConfigHash(),
		"--build-arg", "SITE_PUBLIC_DIR=" + EnvGet("SITE_PUBLIC_DIR", "public"),
	}

	// Only pass values that are set, so the Dockerfile defaults still apply.
	for _, varName := range dockerBuildEnvVars {
		if value := EnvGet(varName); value != "" {
			args = append(args, "--build-arg", varName+"="+value)
		}
	}

	args = append(args, "--file", "Dockerfile", ".")

	CmdArgs("docker", args...)

	LogSuccess("Docker build finished.")
}

// Build a hash of the current site configuration. The hash busts the
// build cache when the site configuration changes.
func dockerConfigHash() string {
	var config strings.Builder

	for _, varName := range dockerBuildEnvVars {
		fmt.Fprintf(&config, "%s=%s\n", varName, EnvGet(varName))
	}

	cmd := exec.Command("git", "hash-object", "--stdin")
	cmd.Dir = DirGet()
	cmd.Stdin = strings.NewReader(config.String())

	output, err := cmd.Output()

	if err != nil {
		LogError(err.Error())
		os.Exit(1)
	}

	return strings.TrimSpace(string(output))
}
