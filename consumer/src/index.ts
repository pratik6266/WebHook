import express from 'express';

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Consumer service is running!');
});

app.post('/consume', (req, res) => {
  const body = req.body;
  console.log('Received webhook event:', body);
  res.status(200).send('Webhook received successfully');
})

const server = app.listen(port, () => {
  console.log(`Consumer service listening on port ${port}`);
});

// Graceful shutdown handling
const gracefulShutdown = (signal: string) => {
  console.log(`\nReceived ${signal}. Starting graceful shutdown...`);

  server.close((err) => {
    if (err) {
      console.error('Error during server shutdown:', err);
      process.exit(1);
    }

    console.log('Server closed successfully.');

    // Close any other resources here (database connections, etc.)
    // For now, we just exit
    console.log('Graceful shutdown completed.');
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

// Handle common termination signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  gracefulShutdown('uncaughtException');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('unhandledRejection');
});