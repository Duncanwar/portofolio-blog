import express from 'express';

const router = express.Router();

router.patch('/update/userInfo/', (req, res) => {
  res.status(200).json({
    message: 'update user info',
  });
});

export default router;
