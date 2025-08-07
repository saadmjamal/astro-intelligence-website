import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { jest } from '@jest/globals';
import '@testing-library/jest-dom';

// Mock AI Chat Interface Component
const ChatInterface = React.lazy(() => import('@/components/ai/ChatInterface'));

// Mock AI Service
const mockAIService = {
  sendMessage: jest.fn() as jest.MockedFunction<any>,
  getTypingStatus: jest.fn() as jest.MockedFunction<any>,
  clearHistory: jest.fn() as jest.MockedFunction<any>,
};

jest.mock('@/lib/ai/chatService', () => ({
  AIService: jest.fn(() => mockAIService),
}));

// Test utilities
const renderChatInterface = (props = {}) => {
  return render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <ChatInterface {...props} />
    </React.Suspense>
  );
};

// Mock responses for different scenarios
const mockResponses = {
  success: {
    id: 'msg-123',
    content: 'Hello! How can I help you today?',
    timestamp: new Date().toISOString(),
    role: 'assistant',
    metadata: { confidence: 0.95, responseTime: 234 }
  },
  error: {
    error: 'Service temporarily unavailable',
    code: 'SERVICE_ERROR',
    retryAfter: 5000
  },
  slowResponse: {
    id: 'msg-124',
    content: 'This is a response that took longer to generate.',
    timestamp: new Date().toISOString(),
    role: 'assistant',
    metadata: { confidence: 0.87, responseTime: 3400 }
  }
};

describe('AI Chat Interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAIService.sendMessage.mockReset();
    mockAIService.getTypingStatus.mockReturnValue(false);
  });

  describe('Rendering and Initial State', () => {
    it('renders chat interface without crashing', async () => {
      renderChatInterface();
      
      await waitFor(() => {
        expect(screen.getByRole('textbox', { name: /chat input/i })).toBeInTheDocument();
      });
    });

    it('displays welcome message on initial load', async () => {
      renderChatInterface();
      
      await waitFor(() => {
        expect(screen.getByText(/how can i help you today/i)).toBeInTheDocument();
      });
    });

    it('shows send button in disabled state initially', async () => {
      renderChatInterface();
      
      await waitFor(() => {
        const sendButton = screen.getByRole('button', { name: /send/i });
        expect(sendButton).toBeDisabled();
      });
    });
  });

  describe('Message Sending and Receiving', () => {
    it('enables send button when user types message', async () => {
      renderChatInterface();
      
      await waitFor(() => {
        const input = screen.getByRole('textbox', { name: /chat input/i });
        fireEvent.change(input, { target: { value: 'Hello AI' } });
        
        const sendButton = screen.getByRole('button', { name: /send/i });
        expect(sendButton).not.toBeDisabled();
      });
    });

    it('sends message when send button is clicked', async () => {
      mockAIService.sendMessage.mockResolvedValue(mockResponses.success);
      renderChatInterface();
      
      await waitFor(async () => {
        const input = screen.getByRole('textbox', { name: /chat input/i });
        const sendButton = screen.getByRole('button', { name: /send/i });
        
        fireEvent.change(input, { target: { value: 'Hello AI' } });
        fireEvent.click(sendButton);
        
        expect(mockAIService.sendMessage).toHaveBeenCalledWith('Hello AI');
      });
    });

    it('displays AI response after sending message', async () => {
      mockAIService.sendMessage.mockResolvedValue(mockResponses.success);
      renderChatInterface();
      
      await waitFor(async () => {
        const input = screen.getByRole('textbox', { name: /chat input/i });
        const sendButton = screen.getByRole('button', { name: /send/i });
        
        fireEvent.change(input, { target: { value: 'Hello AI' } });
        fireEvent.click(sendButton);
        
        await waitFor(() => {
          expect(screen.getByText('Hello! How can I help you today?')).toBeInTheDocument();
        });
      });
    });

    it('sends message on Enter key press', async () => {
      mockAIService.sendMessage.mockResolvedValue(mockResponses.success);
      renderChatInterface();
      
      await waitFor(() => {
        const input = screen.getByRole('textbox', { name: /chat input/i });
        
        fireEvent.change(input, { target: { value: 'Hello AI' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        
        expect(mockAIService.sendMessage).toHaveBeenCalledWith('Hello AI');
      });
    });

    it('does not send message on Enter + Shift', async () => {
      renderChatInterface();
      
      await waitFor(() => {
        const input = screen.getByRole('textbox', { name: /chat input/i });
        
        fireEvent.change(input, { target: { value: 'Hello AI' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', shiftKey: true });
        
        expect(mockAIService.sendMessage).not.toHaveBeenCalled();
      });
    });
  });

  describe('Loading and Typing Indicators', () => {
    it('shows typing indicator when AI is responding', async () => {
      mockAIService.getTypingStatus.mockReturnValue(true);
      mockAIService.sendMessage.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve(mockResponses.success), 1000))
      );
      
      renderChatInterface();
      
      await waitFor(async () => {
        const input = screen.getByRole('textbox', { name: /chat input/i });
        const sendButton = screen.getByRole('button', { name: /send/i });
        
        fireEvent.change(input, { target: { value: 'Hello AI' } });
        fireEvent.click(sendButton);
        
        expect(screen.getByText(/ai is typing/i)).toBeInTheDocument();
      });
    });

    it('hides typing indicator after response', async () => {
      mockAIService.sendMessage.mockResolvedValue(mockResponses.success);
      renderChatInterface();
      
      await waitFor(async () => {
        const input = screen.getByRole('textbox', { name: /chat input/i });
        const sendButton = screen.getByRole('button', { name: /send/i });
        
        fireEvent.change(input, { target: { value: 'Hello AI' } });
        fireEvent.click(sendButton);
        
        await waitFor(() => {
          expect(screen.queryByText(/ai is typing/i)).not.toBeInTheDocument();
        });
      });
    });
  });

  describe('Error Handling', () => {
    it('displays error message when AI service fails', async () => {
      mockAIService.sendMessage.mockRejectedValue(mockResponses.error);
      renderChatInterface();
      
      await waitFor(async () => {
        const input = screen.getByRole('textbox', { name: /chat input/i });
        const sendButton = screen.getByRole('button', { name: /send/i });
        
        fireEvent.change(input, { target: { value: 'Hello AI' } });
        fireEvent.click(sendButton);
        
        await waitFor(() => {
          expect(screen.getByText(/service temporarily unavailable/i)).toBeInTheDocument();
        });
      });
    });

    it('shows retry button after error', async () => {
      mockAIService.sendMessage.mockRejectedValue(mockResponses.error);
      renderChatInterface();
      
      await waitFor(async () => {
        const input = screen.getByRole('textbox', { name: /chat input/i });
        const sendButton = screen.getByRole('button', { name: /send/i });
        
        fireEvent.change(input, { target: { value: 'Hello AI' } });
        fireEvent.click(sendButton);
        
        await waitFor(() => {
          expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
        });
      });
    });

    it('retries message when retry button is clicked', async () => {
      mockAIService.sendMessage
        .mockRejectedValueOnce(mockResponses.error)
        .mockResolvedValueOnce(mockResponses.success);
      
      renderChatInterface();
      
      await waitFor(async () => {
        const input = screen.getByRole('textbox', { name: /chat input/i });
        const sendButton = screen.getByRole('button', { name: /send/i });
        
        fireEvent.change(input, { target: { value: 'Hello AI' } });
        fireEvent.click(sendButton);
        
        await waitFor(() => {
          const retryButton = screen.getByRole('button', { name: /retry/i });
          fireEvent.click(retryButton);
        });
        
        expect(mockAIService.sendMessage).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('Performance Requirements', () => {
    it('meets sub-2s response time requirement', async () => {
      const startTime = performance.now();
      mockAIService.sendMessage.mockResolvedValue(mockResponses.success);
      
      renderChatInterface();
      
      await waitFor(async () => {
        const input = screen.getByRole('textbox', { name: /chat input/i });
        const sendButton = screen.getByRole('button', { name: /send/i });
        
        fireEvent.change(input, { target: { value: 'Hello AI' } });
        fireEvent.click(sendButton);
        
        await waitFor(() => {
          expect(screen.getByText('Hello! How can I help you today?')).toBeInTheDocument();
        });
        
        const endTime = performance.now();
        const responseTime = endTime - startTime;
        
        expect(responseTime).toBeLessThan(2000); // Sub-2s requirement
      });
    });

    it('handles slow responses gracefully', async () => {
      mockAIService.sendMessage.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve(mockResponses.slowResponse), 3500))
      );
      
      renderChatInterface();
      
      await waitFor(async () => {
        const input = screen.getByRole('textbox', { name: /chat input/i });
        const sendButton = screen.getByRole('button', { name: /send/i });
        
        fireEvent.change(input, { target: { value: 'Complex question' } });
        fireEvent.click(sendButton);
        
        // Should show timeout warning after 3s
        await waitFor(() => {
          expect(screen.getByText(/taking longer than usual/i)).toBeInTheDocument();
        }, { timeout: 3500 });
      });
    });
  });

  describe('Accessibility Features', () => {
    it('has proper ARIA labels', async () => {
      renderChatInterface();
      
      await waitFor(() => {
        expect(screen.getByRole('textbox', { name: /chat input/i })).toHaveAttribute('aria-label');
        expect(screen.getByRole('button', { name: /send/i })).toHaveAttribute('aria-label');
      });
    });

    it('supports keyboard navigation', async () => {
      renderChatInterface();
      
      await waitFor(() => {
        const input = screen.getByRole('textbox', { name: /chat input/i });
        const sendButton = screen.getByRole('button', { name: /send/i });
        
        input.focus();
        expect(document.activeElement).toBe(input);
        
        fireEvent.keyDown(input, { key: 'Tab' });
        expect(document.activeElement).toBe(sendButton);
      });
    });

    it('announces messages to screen readers', async () => {
      mockAIService.sendMessage.mockResolvedValue(mockResponses.success);
      renderChatInterface();
      
      await waitFor(async () => {
        const input = screen.getByRole('textbox', { name: /chat input/i });
        fireEvent.change(input, { target: { value: 'Hello AI' } });
        fireEvent.keyDown(input, { key: 'Enter' });
        
        await waitFor(() => {
          const messageContainer = screen.getByRole('log');
          expect(messageContainer).toHaveAttribute('aria-live', 'polite');
        });
      });
    });
  });

  describe('Message History', () => {
    it('maintains conversation history', async () => {
      mockAIService.sendMessage.mockResolvedValue(mockResponses.success);
      renderChatInterface();
      
      await waitFor(async () => {
        const input = screen.getByRole('textbox', { name: /chat input/i });
        
        // Send first message
        fireEvent.change(input, { target: { value: 'First message' } });
        fireEvent.keyDown(input, { key: 'Enter' });
        
        await waitFor(() => {
          expect(screen.getByText('First message')).toBeInTheDocument();
        });
        
        // Send second message
        fireEvent.change(input, { target: { value: 'Second message' } });
        fireEvent.keyDown(input, { key: 'Enter' });
        
        await waitFor(() => {
          expect(screen.getByText('First message')).toBeInTheDocument();
          expect(screen.getByText('Second message')).toBeInTheDocument();
        });
      });
    });

    it('clears history when clear button is clicked', async () => {
      mockAIService.sendMessage.mockResolvedValue(mockResponses.success);
      renderChatInterface();
      
      await waitFor(async () => {
        const input = screen.getByRole('textbox', { name: /chat input/i });
        
        fireEvent.change(input, { target: { value: 'Test message' } });
        fireEvent.keyDown(input, { key: 'Enter' });
        
        await waitFor(() => {
          expect(screen.getByText('Test message')).toBeInTheDocument();
        });
        
        const clearButton = screen.getByRole('button', { name: /clear/i });
        fireEvent.click(clearButton);
        
        expect(screen.queryByText('Test message')).not.toBeInTheDocument();
        expect(mockAIService.clearHistory).toHaveBeenCalled();
      });
    });
  });
});