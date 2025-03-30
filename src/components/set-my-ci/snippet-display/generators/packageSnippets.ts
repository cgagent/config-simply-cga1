
/**
 * Generators for package-specific CI snippets
 */

/**
 * Generates npm-specific CI snippets
 */
export const generateNpmSnippet = () => {
  return `
# Configure npm
jfrog npm-config --global

# Install dependencies
npm install

# Publish package (when ready)
jfrog npm publish`;
};

/**
 * Generates Docker-specific CI snippets
 */
export const generateDockerSnippet = () => {
  return `
# Login to JFrog Docker registry
jfrog docker login

# Build and push Docker image
docker build -t your-registry.jfrog.io/your-image:tag .
docker push your-registry.jfrog.io/your-image:tag`;
};

/**
 * Generates Maven-specific CI snippets
 */
export const generateMavenSnippet = () => {
  return `
# Configure Maven
jfrog maven-config --global

# Run Maven with JFrog
jfrog mvn clean install`;
};

/**
 * Generates Python-specific CI snippets
 */
export const generatePythonSnippet = () => {
  return `
# Configure Python pip
jfrog pip-config --global

# Install packages
pip install -r requirements.txt

# Publish package (when ready)
jfrog pip-publish`;
};

/**
 * Generates Go-specific CI snippets
 */
export const generateGoSnippet = () => {
  return `
# Configure Go
jfrog go-config --global

# Get dependencies
jfrog go get

# Build
jfrog go build`;
};

/**
 * Generates NuGet-specific CI snippets
 */
export const generateNugetSnippet = () => {
  return `
# Configure NuGet
jfrog nuget-config --global

# Restore packages
jfrog nuget restore

# Pack and publish (when ready)
jfrog nuget pack
jfrog nuget publish`;
};

/**
 * Combines snippets for selected package managers
 */
export const generatePackageSpecificSnippets = (selectedPackages: string[]) => {
  let snippets = '';
  
  if (selectedPackages.includes('npm')) {
    snippets += generateNpmSnippet();
  }
  
  if (selectedPackages.includes('docker')) {
    snippets += generateDockerSnippet();
  }
  
  if (selectedPackages.includes('maven')) {
    snippets += generateMavenSnippet();
  }
  
  if (selectedPackages.includes('python')) {
    snippets += generatePythonSnippet();
  }
  
  if (selectedPackages.includes('go')) {
    snippets += generateGoSnippet();
  }
  
  if (selectedPackages.includes('nuget')) {
    snippets += generateNugetSnippet();
  }
  
  return snippets;
};
