
/**
 * Generators for GitHub workflow snippets
 */

/**
 * Generates a full GitHub Actions workflow snippet with JFrog integration
 */
export const generateFullGitHubSnippet = (selectedPackages: string[]) => {
  return `name: JFrog CI Integration

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Setup JFrog
        uses: jfrog/setup-jfrog@v1
        with:
          jfrog-cli-version: latest
${selectedPackages.includes('npm') ? `
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Configure npm
        run: jfrog npm-config --global
        
      - name: Install dependencies
        run: npm ci` : ''}
${selectedPackages.includes('docker') ? `
      - name: Login to JFrog Docker registry
        run: jfrog docker login
        
      - name: Build and push Docker image
        run: |
          docker build -t your-registry.jfrog.io/your-image:tag .
          docker push your-registry.jfrog.io/your-image:tag` : ''}
${selectedPackages.includes('maven') ? `
      - name: Setup Java
        uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '17'
          
      - name: Configure Maven
        run: jfrog maven-config --global
        
      - name: Build with Maven
        run: jfrog mvn clean install` : ''}
${selectedPackages.includes('python') ? `
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'
          
      - name: Configure Python pip
        run: jfrog pip-config --global
        
      - name: Install dependencies
        run: pip install -r requirements.txt` : ''}
${selectedPackages.includes('go') ? `
      - name: Setup Go
        uses: actions/setup-go@v4
        with:
          go-version: '1.19'
          
      - name: Configure Go
        run: jfrog go-config --global
        
      - name: Get dependencies
        run: jfrog go get
        
      - name: Build
        run: jfrog go build` : ''}
${selectedPackages.includes('nuget') ? `
      - name: Setup .NET
        uses: actions/setup-dotnet@v3
        with:
          dotnet-version: '6.0.x'
          
      - name: Configure NuGet
        run: jfrog nuget-config --global
        
      - name: Restore dependencies
        run: jfrog nuget restore` : ''}`;
};
