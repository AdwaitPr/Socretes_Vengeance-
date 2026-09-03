import { chromium } from 'playwright';
import { createServer } from 'http';
import handler from 'serve-handler';

(async () => {
  const server = createServer((request, response) => {
    return handler(request, response, { public: 'dist' });
  });

  server.listen(3000, async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'local_screenshot.png', fullPage: true });
    await browser.close();
    server.close();
  });
})();
