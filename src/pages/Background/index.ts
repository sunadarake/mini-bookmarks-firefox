import { Item } from "../../containers/item";
import { chromeCheckMigration, chromeSetFlagMigration, chromeStorageGet, chromeStorageSet, chromeStorageSyncGet } from "../Popup/ChromeUtil";

const setBadge = async () => {
    const items = await chromeStorageGet();
    browser.browserAction.setBadgeText({ text: (items || []).length.toString() });
}

const updateStorage = async () => {
    const isMigration = await chromeCheckMigration();

    if (isMigration) {
        const data = await chromeStorageSyncGet();
        const items = data.items;

        if (items) {
            chromeStorageSet(items);
        }

        chromeSetFlagMigration();
    }
}

browser.runtime.onStartup.addListener(() => {
    setBadge();
});

browser.runtime.onInstalled.addListener(() => {
    updateStorage();
    setBadge();
});