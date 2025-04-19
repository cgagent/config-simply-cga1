import { ConversationFlow } from '../../utils/types';
import { CONFIG_PATTERNS } from '../patterns/configPatterns';
import { configResponses } from '../responses/configResponses';

/**
 * Configuration chat conversation flow
 */
export const configFlow: ConversationFlow = {
  id: 'config',
  name: 'Configuration Flow',
  steps: [
    {
      id: 'initial',
      patterns: ['set up', 'configure', 'setup', 'configuration'],
      response: configResponses.initial,
      nextSteps: ['package-manager-selection']
    },
    {
      id: 'package-manager-selection',
      patterns: [...CONFIG_PATTERNS.npm, ...CONFIG_PATTERNS.docker, ...CONFIG_PATTERNS.maven, ...CONFIG_PATTERNS.pypi],
      response: (input: string) => {
        if (CONFIG_PATTERNS.npm.some(pattern => input.toLowerCase().includes(pattern))) {
          return configResponses.npm();
        } else if (CONFIG_PATTERNS.docker.some(pattern => input.toLowerCase().includes(pattern))) {
          return configResponses.docker();
        } else if (CONFIG_PATTERNS.maven.some(pattern => input.toLowerCase().includes(pattern))) {
          return configResponses.maven();
        } else if (CONFIG_PATTERNS.pypi.some(pattern => input.toLowerCase().includes(pattern))) {
          return configResponses.pypi();
        }
        return configResponses.initial;
      },
      nextSteps: ['ci-tool-selection']
    },
    {
      id: 'ci-tool-selection',
      patterns: [...CONFIG_PATTERNS.github, ...CONFIG_PATTERNS.circleci, ...CONFIG_PATTERNS.jenkins, ...CONFIG_PATTERNS.gitlab],
      response: (input: string) => {
        if (CONFIG_PATTERNS.github.some(pattern => input.toLowerCase().includes(pattern))) {
          return configResponses.github();
        } else if (CONFIG_PATTERNS.circleci.some(pattern => input.toLowerCase().includes(pattern))) {
          return configResponses.circleci();
        } else if (CONFIG_PATTERNS.jenkins.some(pattern => input.toLowerCase().includes(pattern))) {
          return configResponses.jenkins();
        } else if (CONFIG_PATTERNS.gitlab.some(pattern => input.toLowerCase().includes(pattern))) {
          return configResponses.gitlab();
        }
        return configResponses.initial;
      },
      nextSteps: ['action-selection']
    },
    {
      id: 'action-selection',
      patterns: [...CONFIG_PATTERNS.merge, ...CONFIG_PATTERNS.abort, ...CONFIG_PATTERNS.viewDiff, ...CONFIG_PATTERNS.checkOnGithub],
      response: (input: string) => {
        if (CONFIG_PATTERNS.merge.some(pattern => input.toLowerCase().includes(pattern))) {
          return configResponses.merge();
        } else if (CONFIG_PATTERNS.abort.some(pattern => input.toLowerCase().includes(pattern))) {
          return configResponses.abort();
        } else if (CONFIG_PATTERNS.viewDiff.some(pattern => input.toLowerCase().includes(pattern))) {
          return configResponses.viewDiff();
        } else if (CONFIG_PATTERNS.checkOnGithub.some(pattern => input.toLowerCase().includes(pattern))) {
          return configResponses.checkOnGithub();
        }
        return configResponses.initial;
      },
      isEndOfFlow: true
    }
  ]
}; 