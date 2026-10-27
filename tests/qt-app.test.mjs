/**
 * Installs qBittorrent (a Qt desktop app) on Linux, turns on its Web UI on port 9090,
 * and reopens Preferences to check the setting was saved.
 */
import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("qBittorrent (Qt)", () => {
  it("saves a new Web UI port in Preferences", async (context) => {
    const testdriver = TestDriver(context);

    // Install qBittorrent from the Ubuntu archive.
    await testdriver.exec(
      "sh",
      "sudo apt-get update -qq && sudo DEBIAN_FRONTEND=noninteractive apt-get install -y -qq qbittorrent",
      300000,
    );

    // Start the replay recording, then launch the app.
    await testdriver.provision.dashcam({ title: "qBittorrent (Qt) Web UI port", webLogs: false });
    await testdriver.exec("sh", "nohup qbittorrent >/tmp/qbittorrent.log 2>&1 &", 10000);

    // The first launch shows a legal notice. Wait for it and accept.
    await testdriver.find("the I Agree button in the qBittorrent Legal Notice dialog", { timeout: 60000 }).click();

    // Open Tools > Preferences and go to the Web UI page.
    await testdriver.find("the Tools menu in the qBittorrent menu bar").click();
    await testdriver.find("the Preferences item in the open Tools menu").click();
    await testdriver.find("the Web UI section in the left sidebar of the Preferences dialog").click();

    // Turn on the Web UI and change its port from 8080 to 9090.
    await testdriver.find("the Web User Interface (Remote control) checkbox at the top of the Web UI page").click();
    await testdriver.find("the Port field showing 8080 next to the IP address field on the Web UI page").click();
    await testdriver.pressKeys(["ctrl", "a"]);
    await testdriver.type("9090");

    // Save and close.
    await testdriver.find("the OK button with a green checkmark at the bottom right of the Preferences dialog").click();

    // Reopen Preferences on the Web UI page.
    await testdriver.find("the Tools menu in the qBittorrent menu bar").click();
    await testdriver.find("the Preferences item in the open Tools menu").click();
    await testdriver.find("the Web UI section in the left sidebar of the Preferences dialog").click();

    // Wait for the saved port, then check both settings stuck.
    await testdriver.find("the Port field showing 9090 on the Web UI page", { timeout: 15000 });
    const saved = await testdriver.assert(
      "the qBittorrent Preferences dialog shows the Web UI page with the Web User Interface (Remote control) checkbox checked and the Port field set to 9090",
    );
    expect(saved).toBeTruthy();
  });
});
