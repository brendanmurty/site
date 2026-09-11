package main

const (
	dockerContainerName = "bcm-site"
	dockerImageName     = "bcm-site:latest"
)

func TaskDockerStop() {
	if _, err := CmdOutput("docker", "container", "inspect", dockerContainerName); err == nil {
		CmdOutput("docker", "stop", dockerContainerName)
		CmdOutput("docker", "rm", dockerContainerName)
	}

	LogSuccess("Docker container stopped.")
}
