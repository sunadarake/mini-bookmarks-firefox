import { Item } from "../../containers/item";
import { chromeCheckMigration, chromeSetFlagMigration, chromeStorageGet, chromeStorageSet, chromeStorageSyncGet } from "../Popup/ChromeUtil";

const setBadge = async () => {
    const items = await chromeStorageGet();
    chrome.action.setBadgeText({ text: (items || []).length.toString() });
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

chrome.runtime.onStartup.addListener(() => {
    setBadge();
});

chrome.runtime.onInstalled.addListener(() => {
    updateStorage();
    setBadge();
});