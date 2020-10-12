import express from 'express';

const router = express.Router();

router.get('/queries', (req, res) => {
  res.json({
    message: 'queries',
  });
});

export default router;
