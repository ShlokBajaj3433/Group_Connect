import express from 'express';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import { clerkMiddleware } from '@clerk/express';
import { serve } from 'inngest/express';
import { inngest, functions } from './config/inngest.js';

const app = express();
const port = ENV.PORT || 5001;

app.use(express.json());
app.use(clerkMiddleware());

// Fix the root route
app.get('/', (req, res) => {
  res.json({ message: 'Group Connect API is running!' });
});

app.use("/api/inngest", serve({ client: inngest, functions }));

const startServer = () => {
  try {
    connectDB();
    if (ENV.NODE_ENV !== "production") {
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