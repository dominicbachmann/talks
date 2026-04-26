import { HashbrownAnthropic } from '@hashbrownai/anthropic';
import express from 'express';
import { API_KEY} from "./key.js";

const app = express();
app.use(express.json());

app.post('/chat', async (req, res) => {
  const stream = HashbrownAnthropic.stream.text({
    apiKey: API_KEY,
    request: req.body,
  });

  res.header('Content-Type', 'application/octet-stream');

  for await (const chunk of stream) {
    res.write(chunk);
  }

  res.end();
});

app.listen(3000);
