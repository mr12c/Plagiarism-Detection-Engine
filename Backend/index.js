import dotenv from 'dotenv';
import { connectDatabase } from './src/DB/index.js';
import { app } from './src/app.js';
dotenv.config();

const port = process.env.PORT || 4000;

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`⚙️ Server is running at port: ${port}`);
    });
  })
  .catch(() => {
    console.log("MONGO db connection failed !!! ", err);
  });
