import express from 'express';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import { clerkMiddleware } from '@clerk/nextjs/server'
import { serve } from 'inngest/express';
import { inngest,functions } from './config/inngest.js';

const app = express();
const port = ENV.PORT;
app.use(clerkMiddleware());

app.use(express.json());
app.use("/api/inngest",serve({client: inngest,functions}));
app.get('/', (req, res) => {
  
});


const startServer = () => {
  try {
    connectDB();
    if(ENV.NODE_ENV !== "production") {
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    }
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();

export default app;