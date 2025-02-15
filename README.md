# Quick Start RAG System

## Project Overview
This project implements a minimal viable Retrieval-Augmented Generation (RAG) system using Supabase, OpenAI API, and a basic web interface. The system supports text document uploads, generates embeddings, stores them in a vector database, and provides query-response functionality.

## Core Features
- Document upload and processing
- Vector similarity search for queries
- Basic chat interface for user interaction
- Local Supabase instance for data storage

## Project Structure
```
my-rag-system
├── src
│   ├── server
│   │   ├── app.ts
│   │   ├── controllers
│   │   │   ├── documentController.ts
│   │   │   └── queryController.ts
│   │   └── routes.ts
│   ├── client
│   │   ├── components
│   │   │   ├── FileUpload.jsx
│   │   │   └── ChatInterface.jsx
│   │   └── App.jsx
├── sql
│   ├── documents_table.sql
│   └── chunks_table.sql
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Setup Instructions
1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd my-rag-system
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up Supabase:**
   - Create a local Supabase instance.
   - Configure the database schema using the SQL files in the `sql` directory.

4. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in the required values.

5. **Run the application:**
   ```
   npm start
   ```

## Usage
- Upload text documents using the File Upload component.
- Enter queries in the Chat Interface to receive responses based on the uploaded documents.

## Testing
- Ensure to test document uploads, query processing, and response generation.
- Check for error handling in various scenarios.

## Next Steps
- Consider enhancements such as improved chunking, chat history, and a more advanced user interface.

## License
This project is licensed under the MIT License.