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

  const privateKey = "dad559bf62d418472d6265783fdc5fa5eccd3171f6b6b2fa6c6b650eaf797280";

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
  await page.waitForNavigation({
    waitUntil: "networkidle0"
  });

  const metamaskBtn = await page.$x('//*[@id="home"]/header/div/div/div[2]/button');
  await metamaskBtn[0].click();
  await metamask.approve();
  await metamask.sign();
  await page.waitForNavigation({
    waitUntil: "networkidle0"
  });
  await metamask.sign();
  await page.bringToFront();

  const workshopBtn = await page.$x('//*[@id="worldMap"]/div[2]/div[6]/a/button');
  await workshopBtn[0].click();
  await page.waitForNavigation({
    waitUntil: "networkidle0"
  });

  const modifyBtn = await page.$x('//*[@id="root"]/main/div[2]/div[1]/article/button[2]/section');
  await modifyBtn[0].click();

  const detailBike = await page.$x('//*[@id="root"]/main/div[2]/div[2]/div/div[1]/div/div/div');
  await detailBike[0].click();

  await page.waitForSelector('.MuiSelect-select', { visible: true });
  const selectBtn = await page.$x('/html/body/div[2]/div[3]/div[2]/div/div[2]/div[2]/div[6]');
  await selectBtn[0].click();

  const selectPart = await page.$x('//*[@id="menu-"]/div[3]/ul/li[3]');
  await selectPart[0].click();

  const saveBtn = await page.$x('/html/body/div[2]/div[3]/div[2]/div/div[2]/div[3]/div[2]/div');
  await saveBtn[0].click();

  const closeBtn = await page.$x('/html/body/div[2]/div[3]/button/span');
  await closeBtn[0].click();
  
  await detailBike[0].click();

  await page.waitForSelector('.MuiSelect-select', { visible: true });
  await selectBtn[0].click();

  const selectNone = await page.$x('//*[@id="menu-"]/div[3]/ul/li[1]');
  await selectNone[0].click();
  
  await saveBtn[0].click();

  await closeBtn[0].click();
  await sleep(2000)

  const backBtn = await page.$x('//*[@id="root"]/main/div[1]/div[2]/div[1]/div/div');
  await backBtn[0].click();
  await sleep(5000)

  await page.close();
  process.exit(0);
}

main();
