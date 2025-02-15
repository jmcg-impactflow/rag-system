export function chunkText(text: string, chunkSize: number, overlap: number): string[] {
    const tokens = text.split(/\s+/); // Basic whitespace tokenization
    const chunks: string[] = [];
    let i = 0;
    while (i < tokens.length) {
      const chunkTokens = tokens.slice(i, i + chunkSize);
      chunks.push(chunkTokens.join(' '));
      i += chunkSize - overlap; // shift by chunkSize minus overlap tokens
    }
    return chunks;
  }