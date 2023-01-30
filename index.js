import puppeteer from "puppeteer";
import dappeteer from "@chainsafe/dappeteer";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const [metamask, page] = await dappeteer.bootstrap(puppeteer, {
    metamaskVersion: "v10.15.0",
    headless: false,
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

  const selector = await page.$x('//*[@id="home"]/header/div/div/div[2]/button');
  await selector[0].click();
  await metamask.approve();
  await metamask.sign();
  await page.bringToFront();
  await sleep(10000);
  const raceClick = await page.$x('//*[@id="worldMap"]/div[2]/div[3]/a/button');
  await raceClick[0].click();
  const trackClick = await page.$x('//*[@id="root"]/div/div[2]/div[1]/div');
  await trackClick[0].click();

  //   var originSelector = await page.$x(
  //     '//button[contains(@class,"MuiButtonBase-root")]'
  //   );

  //   await originSelector[0].click();
  //   await originSelector[0].click();
  //   var input = await page.waitForSelector("input#token-search-input");
  //   await input.type("BNB");
  //   input = await page.$x(
  //     '//div[contains(@class,"token-item-0x264c1383EA520f73dd837F915ef3a732e204a493")]'
  //   );
  //   await input[0].click();
  //   await sleep(2000);
  //   await originSelector[1].click();
  //   var input = await page.waitForSelector("input#token-search-input");
  //   await input.type("USDC");
  //   input = await page.$x('//div[contains(@class,"token-item-")]');
  //   await input[0].click();
  //   await sleep(2000);
  //   input = await page.$x('//*[contains(@title,"Token Amount")]');
  //   await input[0].type("1");
  //   await sleep(1000);
  //   input = await page.$x('//button[contains(text(),"Connect Wallet")]');
  //   await input[0].click();
  //   input = await page.waitForSelector("button#connect-METAMASK");
  //   await input.click();
  //   await metamask.approve({ allAccounts: false });
  //   page.bringToFront();
  //   input = await page.waitForSelector("button#swap-button");
  //   await input.click();
  //   await metamask.confirmTransaction();
}

main();
