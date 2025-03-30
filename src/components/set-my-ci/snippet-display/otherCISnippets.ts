
/**
 * Generators for non-GitHub CI system snippets
 */

/**
 * Generates a full workflow snippet for non-GitHub CI systems with JFrog integration
 */
export const generateFullOtherCISnippet = (selectedPackages: string[]) => {
  return `# Download and install JFrog CLI
curl -fL https://getcli.jfrog.io | sh
export PATH=$PATH:$HOME/.jfrog/jfrog

# Configure JFrog CLI
jfrog c add --url https://your-instance.jfrog.io --user $JFROG_USER --password $JFROG_PASSWORD
jfrog c use your-server-id
${selectedPackages.map(pkg => {
  switch(pkg) {
    case 'npm':
      return `
# Configure npm
jfrog npm-config --global

# Install dependencies
npm ci`;
    case 'docker':
      return `
# Login to JFrog Docker registry
jfrog docker login

# Build and push Docker image
docker build -t your-registry.jfrog.io/your-image:tag .
docker push your-registry.jfrog.io/your-image:tag`;
    case 'maven':
      return `
# Configure Maven
jfrog maven-config --global

# Build with Maven
jfrog mvn clean install`;
    case 'python':
      return `
# Configure Python pip
jfrog pip-config --global

# Install dependencies
pip install -r requirements.txt`;
    case 'go':
      return `
# Configure Go
jfrog go-config --global

# Get dependencies
jfrog go get

# Build
jfrog go build`;
    case 'nuget':
      return `
# Configure NuGet
jfrog nuget-config --global

# Restore dependencies
jfrog nuget restore`;
    default:
      return '';
  }
}).join('\n')}`;
};
