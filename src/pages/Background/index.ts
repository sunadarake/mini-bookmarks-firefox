import { Item } from "../../containers/item";
import { chromeCheckMigration, chromeSetFlagMigration, chromeStorageGet, chromeStorageSet, chromeStorageSyncGet } from "../Popup/ChromeUtil";

const setBadge = async () => {
    const items = await chromeStorageGet();
    const api = typeof browser !== 'undefined' ? browser : chrome;
    if (api.browserAction) {
        api.browserAction.setBadgeText({ text: (items || []).length.toString() });
    } else if (api.action) {
        api.action.setBadgeText({ text: (items || []).length.toString() });
    }
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

const api = typeof browser !== 'undefined' ? browser : chrome;
api.runtime.onStartup.addListener(() => {
    setBadge();
});

api.runtime.onInstalled.addListener(() => {
    updateStorage();
    setBadge();
});