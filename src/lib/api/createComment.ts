import type { NextApiRequest, NextApiResponse } from "next";

// In a real application, you would save this to a database
let comments: Array<{
  id: string;
  name: string;
  last: string;
  email: string;
  comment: string;
  createdAt: Date;
}> = [];

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, last, email, comment } = req.body;
    
    // Basic validation
    if (!name || !comment) {
      return res.status(400).json({ message: 'Name and comment are required' });
    }

    // Create new comment
    const newComment = {
      id: Date.now().toString(),
      name,
      last: last || '',
      email: email || '',
      comment,
      createdAt: new Date(),
    };

    // In a real app, you would save this to a database here
    comments.push(newComment);

    return res.status(201).json({ 
      message: 'Comment submitted successfully',
      comment: newComment 
    });
  } catch (err) {
    console.error('Error submitting comment:', err);
    return res.status(500).json({ message: 'Failed to submit comment', error: err });
  }
  return res.status(200).json({ message: "Comment Submitted" });
}
