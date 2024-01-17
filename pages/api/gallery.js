import fs from 'fs';
import path from 'path';

export function buildFeedbackPath() {
  return path.join(process.cwd(), 'data', 'mainPosts.json');
};

export function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
};

function handler(req, res) {
  if (req.method === 'GET') {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    res.status(200).json({feedback: data});
  }
};

export default handler;