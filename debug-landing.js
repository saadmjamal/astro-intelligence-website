const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    console.log('Navigating to localhost:3003...');
    await page.goto('http://localhost:3003', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    // Take screenshot
    await page.screenshot({ path: 'landing-page-debug.png', fullPage: true });
    console.log('Screenshot saved as landing-page-debug.png');
    
    // Get page content
    const content = await page.content();
    console.log('Page loaded, content length:', content.length);
    
    // Check for errors
    const errors = await page.evaluate(() => {
      const errors = [];
      const scripts = document.querySelectorAll('script[src]');
      scripts.forEach(script => {
        if (script.onerror) errors.push(script.src);
      });
      return errors;
    });
    
    console.log('Script errors:', errors);
    
    await browser.close();
  } catch (error) {
    console.error('Error:', error.message);
  }
})();