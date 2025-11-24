// ChatGPT Web App - Main Application
class ChatApp {
  constructor() {
    this.apiKey = this.loadApiKey();
    this.conversations = this.loadConversations();
    this.currentConversationId = null;
    this.settings = this.loadSettings();

    this.initializeElements();
    this.attachEventListeners();
    this.updateKeyStatus();

    if (!this.apiKey) {
      this.focusApiKeyInput();
    }
  }

  // Initialize DOM Elements
  initializeElements() {
    this.messageInput = document.getElementById("messageInput");
    this.sendBtn = document.getElementById("sendBtn");
    this.chatMessages = document.getElementById("chatMessages");
    this.apiKeyInput = document.getElementById("apiKeyInput");
    this.keyToggleBtn = document.getElementById("keyToggleBtn");
    this.keyStatus = document.getElementById("keyStatus");
    this.newChatBtn = document.getElementById("newChatBtn");
    this.clearBtn = document.getElementById("clearBtn");
    this.settingsBtn = document.getElementById("settingsBtn");
    this.settingsModal = document.getElementById("settingsModal");
    this.closeSettingsBtn = document.getElementById("closeSettingsBtn");
    this.chatHistory = document.getElementById("chatHistory");
    this.chatTitle = document.getElementById("chatTitle");
    this.modelSelect = document.getElementById("modelSelect");
    this.temperatureSlider = document.getElementById("temperatureSlider");
    this.temperatureValue = document.getElementById("temperatureValue");
    this.maxTokensInput = document.getElementById("maxTokensInput");
    this.testBtn = document.getElementById("testBtn");
  }

  // Attach Event Listeners
  attachEventListeners() {
    this.sendBtn.addEventListener("click", () => this.sendMessage());
    this.messageInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.ctrlKey) {
        this.sendMessage();
      }
    });

    this.apiKeyInput.addEventListener("change", () => {
      this.apiKey = this.apiKeyInput.value;
      this.saveApiKey();
      this.updateKeyStatus();
    });

    this.keyToggleBtn.addEventListener("click", () => {
      const type = this.apiKeyInput.type === "password" ? "text" : "password";
      this.apiKeyInput.type = type;
      this.keyToggleBtn.textContent = type === "password" ? "👁️" : "👁️‍🗨️";
    });

    this.newChatBtn.addEventListener("click", () =>
      this.createNewConversation()
    );
    this.testBtn?.addEventListener("click", () => this.runMockTest());
    this.clearBtn.addEventListener("click", () => this.clearConversation());
    this.settingsBtn.addEventListener("click", () => this.openSettings());
    this.closeSettingsBtn.addEventListener("click", () => this.closeSettings());
    this.settingsModal.addEventListener("click", (e) => {
      if (e.target === this.settingsModal) {
        this.closeSettings();
      }
    });

    this.temperatureSlider.addEventListener("input", (e) => {
      this.temperatureValue.textContent = e.target.value;
      this.settings.temperature = parseFloat(e.target.value);
      this.saveSettings();
    });

    this.modelSelect.addEventListener("change", (e) => {
      this.settings.model = e.target.value;
      this.saveSettings();
    });

    this.maxTokensInput.addEventListener("change", (e) => {
      this.settings.maxTokens = parseInt(e.target.value);
      this.saveSettings();
    });
  }

  // Quick mock test to verify UI without an API key
  runMockTest() {
    if (!this.currentConversationId) this.createNewConversation();
    const userMsg = "Hello — test message";
    const now = Date.now();
    this.conversations[this.currentConversationId].messages.push({
      role: "user",
      content: userMsg,
      id: now,
    });
    this.conversations[this.currentConversationId].messages.push({
      role: "assistant",
      content: "This is a mock reply. The UI is working correctly.",
      id: now + 1,
    });
    this.saveConversations();
    this.renderMessages();
    this.renderChatHistory();
  }

  // API Key Management - No longer needed (handled by server)
  saveApiKey() {
    // API key is now managed by the backend server
  }

  loadApiKey() {
    return 'server-managed'; // Placeholder - server handles the real key
  }

  updateKeyStatus() {
    // Check server health instead
    this.checkServerStatus();
  }

  async checkServerStatus() {
    try {
      const response = await fetch('http://localhost:5000/api/health');
      if (response.ok) {
        this.keyStatus.textContent = '✓ Server Connected';
        this.keyStatus.classList.add('success');
        this.sendBtn.disabled = false;
        this.apiKeyInput.style.display = 'none';
        this.keyToggleBtn.style.display = 'none';
      } else {
        throw new Error('Server not responding');
      }
    } catch (error) {
      this.keyStatus.textContent = '✗ Server Not Running';
      this.keyStatus.classList.remove('success');
      this.sendBtn.disabled = true;
      this.apiKeyInput.style.display = 'block';
      this.keyToggleBtn.style.display = 'block';
    }
  }

  focusApiKeyInput() {
    // No longer needed
  }

  // Settings Management
  loadSettings() {
    const defaults = {
      model: 'gemini-2.0-flash',
      temperature: 0.7,
      maxTokens: 2000,
    };
    const saved = localStorage.getItem("chat_settings");
    return saved ? JSON.parse(saved) : defaults;
  }

  saveSettings() {
    localStorage.setItem("chat_settings", JSON.stringify(this.settings));
  }

  openSettings() {
    this.modelSelect.value = this.settings.model;
    this.temperatureSlider.value = this.settings.temperature;
    this.temperatureValue.textContent = this.settings.temperature;
    this.maxTokensInput.value = this.settings.maxTokens;
    this.settingsModal.classList.add("show");
  }

  closeSettings() {
    this.settingsModal.classList.remove("show");
  }

  // Conversation Management
  loadConversations() {
    const saved = localStorage.getItem("chat_conversations");
    return saved ? JSON.parse(saved) : {};
  }

  saveConversations() {
    localStorage.setItem(
      "chat_conversations",
      JSON.stringify(this.conversations)
    );
  }

  createNewConversation() {
    const id = "conv_" + Date.now();
    this.conversations[id] = {
      id,
      title: "New Chat",
      messages: [],
      createdAt: new Date().toISOString(),
    };
    this.currentConversationId = id;
    this.saveConversations();
    this.renderChatHistory();
    this.displayConversation(id);
  }

  clearConversation() {
    if (!this.currentConversationId) return;
    if (confirm("Are you sure you want to clear this conversation?")) {
      this.conversations[this.currentConversationId].messages = [];
      this.saveConversations();
      this.renderMessages();
    }
  }

  displayConversation(id) {
    this.currentConversationId = id;
    const conv = this.conversations[id];
    this.chatTitle.textContent = conv.title || "New Chat";
    this.renderChatHistory();
    this.renderMessages();
  }

  renderChatHistory() {
    this.chatHistory.innerHTML = "";
    Object.values(this.conversations)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .forEach((conv) => {
        const item = document.createElement("div");
        item.className = `chat-history-item ${
          conv.id === this.currentConversationId ? "active" : ""
        }`;
        item.textContent = conv.title || "New Chat";
        item.addEventListener("click", () => this.displayConversation(conv.id));
        this.chatHistory.appendChild(item);
      });
  }

  renderMessages() {
    if (!this.currentConversationId) {
      this.chatMessages.innerHTML = `
        <div class="welcome-message">
          <h2>Welcome to ChatGPT Web App</h2>
          <p>Start a conversation by typing a message below. Your API key is stored locally and never sent to our servers.</p>
        </div>
      `;
      return;
    }

    const conv = this.conversations[this.currentConversationId];
    if (conv.messages.length === 0) {
      this.chatMessages.innerHTML = `
        <div class="welcome-message">
          <h2>Welcome to ChatGPT Web App</h2>
          <p>Start a conversation by typing a message below. Your API key is stored locally and never sent to our servers.</p>
        </div>
      `;
      return;
    }

    this.chatMessages.innerHTML = "";
    conv.messages.forEach((msg) => {
      this.addMessageToUI(msg.role, msg.content, msg.id);
    });
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  addMessageToUI(role, content, id = Date.now()) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${role}`;
    messageDiv.id = `msg-${id}`;

    const avatar = document.createElement("div");
    avatar.className = "message-avatar";
    avatar.textContent = role === "user" ? "👤" : "🤖";

    const contentDiv = document.createElement("div");
    contentDiv.className = "message-content";
    contentDiv.textContent = content;

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    this.chatMessages.appendChild(messageDiv);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  addLoadingMessage() {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message assistant";
    messageDiv.id = "loading-msg";

    const avatar = document.createElement("div");
    avatar.className = "message-avatar";
    avatar.textContent = "🤖";

    const contentDiv = document.createElement("div");
    contentDiv.className = "message-content message-loading";
    contentDiv.innerHTML = "<span></span><span></span><span></span>";

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    this.chatMessages.appendChild(messageDiv);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  removeLoadingMessage() {
    const loadingMsg = document.getElementById("loading-msg");
    if (loadingMsg) {
      loadingMsg.remove();
    }
  }

  // Send Message
  async sendMessage() {
    const message = this.messageInput.value.trim();

    if (!message) {
      alert("Please enter a message");
      return;
    }

    if (!this.currentConversationId) {
      this.createNewConversation();
    }

    // Add user message
    this.conversations[this.currentConversationId].messages.push({
      role: "user",
      content: message,
      id: Date.now(),
    });

    // Update title if it's the first message
    if (this.conversations[this.currentConversationId].messages.length === 1) {
      const title =
        message.substring(0, 30) + (message.length > 30 ? "..." : "");
      this.conversations[this.currentConversationId].title = title;
    }

    this.saveConversations();
    this.messageInput.value = "";
    this.messageInput.style.height = "auto";
    this.renderMessages();
    this.renderChatHistory();

    // Disable send button
    this.sendBtn.disabled = true;

    // Add loading message
    this.addLoadingMessage();

    try {
      const response = await this.callOpenAIAPI(message);
      this.removeLoadingMessage();

      // Add assistant message
      this.conversations[this.currentConversationId].messages.push({
        role: "assistant",
        content: response,
        id: Date.now(),
      });

      this.saveConversations();
      this.addMessageToUI("assistant", response);
    } catch (error) {
      this.removeLoadingMessage();
      alert("Error: " + error.message);
      console.error("API Error:", error);
    } finally {
      this.sendBtn.disabled = !this.apiKey;
    }
  }

  // Call Backend Server (which handles Gemini API securely)
  async callOpenAIAPI(userMessage) {
    const conv = this.conversations[this.currentConversationId];
    
    // Prepare messages for API - Gemini format
    const messages = conv.messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const requestBody = {
      messages: messages,
      model: this.settings.model,
      temperature: this.settings.temperature,
      maxOutputTokens: this.settings.maxTokens
    };

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error?.message || errorData.error || 'API request failed';
        
        if (errorMessage.includes('RESOURCE_EXHAUSTED')) {
          throw new Error('Quota exceeded. Please check https://ai.google.dev/pricing');
        }
        if (errorMessage.includes('Server Not Running')) {
          throw new Error('Backend server is not running. Please start the server with: npm start');
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data.content;
    } catch (error) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Cannot connect to backend server. Make sure it\'s running on http://localhost:5000');
      }
      throw error;
    }
  }
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.chatApp = new ChatApp();
});
