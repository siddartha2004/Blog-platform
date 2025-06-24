import { Router } from 'express';
import { auth } from '../middleware/auth';
import Comment from '../models/Comment';

const router = Router();

router.post('/:postId', auth, async (req, res) => {
  const { content } = req.body;
  const comment = await new Comment({
    post: req.params.postId,
    author: (req as any).user,
    content
  }).save();
  res.json(comment);
});

router.get('/:postId', async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate('author', 'username')
    .sort('createdAt');
  res.json(comments);
});

export default router;
