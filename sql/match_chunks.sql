-- First, ensure pgvector is enabled
CREATE EXTENSION IF NOT EXISTS vector;

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS match_chunks;

-- Create function for similarity search
CREATE FUNCTION match_chunks (
  query_embedding vector(1536),
  similarity_threshold float,
  match_count int
)
RETURNS TABLE (
  content text,
  similarity float,
  metadata jsonb
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    chunks.content,
    1 - (chunks.embedding <-> query_embedding) as similarity,
    chunks.metadata
  FROM chunks
  WHERE 1 - (chunks.embedding <-> query_embedding) > similarity_threshold
  ORDER BY chunks.embedding <-> query_embedding
  LIMIT match_count;
END;
$$;