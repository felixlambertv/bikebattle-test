import puppeteer from "puppeteer";
import dappeteer from "@chainsafe/dappeteer";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const [metamask, page] = await dappeteer.bootstrap(puppeteer, {
    metamaskVersion: "v10.15.0",
    headless: false,
    args: [
      "--start-maximized"
    ],
    defaultViewport: null,
  });

  const privateKey = "";

  await metamask.addNetwork({
    networkName: "mumbai",
    rpc: "https://rpc.ankr.com/polygon_mumbai",
    chainId: "80001",
    symbol: "MATIC",
  });

  await metamask.importPK(privateKey);

  await metamask.switchNetwork("mumbai");
  await page.goto("https://d3e1l1gu50a5dq.cloudfront.net/");
  await page.bringToFront();
  await sleep(2000);

  const metamaskBtn = await page.$x('//*[@id="home"]/header/div/div/div[2]/button');
  await metamaskBtn[0].click();
  await metamask.approve();
  await metamask.sign();
  await page.bringToFront();
  await sleep(6000);
  const raceClick = await page.$x('//*[@id="worldMap"]/div[2]/div[3]/a/button');
  await raceClick[0].click();
  await page.waitForNavigation({
    waitUntil: "networkidle0"
  });
  const trackClick = await page.$x('//*[@id="root"]/div/div[2]/div[1]/div/div/div');
  await trackClick[0].click();
  const bikeSelector = await page.$x('//*[@id="root"]/div/div[3]/div[2]/div[2]/div/div/div');
  await bikeSelector[0].click();
  const joinRaceBtn = await page.$x('//*[@id="root"]/div/div[3]/div[3]/div[1]');
  await joinRaceBtn[0].click();
  await sleep(5000);
  await page.waitForSelector('.MuiBox-root', { visible: true });
  const startRaceBtn = await page.$x('/html/body/div[2]/div[3]/div[2]/div/div[4]/div');
  await startRaceBtn[0].click();
  await sleep(10000);
  await page.close();
  process.exit(0);
}

main();
