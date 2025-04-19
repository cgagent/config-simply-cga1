import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMessageHandler } from '../hooks/useMessageHandler';
import { getRandomResponse, getCurrentActionOptions, simulateAIResponse } from '../utils/aiResponseUtils';
import { generateSecurityRemediationResponse } from '../config/responses/securityResponses';
import { 
  RELEASE_PACKAGE_NAME_ACTIONS, 
  BRANCH_SELECTION_ACTIONS, 
  ENVIRONMENT_SELECTION_ACTIONS,
  RELEASE_TYPE_SELECTION_ACTIONS,
  branchSelectionOptions,
  environmentSelectionOptions,
  releaseTypeSelectionOptions
} from '../config/constants/releaseConstants';
import { MessageFactory } from '../utils/messageFactory';

// Mock the dependencies
vi.mock('../utils/aiResponseUtils', () => ({
  getRandomResponse: vi.fn().mockReturnValue('Mocked response'),
  getCurrentActionOptions: vi.fn().mockReturnValue(null),
  simulateAIResponse: vi.fn().mockReturnValue('Mocked response'),
}));

vi.mock('../config/responses/securityResponses', () => ({
  generateSecurityRemediationResponse: vi.fn().mockReturnValue('Security remediation response'),
  securityRiskResponses: {
    identifyRisk: 'Security risk identified',
    remediationActionSelection: 'Select a remediation action',
  },
}));

vi.mock('@/hooks/use-toast', () => ({
  useToast: vi.fn().mockReturnValue({
    toast: vi.fn(),
  }),
}));

// Mock MessageFactory
vi.mock('../utils/messageFactory', () => ({
  MessageFactory: {
    createActionOptionsMessage: vi.fn().mockReturnValue({
      id: 'action-options-message',
      content: 'Action options message',
      options: [],
      type: 'action-options',
    }),
  },
}));

// Mock setTimeout to execute immediately
vi.useFakeTimers();

// Create mock functions for useMessageState
const mockState = {
  addUserMessage: vi.fn(),
  addBotMessage: vi.fn(),
  messages: [],
  isProcessing: false,
  setIsProcessing: vi.fn(),
  inputValue: '',
  setInputValue: vi.fn(),
  resetMessages: vi.fn(),
};

vi.mock('../hooks/useMessageState', () => ({
  useMessageState: () => mockState,
}));

// Mock the conversation flows
vi.mock('../config/flows', () => ({
  conversationFlows: [
    {
      id: 'release',
      name: 'Release Flow',
      steps: [
        {
          id: 'initial',
          patterns: ['release', 'new package'],
          response: "I'll help you release a new package. Let's start by gathering some information about your package. What's the name of your package?",
          nextSteps: ['package-details'],
        },
        {
          id: 'package-details',
          patterns: ['shared-components', 'frontend-app', 'backend-api'],
          response: "Which branch should we release from?",
          nextSteps: ['branch-selection'],
        },
        {
          id: 'branch-selection',
          patterns: ['main', 'develop', 'feature'],
          response: "Which environment should we release to? (dev/staging/prod)",
          nextSteps: ['environment-selection'],
        },
      ],
    },
  ],
}));

describe('useMessageHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockState.addUserMessage.mockClear();
    mockState.addBotMessage.mockClear();
  });

  it('handles release flow options correctly', async () => {
    // Create a release flow option
    const releaseOption = {
      id: RELEASE_PACKAGE_NAME_ACTIONS.FRONTEND,
      label: 'Frontend App',
      value: 'frontend-app',
    };

    // Render the hook
    const { result } = renderHook(() => useMessageHandler());

    // Call handleSecurityRemediation with the release option
    await act(async () => {
      result.current.handleSecurityRemediation(releaseOption);
      // Fast-forward timers to execute setTimeout
      vi.runAllTimers();
    });

    // Check that simulateAIResponse was called with the option value
    expect(simulateAIResponse).toHaveBeenCalledWith(releaseOption.value);
    
    // Check that MessageFactory.createActionOptionsMessage was called with the correct parameters
    expect(MessageFactory.createActionOptionsMessage).toHaveBeenCalledWith(
      "Which branch should we release from?",
      branchSelectionOptions
    );
    
    // Check that getRandomResponse was not called (we're using the mocked flow response)
    expect(getRandomResponse).not.toHaveBeenCalled();
    
    // Check that generateSecurityRemediationResponse was not called
    expect(generateSecurityRemediationResponse).not.toHaveBeenCalled();
  });

  it('handles branch selection options correctly', async () => {
    // Create a branch selection option
    const branchOption = {
      id: BRANCH_SELECTION_ACTIONS.MAIN,
      label: 'Main',
      value: 'main',
    };

    // Render the hook
    const { result } = renderHook(() => useMessageHandler());

    // Call handleSecurityRemediation with the branch option
    await act(async () => {
      result.current.handleSecurityRemediation(branchOption);
      // Fast-forward timers to execute setTimeout
      vi.runAllTimers();
    });

    // Check that simulateAIResponse was called with the option value
    expect(simulateAIResponse).toHaveBeenCalledWith(branchOption.value);
    
    // Check that MessageFactory.createActionOptionsMessage was called with the correct parameters
    expect(MessageFactory.createActionOptionsMessage).toHaveBeenCalledWith(
      "Which environment should we release to?",
      environmentSelectionOptions
    );
    
    // Check that getRandomResponse was not called (we're using the mocked flow response)
    expect(getRandomResponse).not.toHaveBeenCalled();
    
    // Check that generateSecurityRemediationResponse was not called
    expect(generateSecurityRemediationResponse).not.toHaveBeenCalled();
  });

  it('handles security remediation options correctly', async () => {
    // Create a security remediation option
    const securityOption = {
      id: 'git',
      label: 'Create Git Issue',
      value: 'I want to create a git issue for this vulnerability',
    };

    // Render the hook
    const { result } = renderHook(() => useMessageHandler());

    // Call handleSecurityRemediation with the security option
    await act(async () => {
      result.current.handleSecurityRemediation(securityOption);
      // Fast-forward timers to execute setTimeout
      vi.runAllTimers();
    });

    // Check that generateSecurityRemediationResponse was called with the option id
    expect(generateSecurityRemediationResponse).toHaveBeenCalledWith('git');
    
    // Check that getRandomResponse was not called
    expect(getRandomResponse).not.toHaveBeenCalled();
  });

  it('displays branch selection options after selecting a package name', async () => {
    // Create a release flow option
    const releaseOption = {
      id: RELEASE_PACKAGE_NAME_ACTIONS.FRONTEND,
      label: 'Frontend App',
      value: 'frontend-app',
    };

    // Render the hook
    const { result } = renderHook(() => useMessageHandler());

    // Call handleSecurityRemediation with the release option
    await act(async () => {
      result.current.handleSecurityRemediation(releaseOption);
      // Fast-forward timers to execute setTimeout
      vi.runAllTimers();
    });

    // Check that simulateAIResponse was called with the option value
    expect(simulateAIResponse).toHaveBeenCalledWith(releaseOption.value);
    
    // Check that MessageFactory.createActionOptionsMessage was called with the correct parameters
    expect(MessageFactory.createActionOptionsMessage).toHaveBeenCalledWith(
      "Which branch should we release from?",
      branchSelectionOptions
    );
    
    // Check that addBotMessage was called with the action options message
    expect(mockState.addBotMessage).toHaveBeenCalledWith({
      id: 'action-options-message',
      content: 'Action options message',
      options: [],
      type: 'action-options',
    });
  });

  it('handles environment selection options correctly', async () => {
    // Create an environment selection option
    const envOption = {
      id: ENVIRONMENT_SELECTION_ACTIONS.DEV,
      label: 'Development',
      value: 'dev',
    };

    // Render the hook
    const { result } = renderHook(() => useMessageHandler());

    // Call handleSecurityRemediation with the environment option
    await act(async () => {
      result.current.handleSecurityRemediation(envOption);
      // Fast-forward timers to execute setTimeout
      vi.runAllTimers();
    });

    // Check that simulateAIResponse was called with the option value
    expect(simulateAIResponse).toHaveBeenCalledWith(envOption.value);
    
    // Check that MessageFactory.createActionOptionsMessage was called with the correct parameters
    expect(MessageFactory.createActionOptionsMessage).toHaveBeenCalledWith(
      "What type of release is this?",
      releaseTypeSelectionOptions
    );
    
    // Check that getRandomResponse was not called (we're using the mocked flow response)
    expect(getRandomResponse).not.toHaveBeenCalled();
    
    // Check that generateSecurityRemediationResponse was not called
    expect(generateSecurityRemediationResponse).not.toHaveBeenCalled();
  });

  it('handles release type selection options correctly', async () => {
    // Create a release type selection option
    const releaseTypeOption = {
      id: RELEASE_TYPE_SELECTION_ACTIONS.MAJOR,
      label: 'Major',
      value: 'major',
    };

    // Render the hook
    const { result } = renderHook(() => useMessageHandler());

    // Call handleSecurityRemediation with the release type option
    await act(async () => {
      result.current.handleSecurityRemediation(releaseTypeOption);
      // Fast-forward timers to execute setTimeout
      vi.runAllTimers();
    });

    // Check that simulateAIResponse was called with the option value
    expect(simulateAIResponse).toHaveBeenCalledWith(releaseTypeOption.value);
    
    // Check that addBotMessage was called with the confirmation response
    expect(mockState.addBotMessage).toHaveBeenCalledWith("Perfect! I'll help you create a release with these details. Would you like to proceed with the release?");
    
    // Check that getRandomResponse was not called (we're using the mocked flow response)
    expect(getRandomResponse).not.toHaveBeenCalled();
    
    // Check that generateSecurityRemediationResponse was not called
    expect(generateSecurityRemediationResponse).not.toHaveBeenCalled();
  });
}); 