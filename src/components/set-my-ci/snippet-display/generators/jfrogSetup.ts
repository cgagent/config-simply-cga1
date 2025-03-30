
/**
 * Generators for JFrog setup snippets
 */

/**
 * Generates the JFrog setup snippet based on CI system
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
