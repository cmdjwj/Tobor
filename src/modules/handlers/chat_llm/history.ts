interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

interface UserHistory {
    messages: ChatMessage[];
}

class ChatHistoryManager {
    private histories: Map<number, UserHistory> = new Map();
    private maxHistoryLength: number = 10; // 保存最近10条对话

    addMessage(userId: number, role: 'user' | 'assistant', content: string) {
        if (!this.histories.has(userId)) {
            this.histories.set(userId, { messages: [] });
        }
        
        const history = this.histories.get(userId)!;
        history.messages.push({ role, content });
        
        // 保持历史记录在限定长度内
        if (history.messages.length > this.maxHistoryLength * 2) {
            history.messages = history.messages.slice(-this.maxHistoryLength * 2);
        }
    }

    getHistory(userId: number): ChatMessage[] {
        return this.histories.get(userId)?.messages || [];
    }

    clearHistory(userId: number) {
        this.histories.delete(userId);
    }
}

export const chatHistoryManager = new ChatHistoryManager();