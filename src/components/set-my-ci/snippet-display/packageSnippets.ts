
/**
 * Generators for package-specific snippets
 */

/**
 * Generates configuration snippets for selected package managers
 */
export const generatePackageSpecificSnippets = (selectedPackages: string[]) => {
  let snippets = '';
  
  if (selectedPackages.includes('npm')) {
    snippets += `
# Configure npm
jfrog npm-config --global

# Install dependencies
npm install

# Publish package (when ready)
jfrog npm publish`;
  }
  
  if (selectedPackages.includes('docker')) {
    snippets += `
# Login to JFrog Docker registry
jfrog docker login

# Build and push Docker image
docker build -t your-registry.jfrog.io/your-image:tag .
docker push your-registry.jfrog.io/your-image:tag`;
  }
  
  if (selectedPackages.includes('maven')) {
    snippets += `
# Configure Maven
jfrog maven-config --global

# Run Maven with JFrog
jfrog mvn clean install`;
  }
  
  if (selectedPackages.includes('python')) {
    snippets += `
# Configure Python pip
jfrog pip-config --global

# Install packages
pip install -r requirements.txt

# Publish package (when ready)
jfrog pip-publish`;
  }
  
  if (selectedPackages.includes('go')) {
    snippets += `
# Configure Go
jfrog go-config --global

# Get dependencies
jfrog go get

# Build
jfrog go build`;
  }
  
  if (selectedPackages.includes('nuget')) {
    snippets += `
# Configure NuGet
jfrog nuget-config --global

# Restore packages
jfrog nuget restore

# Pack and publish (when ready)
jfrog nuget pack
jfrog nuget publish`;
  }
  
  return snippets;
};
