package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	git "github.com/go-git/go-git/v5" // Import the go-git library
)

const envFile = ".env"
const versionFile = "version.txt"
const envExampleFile = ".env.example"

// getGitHash retrieves the short hash of the current Git commit using go-git.
func getGitHash() string {
	repo, err := git.PlainOpen(".")
	if err != nil {
		return "development"
	}
	head, err := repo.Head()
	if err != nil {
		return "development"
	}
	return head.Hash().String()[:7]
}

// incrementVersion increments the version according to the specified rules.
func incrementVersion(currentVersion string) string {
	parts := strings.Split(currentVersion, ".")
	if len(parts) != 3 {
		return "1.0.0"
	}

	major, minor, patch := parts[0], parts[1], parts[2]
	majorInt, _ := strconv.Atoi(major)
	minorInt, _ := strconv.Atoi(minor)
	patchInt, _ := strconv.Atoi(patch)

	if patchInt == 9 {
		if minorInt == 9 {
			majorInt++
			minorInt = 0
			patchInt = 0
		} else {
			minorInt++
			patchInt = 0
		}
	} else {
		patchInt++
	}

	return fmt.Sprintf("%d.%d.%d", majorInt, minorInt, patchInt)
}

// getCurrentTime retrieves the current date and time in the desired format.
func getCurrentTime() string {
	return time.Now().Format("20060102-150405")
}

// readEnvExample reads the .env.example file and returns its content as a map.
func readEnvExample() (map[string]string, error) {
	envVars := make(map[string]string)

	file, err := os.Open(envExampleFile)
	if os.IsNotExist(err) {
		fmt.Println("Warning: .env.example not found. Continuing without example variables.")
		return envVars, nil
	} else if err != nil {
		return nil, err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		if strings.Contains(line, "=") {
			parts := strings.SplitN(line, "=", 2)
			key := parts[0]
			value := parts[1]
			envVars[key] = value
		}
	}
	return envVars, scanner.Err()
}

// readExistingEnv reads the .env file if it exists and returns the existing variables as a map.
func readExistingEnv() ([]string, map[string]string, error) {
	envVars := make(map[string]string)
	lines := []string{}

	file, err := os.Open(envFile)
	if os.IsNotExist(err) {
		return lines, envVars, nil // Return empty map if the file doesn't exist
	} else if err != nil {
		return lines, nil, err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		lines = append(lines, line)

		if strings.Contains(line, "=") {
			parts := strings.SplitN(line, "=", 2)
			key := parts[0]
			value := parts[1]
			envVars[key] = value
		}
	}
	return lines, envVars, scanner.Err()
}

// updateEnvFileInMemory stores the updated content of .env in memory and writes it directly to the .env file.
func updateEnvFileInMemory(version, gitHash, buildDate string) error {
	envVarsExample, err := readEnvExample()
	if err != nil {
		return err
	}

	existingLines, envVarsExisting, err := readExistingEnv()
	if err != nil {
		return err
	}

	var updatedContent strings.Builder

	// Keep existing lines, excluding old version-related variables
	for _, line := range existingLines {
		if strings.HasPrefix(line, "VITE_APP_VERSION=") ||
			strings.HasPrefix(line, "VITE_APP_HASH=") ||
			strings.HasPrefix(line, "VITE_APP_BUILD_DATE=") {
			continue
		}
		updatedContent.WriteString(line + "\n")
	}

	// Add missing variables from .env.example
	for key, value := range envVarsExample {
		if _, exists := envVarsExisting[key]; !exists {
			updatedContent.WriteString(fmt.Sprintf("%s=%s\n", key, value))
		}
	}

	// Add the new versioning variables
	updatedContent.WriteString(fmt.Sprintf("VITE_APP_VERSION=%s\n", version))
	updatedContent.WriteString(fmt.Sprintf("VITE_APP_HASH=%s\n", gitHash))
	updatedContent.WriteString(fmt.Sprintf("VITE_APP_BUILD_DATE=%s\n", buildDate))

	// Write everything back to the .env file
	return os.WriteFile(envFile, []byte(updatedContent.String()), 0644)
}

// readVersionAndHash reads the current version, git hash, and build times from version.txt
func readVersionAndHash() (string, string, string, string) {
	lastVersion := "1.0.0"
	lastGitHash := "development"
	lastBuildTime := ""
	lastBuildTimeGitPush := ""

	if _, err := os.Stat(versionFile); err == nil {
		file, err := os.Open(versionFile)
		if err == nil {
			scanner := bufio.NewScanner(file)
			for scanner.Scan() {
				line := scanner.Text()
				if strings.HasPrefix(line, "initial_version:") {
					lastVersion = strings.TrimSpace(strings.Split(line, ":")[1])
				}
				if strings.HasPrefix(line, "git_hash:") {
					lastGitHash = strings.TrimSpace(strings.Split(line, ":")[1])
				}
				if strings.HasPrefix(line, "last_build_time:") {
					lastBuildTime = strings.TrimSpace(strings.Split(line, ":")[1])
				}
				if strings.HasPrefix(line, "last_build_time_git_push:") {
					lastBuildTimeGitPush = strings.TrimSpace(strings.Split(line, ":")[1])
				}
			}
			file.Close()
		}
	}
	return lastVersion, lastGitHash, lastBuildTime, lastBuildTimeGitPush
}

// saveVersionAndHash saves the version, git hash, and build times into version.txt
func saveVersionAndHash(version, gitHash, buildTime, buildTimeGitPush string) error {
	return os.WriteFile(versionFile, []byte(fmt.Sprintf("initial_version: %s\ngit_hash: %s\nlast_build_time: %s\nlast_build_time_git_push: %s\n", version, gitHash, buildTime, buildTimeGitPush)), 0644)
}

// main function
func main() {
	gitHash := getGitHash()
	currentTime := getCurrentTime()

	// Read the current version, git hash, and build times from version.txt
	lastVersion, lastGitHash, lastBuildTime, lastBuildTimeGitPush := readVersionAndHash()

	fmt.Printf("lastVersion: %s\n", lastVersion)
	fmt.Printf("lastGitHash: %s\n", lastGitHash)
	fmt.Printf("lastBuildTime: %s\n", lastBuildTime)
	fmt.Printf("lastBuildTimeGitPush: %s\n", lastBuildTimeGitPush)

	// Determine the next version; only increment if the git hash has changed
	nextVersion := lastVersion
	buildDateGitPush := lastBuildTimeGitPush // Default to last git push build time

	if gitHash != lastGitHash && gitHash != "development" {
		nextVersion = incrementVersion(lastVersion)
		buildDateGitPush = currentTime // Update last_build_time_git_push because git hash changed
		fmt.Printf("Git hash changed, incrementing version to: %s\n", nextVersion)
	} else {
		fmt.Println("Git hash unchanged, keeping the same version and build date.")
	}

	// Always update last_build_time with the current time (even if git hash doesn't change)
	lastBuildTime = currentTime

	// Save the new version, git hash, and build times into version.txt
	err := saveVersionAndHash(nextVersion, gitHash, lastBuildTime, buildDateGitPush)
	if err != nil {
		fmt.Printf("Error saving version.txt: %s\n", err)
		os.Exit(1)
	}

	// Update the .env file directly in memory and write it at once
	err = updateEnvFileInMemory(nextVersion, gitHash, buildDateGitPush)
	if err != nil {
		fmt.Printf("Error updating .env: %s\n", err)
		os.Exit(1)
	}

	fmt.Println(".env file updated successfully")
}
