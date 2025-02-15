import express from 'express';
import documentRoutes from './routes';
import dotenv from 'dotenv';
import { supabase } from './supabaseClient'; // Import the shared Supabase client

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', documentRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});