# DS Study Buddy 🤖

A conversational AI chatbot built with React and TypeScript that helps students learn Data Structures and Algorithms through interactive Q&A using Retrieval-Augmented Generation (RAG).

## **Features**

* **Interactive Chat Interface** - Clean, responsive UI for seamless conversations
* **RAG-Powered Responses** - Provides accurate answers using context from a vector database
* **Conversation Memory** - Maintains chat history for contextual follow-up questions
* **Quick Start Prompts** - Pre-built questions to get users started quickly
* **Real-time Typing Indicators** - Visual feedback during response generation
* **Mobile-Responsive Design** - Works perfectly on all device sizes
* **Semantic Search** - Uses embeddings to find the most relevant information

## Technologies Used

**Frontend:**
- React 19 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Vite for build tooling

**AI & Backend:**
- LangChain for RAG pipeline orchestration
- Google Generative AI (Gemini 2.0 Flash) for LLM
- Supabase for vector database storage
- Google Generative AI Embeddings for semantic search

## Application Structure

```
src/
├── components/          # React UI components
│   ├── Chat.tsx        # Main chat display component
│   ├── Inputform.tsx   # Message input form
│   ├── Prompts.tsx     # Quick start prompt buttons
│   └── Title.tsx       # App title component
├── context/
│   └── BotContext.tsx  # Global state management
├── apiresponse/
│   └── apiresponse.ts  # RAG pipeline implementation
├── utils/
│   ├── gemini.ts       # LLM and embeddings setup
│   └── retrievesupabase.ts # Vector store configuration
├── types/
│   └── type.ts         # TypeScript type definitions
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## Data Flow

1. **User Input** → User types question or clicks prompt
2. **Question Processing** → LangChain converts question to standalone format
3. **Vector Search** → Embeddings find relevant documents in Supabase
4. **Context Retrieval** → Most relevant chunks are extracted
5. **Answer Generation** → Gemini LLM generates response using context + history
6. **UI Update** → Response displayed in chat interface with typing animation

## How It Works

### RAG Pipeline Architecture

The application implements a sophisticated RAG (Retrieval-Augmented Generation) system:

**Step 1: Standalone Question Generation**
- Converts conversational questions into standalone queries using conversation history
- Ensures context independence for better retrieval

**Step 2: Semantic Retrieval**
- Uses Google Generative AI embeddings to convert questions into vectors
- Performs similarity search in Supabase vector database
- Retrieves most relevant document chunks

**Step 3: Answer Generation**
- Combines retrieved context with conversation history
- Uses Gemini 2.0 Flash to generate contextually aware responses
- Maintains friendly, conversational tone optimized for learning

### Context Management
- Preserves conversation history for follow-up questions
- Maps even indices to human messages, odd indices to AI responses
- Prevents repetitive answers through history awareness

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account with vector database setup
- Google AI API key

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd typescript-chatbot
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```env
VITE_LLM_API_KEY=your_google_ai_api_key
VITE_SBURL=your_supabase_url
VITE_SBAPI=your_supabase_anon_key
```

4. **Supabase Database Setup**
- Create a `documents` table with vector column
- Set up the `match_documents` function for similarity search
- Populate with DSA-related content

5. **Start Development Server**
```bash
npm run dev
```

6. **Build for Production**
```bash
npm run build
```

### Vector Database Schema

Your Supabase `documents` table should include:
- `id` (primary key)
- `content` (text content)
- `embedding` (vector column for embeddings)
- `metadata` (optional JSONB for additional info)

## Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute
- 🐛 **Bug Reports** - Found an issue? Open a GitHub issue
- 💡 **Feature Requests** - Have ideas? We'd love to hear them
- 📚 **Content** - Help expand the DSA knowledge base
- 🔧 **Code** - Submit pull requests for improvements

### Development Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with clear, commented code
4. Test thoroughly across different devices
5. Commit with descriptive messages (`git commit -m 'Add: amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request with detailed description

### Code Style
- Follow existing TypeScript and React patterns
- Use meaningful variable names and add comments
- Ensure responsive design principles
- Test on multiple screen sizes

### Adding New Features
- Update type definitions in `src/types/type.ts`
- Add new environment variables to `.env.example`
- Update this README with new setup instructions
- Consider backward compatibility

---

Built with ❤️ for students learning Data Structures and Algorithms
