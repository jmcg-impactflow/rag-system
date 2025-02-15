import { Request, Response } from 'express';
import { generateEmbedding } from '../services/embeddingService';
import { supabase } from '../supabaseClient';

const handleQuery = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: 'No query provided.' });

    const queryEmbedding = await generateEmbedding(query);

    const { data, error } = await supabase.rpc('match_chunks', {
      query_embedding: queryEmbedding,
      similarity_threshold: 0.7,
      match_count: 5,
    });
    if (error) throw error;

    res.status(200).json({ results: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Query handling failed.' });
  }
};

export default handleQuery;