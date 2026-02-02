import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

type webhookRequest = {
  url: string;
  event: string;
}

const db: webhookRequest[] = [];

app.get('/', (req, res) => {
  res.send('Producer service is running!');
});

app.post('/register/webhook', (req, res) => {
  const body = req.body;
  db.push(body);
  res.status(200).send('Webhook registered successfully');
})

app.get('/purchase', async (req, res) => {
  try {
    // Simulate a purchase event
    const webhookPromises = db.map(async (webhook) => {
      console.log(`Sending ${webhook.event} event to ${webhook.url}`);
      try {
        const response = await fetch(webhook.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ event: webhook.event, data: { item: 'Sample Item', price: 100 } })
        });
        console.log(`Webhook sent to ${webhook.url} with status ${response.status}`);
        return { url: webhook.url, status: response.status };
      } catch (error) {
        console.error(`Error sending webhook to ${webhook.url}:`, error);
        return { url: webhook.url, error: error instanceof Error ? error.message : String(error) };
      }
    });

    const results = await Promise.all(webhookPromises);
    res.json({
      message: 'Purchase event processed',
      webhooksTriggered: results.length,
      results: results
    });
  } catch (error) {
    console.error('Error processing purchase event:', error);
    res.status(500).json({ error: 'Failed to process purchase event' });
  }
})

const server = app.listen(port, () => {
  console.log(`Producer service listening on port ${port}`);
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