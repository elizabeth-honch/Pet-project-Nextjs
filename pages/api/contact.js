import fs from 'fs';
import path from 'path';

export function buildFeedbackPath() {
  return path.join(process.cwd(), 'data', 'contacts.json');
};

export function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
};

function handler(req, res) {
  if (req.method === 'POST') {
    const {email, name, msg} = req.body;
    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !msg ||
      msg.trim() === ''
    ) {
      return res.status(422).json({message: 'Invalid data'});
    }
    const contactObj = {
      id: new Date().toISOString(),
      email: email,
      name: name,
      msg: msg,
    };
    // store in database
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    data.push(contactObj);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({message: 'Success!', feedback: contactObj});
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    res.status(200).json({feedback: data});
  }
};

export default handler;