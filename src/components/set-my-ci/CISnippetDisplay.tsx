
import React, { useMemo, useState } from 'react';
import { CopyIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface CISnippetDisplayProps {
  selectedCI: 'github' | 'other';
  selectedPackages: string[];
  onNextStep: () => void;
  onPreviousStep: () => void;
}

const CISnippetDisplay: React.FC<CISnippetDisplayProps> = ({
  selectedCI,
  selectedPackages,
  onNextStep,
  onPreviousStep
}) => {
  const [showFullSnippet, setShowFullSnippet] = useState(false);
  const { toast } = useToast();
  
  const generateJFrogSetupSnippet = () => {
    if (selectedCI === 'github') {
      return `- name: Setup JFrog
  uses: jfrog/setup-jfrog@v1
  with:
    jfrog-cli-version: latest`;
    } else {
      return `# Download JFrog CLI
curl -fL https://getcli.jfrog.io | sh
# Add JFrog CLI to PATH
export PATH=$PATH:$HOME/.jfrog/jfrog`;
    }
  };

  const generatePackageSpecificSnippets = () => {
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

  const generateFullGitHubSnippet = () => {
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

  const generateFullOtherCISnippet = () => {
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

  const snippets = {
    setup: generateJFrogSetupSnippet(),
    packageSpecific: generatePackageSpecificSnippets(),
    full: selectedCI === 'github' ? generateFullGitHubSnippet() : generateFullOtherCISnippet()
  };

  // Copy to clipboard
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: message,
      });
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Step 3: Configuration Snippet</h2>
      <p className="text-muted-foreground mb-6">
        Here's the code snippet you need to add to your CI configuration. Copy the snippet and integrate it into your workflow.
      </p>
      
      <div className="flex items-center justify-end mb-4">
        <div className="flex items-center space-x-2">
          <Switch 
            id="full-snippet"
            checked={showFullSnippet}
            onCheckedChange={setShowFullSnippet}
          />
          <Label htmlFor="full-snippet">
            Show full workflow file
          </Label>
        </div>
      </div>
      
      {showFullSnippet ? (
        <div className="bg-muted rounded-md p-4">
          <div className="flex justify-between items-center mb-2">
            <Label className="text-sm font-medium">Complete CI configuration file:</Label>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8" 
              onClick={() => copyToClipboard(snippets.full, "Full configuration copied")}
            >
              <CopyIcon className="h-3.5 w-3.5 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="p-4 bg-black text-white rounded-md overflow-x-auto text-sm">
            {snippets.full}
          </pre>
        </div>
      ) : (
        <Tabs defaultValue="setup" className="mt-6">
          <TabsList className="mb-4">
            <TabsTrigger value="setup">JFrog Setup</TabsTrigger>
            <TabsTrigger value="packages">Package Configuration</TabsTrigger>
          </TabsList>
          
          <TabsContent value="setup" className="space-y-4">
            <div className="bg-muted rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-medium">Add this snippet to set up JFrog:</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8" 
                  onClick={() => copyToClipboard(snippets.setup, "Setup snippet copied")}
                >
                  <CopyIcon className="h-3.5 w-3.5 mr-1" />
                  Copy
                </Button>
              </div>
              <pre className="p-4 bg-black text-white rounded-md overflow-x-auto text-sm">
                {snippets.setup}
              </pre>
            </div>
          </TabsContent>
          
          <TabsContent value="packages" className="space-y-4">
            <div className="bg-muted rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-medium">Package-specific configuration:</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8" 
                  onClick={() => copyToClipboard(snippets.packageSpecific, "Package configuration copied")}
                >
                  <CopyIcon className="h-3.5 w-3.5 mr-1" />
                  Copy
                </Button>
              </div>
              <pre className="p-4 bg-black text-white rounded-md overflow-x-auto text-sm">
                {snippets.packageSpecific}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      )}
      
      <div className="mt-8 flex justify-end">
        <Button variant="outline" className="mr-2" onClick={onPreviousStep}>
          Back
        </Button>
        <Button onClick={onNextStep}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default CISnippetDisplay;
