import express from 'express';

const router = express.Router();

router
  .post('/signup', (req, res) => {
    res.json({
      message: 'signup',
    });
  })
  .post('/signin');

export default router;
