const wdio = require("webdriverio");
const chromedriver = require('chromedriver');

const opts = {
  path: '/',
  port: 4723,
  capabilities: {
    platformName: "Android",
    "appium:platformVersion": "12", // 実際のAndroidバージョンに置き換えてください
    "appium:deviceName": "93VX1YBQL", // 実際のデバイス名に置き換えてください
    browserName: "Chrome",
    "appium:automationName": "UiAutomator2",
    "appium:chromedriverExecutable": chromedriver.path // chromedriver のパスを指定
  }
};

async function main () {
  const client = await wdio.remote(opts);

  // Google 検索ページを開く
  await client.url('https://www.google.com');

  // ページが完全に読み込まれるまで待機
  await client.pause(5000);

  // 検索ボックスを見つけて「あいうえお」と入力
  const searchBox = await client.$('textarea[name="q"]');
  await searchBox.setValue('あいうえお');
  await client.keys(['Enter']); // Enterキーを送信

  // // 検索結果が表示されるまで待機
  // await client.pause(5000);

  // await client.deleteSession();
}

main();