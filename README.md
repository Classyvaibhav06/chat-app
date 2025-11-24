# ChatGPT Web App

A modern, clean chat web application powered by OpenAI's ChatGPT API. Built with vanilla HTML, CSS, and JavaScript.

## Features

✨ **Core Features**
- 💬 Real-time chat interface with ChatGPT
- 📝 Multiple conversation support with history
- 💾 Local storage for conversations (never sent to servers)
- 🔐 Secure API key management (stored locally only)
- ⚙️ Customizable AI settings
- 🌓 Clean, modern UI

**Settings**
- Select AI model (GPT-4o Mini, GPT-4o, GPT-3.5 Turbo)
- Adjust temperature (0-2) for response creativity
- Set max tokens for response length
- Clear conversation history

**User Experience**
- Smooth animations and transitions
- Responsive design (mobile, tablet, desktop)
- Auto-scrolling to latest messages
- Loading indicators
- Keyboard shortcut (Ctrl+Enter) to send
- Toggle API key visibility

## Setup

### 1. Get OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Go to API Keys section
4. Create a new API key
5. Copy the key

### 2. Run the App

**Option A: Open locally**
1. Save the files in a folder
2. Double-click `index.html` to open in browser

**Option B: Use a local server** (recommended)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server
```
Then open `http://localhost:8000`

### 3. Add Your API Key
1. Open the app in your browser
2. Paste your OpenAI API key in the input field at the bottom
3. Start chatting!

## How to Use

1. **Type a message** in the input field
2. **Click send** or press `Ctrl+Enter`
3. **Wait for response** from ChatGPT
4. **Start a new chat** with the "+ New Chat" button
5. **Adjust settings** with the ⚙️ button

## Privacy & Security

- ✅ Your API key is stored **only in your browser's localStorage**
- ✅ API key is **never sent** to our servers
- ✅ All conversations are stored **locally on your device**
- ✅ You control your data completely

## Costs

- Uses your own OpenAI API key
- Billing based on OpenAI's pricing
- **GPT-4o Mini**: Most affordable option ($0.15 per 1M input tokens)
- **GPT-4o**: Advanced model ($2.50 per 1M input tokens)
- **GPT-3.5 Turbo**: Legacy option

Monitor your usage at [OpenAI Billing](https://platform.openai.com/account/billing/overview)

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## Troubleshooting

**"API request failed"**
- Check your API key is correct
- Ensure you have API credits
- Check your internet connection

**"The model does not exist"**
- Model names are case-sensitive
- Ensure you have access to the model

**Conversations not saving**
- Check browser's localStorage is enabled
- Try clearing browser cache

## Tips

- ⏱️ **Drafts**: Type your message and close the tab - it's still there
- 🎨 **Longer responses**: Increase max tokens in settings
- 🎯 **More creative**: Increase temperature (up to 2)
- 💰 **Save money**: Use GPT-4o Mini for most tasks

## License

Free to use and modify for personal or commercial projects.

## Support

For issues with:
- **This app**: Check the console (F12) for error messages
- **OpenAI API**: Visit [OpenAI Help](https://help.openai.com/)
