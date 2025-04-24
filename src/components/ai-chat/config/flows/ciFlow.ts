import { ConversationFlow } from '../../utils/types';
import { ChatOption } from '@/components/shared/types';

// Export the flow ID for reference in other components
export const CI_FLOW_ID = 'ci-configuration';

// Define selectable options for CI tools
const ciToolOptions: ChatOption[] = [
  { id: 'ci-github', label: 'GitHub Actions', value: 'GitHub Actions' },
  { id: 'ci-jenkins', label: 'Jenkins', value: 'Jenkins' },
  { id: 'ci-gitlab', label: 'GitLab CI', value: 'GitLab CI' },
  { id: 'ci-circle', label: 'CircleCI', value: 'CircleCI' }
];

// Define selectable options for package managers
const packageManagerOptions: ChatOption[] = [
  { id: 'pm-npm', label: 'npm', value: 'npm' },
  { id: 'pm-maven', label: 'Maven', value: 'Maven' },
  { id: 'pm-gradle', label: 'Gradle', value: 'Gradle' }
];

// Create and export the CI flow
export const ciFlow: ConversationFlow = {
  id: CI_FLOW_ID,
  name: 'CI Configuration Flow',
  steps: [
    {
      id: 'ci-init',
      patterns: [
        'ci configuration',
        'setup ci',
        'configure ci',
        'ci integration',
        'continuous integration'
      ],
      response: "I can help you set up CI configuration to secure your packages. Which CI tool would you like to set up?",
      actionOptions: ciToolOptions,
      nextSteps: ['ci-package-manager']
    },
    {
      id: 'ci-package-manager',
      patterns: [
        'GitHub Actions', 'Jenkins', 'GitLab CI', 'CircleCI'
      ],
      response: (input: string) => {
        return `I'll help you configure ${input} for your project. Which package manager are you using?`;
      },
      actionOptions: packageManagerOptions,
      nextSteps: ['ci-confirmation']
    },
    {
      id: 'ci-confirmation',
      patterns: [
        'npm', 'Maven', 'Gradle'
      ],
      response: (input: string) => {
        return `I'll generate a configuration example for you using ${input}. Would you like me to show it now?`;
      },
      actionOptions: [
        { id: 'confirm-yes', label: 'Yes, show example', value: 'Yes' },
        { id: 'confirm-no', label: 'No, thanks', value: 'No' }
      ],
      nextSteps: ['ci-generate', 'ci-cancel']
    },
    {
      id: 'ci-generate',
      patterns: [
        'yes', 'show', 'example'
      ],
      response: "Here's an example CI configuration with JFrog integration that includes security scanning:\n\n```yaml\nname: Build and Scan\n\non:\n  push:\n    branches: [ main ]\n  pull_request:\n    branches: [ main ]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - name: Set up environment\n        uses: actions/setup-node@v3\n        with:\n          node-version: 16\n          \n      - name: Configure JFrog CLI\n        uses: jfrog/setup-jfrog-cli@v3\n        env:\n          JF_URL: ${{ secrets.JF_URL }}\n          JF_ACCESS_TOKEN: ${{ secrets.JF_ACCESS_TOKEN }}\n          \n      - name: Install dependencies\n        run: npm ci\n        \n      - name: Build\n        run: npm run build\n        \n      - name: Scan for vulnerabilities\n        run: jf scan\n```",
      isEndOfFlow: true
    },
    {
      id: 'ci-cancel',
      patterns: [
        'no', 'cancel', 'thanks'
      ],
      response: "No problem. If you'd like to see CI configuration examples in the future, just ask.",
      isEndOfFlow: true
    }
  ]
}; 