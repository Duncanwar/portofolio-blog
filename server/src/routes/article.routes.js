import express from 'express';

const router = express.Router();

router
  .get('/articles', (req, res) => {
    res.json({
      message: 'articles',
    });
  })
  .post('/post/articles')
  .patch('/update/articles/:id')
  .delete('/delete/articles/:id');

export default router;
