
/**
 * Generators for basic JFrog setup snippets based on CI system
 */

/**
 * Generates a JFrog setup snippet based on the selected CI system
 */
export const generateJFrogSetupSnippet = (selectedCI: 'github' | 'other') => {
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
