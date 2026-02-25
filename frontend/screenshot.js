const puppeteer = require('puppeteer');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  console.log('Taking screenshot of Hero section...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await sleep(3000);
  await page.screenshot({ path: '/home/chizmoonn/Downloads/coding/clubit/screenshot-hero.png', fullPage: false });
  
  console.log('Taking screenshot of About section...');
  await page.evaluate(() => window.scrollTo(0, 900));
  await sleep(1000);
  await page.screenshot({ path: '/home/chizmoonn/Downloads/coding/clubit/screenshot-about.png', fullPage: false });
  
  console.log('Taking screenshot of Team section...');
  await page.evaluate(() => window.scrollTo(0, 2200));
  await sleep(1000);
  await page.screenshot({ path: '/home/chizmoonn/Downloads/coding/clubit/screenshot-team.png', fullPage: false });
  
  console.log('Taking screenshot of Projects section...');
  await page.evaluate(() => window.scrollTo(0, 3500));
  await sleep(1000);
  await page.screenshot({ path: '/home/chizmoonn/Downloads/coding/clubit/screenshot-projects.png', fullPage: false });
  
  await browser.close();
  console.log('Screenshots saved!');
})();
