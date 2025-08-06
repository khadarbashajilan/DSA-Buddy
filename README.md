# DSA Buddy 🤖

A conversational AI chatbot that simplifies Data Structures and Algorithms concepts through intelligent retrieval-augmented generation, making complex programming concepts accessible and friendly.

## Features ✨

* **Intelligent Q&A System**: Ask questions about DSA concepts in natural language
* **Contextual Conversations**: Maintains conversation history for follow-up questions
* **RAG Implementation**: Retrieves relevant information from a curated knowledge base
* **Real-time Responses**: Instant answers with typing indicators for better UX
* **Responsive Design**: Works seamlessly across desktop and mobile devices
* **Pre-built Prompts**: Quick-start questions to explore common DSA topics
* **Error Handling**: Graceful handling of API limits and connection issues
* **Modern UI**: Clean, intuitive interface built with React and Tailwind CSS

## Technologies Used 🛠️

### Frontend
- **React 19.1.0** - Modern UI framework with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS 4.1.11** - Utility-first styling
- **Lucide React** - Beautiful icons
- **Vite 7.0.4** - Fast build tool and dev server

### AI & Language Processing  
- **LangChain 0.3.30** - Framework for building LLM applications
- **Google Generative AI** - Gemini 2.5 Flash Lite model
- **RAG Architecture** - Retrieval-Augmented Generation pipeline

### Database & Backend
- **Supabase** - Vector database for document storage
- **Vector Embeddings** - Semantic search capabilities

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules

## Application Structure 📁

```
src/
├── components/           # React UI components
│   ├── Chat.tsx         # Main chat interface
│   ├── Inputform.tsx    # Message input component
│   ├── Title.tsx        # Welcome screen title
│   ├── Prompts.tsx      # Quick-start prompts
│   └── Errorfetching.tsx # Error handling UI
├── context/             # React Context for state management
│   └── BotContext.tsx   # Global app state and logic
├── apiresponse/         # AI processing pipeline
│   └── apiresponse.ts   # RAG implementation
├── utils/               # Utility functions and configurations
│   ├── gemini.ts        # Google AI model setup
│   └── retrievesupabase.ts # Vector database connection
├── testapi/             # API health checking
│   └── test.ts          # Connection testing utilities
├── types/               # TypeScript type definitions
│   └── type.ts          # Application interfaces
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## Data Flow 🔄

1. **User Input**: User types a question or clicks a suggested prompt
2. **Question Processing**: Input is sent to the RAG pipeline for processing
3. **Standalone Question Generation**: LangChain converts the question to standalone format
4. **Vector Search**: System queries Supabase vector database for relevant context
5. **Context Retrieval**: Most relevant document chunks are retrieved and combined
6. **Answer Generation**: Gemini AI generates response using retrieved context and conversation history
7. **Response Display**: Answer is streamed back to the chat interface with typing animation
8. **History Update**: Conversation history is updated for context in future questions

## How It Works 🧠

### RAG Architecture
The application implements a sophisticated Retrieval-Augmented Generation system:

**1. Question Rephrasing Chain**
```typescript
const standaloneQuestionTemplate = 
  "Given a question, convert it to a standalone question. question: {question} standalone question:";
```

**2. Document Retrieval Chain**
- Converts standalone questions to vector embeddings
- Searches Supabase vector store for semantically similar content  
- Retrieves and combines relevant document chunks

**3. Answer Generation Chain**
- Uses retrieved context and conversation history
- Generates friendly, conversational responses
- Maintains consistency with previous interactions

### State Management
React Context provides centralized state management for:
- Conversation history and responses
- Loading states and error handling
- Form input and submission logic
- UI state (submitted, delay animations)

### Vector Database Integration
Supabase serves as the vector database:
- Stores pre-processed DSA content as embeddings
- Enables semantic search for relevant information
- Supports efficient retrieval with custom query functions

## Getting Started 🚀

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Supabase account** for vector database
- **Google AI API key** for Gemini access

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/khadarbashajilan/dsa-buddy.git
cd dsa-buddy
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```env
VITE_LLM_API_KEY=your_google_ai_api_key_here
VITE_SBURL=your_supabase_project_url
VITE_SBAPI=your_supabase_anon_key
```

4. **Database Setup**
Set up your Supabase vector store:

```sql
-- Create the documents table
CREATE TABLE documents (
  id bigserial PRIMARY KEY,
  content text,
  metadata jsonb,
  embedding vector(768)
);

-- Create the match_documents function for similarity search
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding vector(768),
  match_count int DEFAULT null,
  filter jsonb DEFAULT '{}'
) RETURNS TABLE (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
LANGUAGE plpgsql
AS $$
#variable_conflict use_column
BEGIN
  RETURN QUERY
  SELECT
    id,
    content,
    metadata,
    1 - (documents.embedding <=> query_embedding) AS similarity
  FROM documents
  WHERE metadata @> filter
  ORDER BY documents.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
```

5. **Populate Knowledge Base**
Add your DSA content to the vector database using embeddings.

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Production Deployment

```bash
# Build the application
npm run build

# Deploy the dist/ folder to your hosting service
# (Vercel, Netlify, etc.)
```

## API Configuration 🔧

### Google AI Setup
1. Go to [Google AI Studio](https://makersuite.google.com/)
2. Create a new API key
3. Add the key to your `.env` file as `VITE_LLM_API_KEY`

### Supabase Setup  
1. Create a new Supabase project
2. Enable the pgvector extension
3. Create the documents table and match function (see Database Setup)
4. Add your project URL and anon key to `.env`

## Contributing 🤝

We welcome contributions! Here's how you can help:

### 🐛 Bug Reports
- Use the issue tracker for bug reports
- Include steps to reproduce and expected behavior
- Add screenshots for UI-related issues

### 💡 Feature Requests  
- Suggest new DSA topics to cover
- Propose UI/UX improvements
- Share ideas for better learning experiences

### 🔧 Code Contributions
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes with proper TypeScript types
4. Test your changes thoroughly
5. Submit a pull request with a clear description

### 📝 Documentation
- Improve README sections
- Add code comments
- Create tutorials or guides

### Development Workflow
```bash
# Setup development environment
git clone <your-fork>
npm install
cp .env.example .env  # Configure your environment

# Make changes
git checkout -b feature/your-feature
# ... make your changes ...

# Test and lint
npm run lint
npm run build

# Submit
git commit -m "Add: your feature description"  
git push origin feature/your-feature
# Create pull request
```

## Common Issues & Solutions 🔧

### API Rate Limits
If you encounter rate limit errors:
- The app shows a friendly error message
- Consider upgrading your Google AI plan
- Implement request queuing for high traffic

### Vector Database Issues
- Ensure pgvector extension is enabled in Supabase
- Verify your documents table schema matches expectations
- Check that embeddings are properly generated

### Development Issues
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Check that all environment variables are properly set

---

Ready to make Data Structures and Algorithms learning more accessible? Let's build something amazing together! 🎯
