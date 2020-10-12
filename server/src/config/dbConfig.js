import mongoose from 'mongoose';

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DEV_DB_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export default dbConnection;
