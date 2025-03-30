
/**
 * Generators for non-GitHub CI system snippets
 */

/**
 * Generates a generic CI setup for non-GitHub systems
 */
export const generateBasicOtherCISetup = () => {
  return `# Download and install JFrog CLI
curl -fL https://getcli.jfrog.io | sh
export PATH=$PATH:$HOME/.jfrog/jfrog

# Configure JFrog CLI
jfrog c add --url https://your-instance.jfrog.io --user $JFROG_USER --password $JFROG_PASSWORD
jfrog c use your-server-id`;
};

/**
 * Generates npm setup for other CI systems
 */
export const generateNpmOtherCISteps = () => {
  return `
# Configure npm
jfrog npm-config --global

# Install dependencies
npm ci`;
};

/**
 * Generates Docker setup for other CI systems
 */
export const generateDockerOtherCISteps = () => {
  return `
# Login to JFrog Docker registry
jfrog docker login

# Build and push Docker image
docker build -t your-registry.jfrog.io/your-image:tag .
docker push your-registry.jfrog.io/your-image:tag`;
};

/**
 * Generates Maven setup for other CI systems
 */
export const generateMavenOtherCISteps = () => {
  return `
# Configure Maven
jfrog maven-config --global

# Build with Maven
jfrog mvn clean install`;
};

/**
 * Generates Python setup for other CI systems
 */
export const generatePythonOtherCISteps = () => {
  return `
# Configure Python pip
jfrog pip-config --global

# Install dependencies
pip install -r requirements.txt`;
};

/**
 * Generates Go setup for other CI systems
 */
export const generateGoOtherCISteps = () => {
  return `
# Configure Go
jfrog go-config --global

# Get dependencies
jfrog go get

# Build
jfrog go build`;
};

/**
 * Generates NuGet setup for other CI systems
 */
export const generateNuGetOtherCISteps = () => {
  return `
# Configure NuGet
jfrog nuget-config --global

# Restore dependencies
jfrog nuget restore`;
};

/**
 * Maps package type to the appropriate generator function
 */
const packageToGeneratorMap: Record<string, () => string> = {
  'npm': generateNpmOtherCISteps,
  'docker': generateDockerOtherCISteps,
  'maven': generateMavenOtherCISteps,
  'python': generatePythonOtherCISteps,
  'go': generateGoOtherCISteps,
  'nuget': generateNuGetOtherCISteps
};

/**
 * Generates full CI snippet for other CI systems with selected packages
 */
export const generateFullOtherCISnippet = (selectedPackages: string[]) => {
  let snippet = generateBasicOtherCISetup();
  
  selectedPackages.forEach(pkg => {
    if (packageToGeneratorMap[pkg]) {
      snippet += packageToGeneratorMap[pkg]();
    }
  });
  
  return snippet;
};
