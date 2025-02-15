import { RequestHandler } from 'express';
import { chunkText } from '../utils/chunkText';
import { generateEmbedding } from '../services/embeddingService';
import { supabase } from '../supabaseClient';

interface DocumentResponse {
  message: string;
  documentId?: string;
  chunks?: number;
}

const uploadDocument: RequestHandler<{}, DocumentResponse | { error: string }> = async (req, res) => {
  try {
    const { content, filename } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'No content provided' });
    }

    // Insert document and get generated UUID
    const { data: documentData, error: insertDocError } = await supabase
      .from('documents')
      .insert({
        content,
        metadata: {
          filename,
          created_at: new Date().toISOString()
        }
      })
      .select('*')
      .single();

    if (insertDocError) {
      console.error('Document insert error:', insertDocError);
      throw insertDocError;
    }

    if (!documentData) {
      throw new Error('No document data returned after insert');
    }

    // Process text into chunks
    const chunks = chunkText(content, 1000, 100);

    // Insert chunks with embeddings
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const embedding = await generateEmbedding(chunk);
      
      const { error: chunkError } = await supabase
        .from('chunks')
        .insert({
          document_id: documentData.id,
          content: chunk,
          embedding,
          metadata: {
            filename,
            chunk_index: i,
            created_at: new Date().toISOString()
          }
        });

      if (chunkError) {
        console.error('Chunk insert error:', chunkError);
        throw chunkError;
      }
    }

    return res.status(200).json({
      message: 'Document processed successfully',
      documentId: documentData.id,
      chunks: chunks.length
    });

  } catch (error) {
    console.error('Processing error:', error);
    return res.status(500).json({ error: 'Failed to process document' });
  }
};

export default uploadDocument;