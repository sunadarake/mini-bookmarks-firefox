import { Item } from "../../containers/item";
import { firefoxCheckMigration, firefoxSetFlagMigration, firefoxStorageGet, firefoxStorageSet, firefoxStorageSyncGet } from "../Popup/FirefoxUtil";

const setBadge = async () => {
    const items = await firefoxStorageGet();
    browser.browserAction.setBadgeText({ text: (items || []).length.toString() });
}

const updateStorage = async () => {
    const isMigration = await firefoxCheckMigration();

    if (isMigration) {
        const data = await firefoxStorageSyncGet();
        const items = data.items;

        if (items) {
            firefoxStorageSet(items);
        }

        firefoxSetFlagMigration();
    }
}

browser.runtime.onStartup.addListener(() => {
    setBadge();
});

browser.runtime.onInstalled.addListener(() => {
    updateStorage();
    setBadge();
});