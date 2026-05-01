import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { explainCode } from './llm.js';
import { analyzeCode } from './ast.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.post('/api/analyze', async (req, res) => {
    const { code } = req.body;

    const analysisResult = analyzeCode(code);
    const explanation = await explainCode(code, analysisResult.issues);

    res.json({
        success: analysisResult.success,
        issues: analysisResult.issues,
        explanations: explanation,
    });
});

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);