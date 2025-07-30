import { Item } from "../../containers/item";

/**
 * Cross-browser storage set function
 * 
 * @param updateItems
 */
export const chromeStorageSet = (updateItems: Item[]) => {
    if (typeof browser !== 'undefined') {
        browser.storage.local.set({ MiniBookMark_Items: updateItems });
    } else {
        chrome.storage.local.set({ MiniBookMark_Items: updateItems });
    }
}

/**
 * Cross-browser storage get function
 * 
 * @returns
 */
export const chromeStorageGet = async () => {
    if (typeof browser !== 'undefined') {
        const data = await browser.storage.local.get("MiniBookMark_Items") as { MiniBookMark_Items?: Item[] };
        return data.MiniBookMark_Items || [];
    } else {
        return new Promise<Item[]>((resolve) => {
            chrome.storage.local.get("MiniBookMark_Items", (data: { MiniBookMark_Items?: Item[] }) => {
                resolve(data.MiniBookMark_Items || []);
            });
        });
    }
}

export const chromeCheckMigration = async (): Promise<boolean> => {
    if (typeof browser !== 'undefined') {
        const data = await browser.storage.local.get("MiniBookMark_isMigration") as { MiniBookMark_isMigration?: number };
        return ("MiniBookMark_isMigration" in data);
    } else {
        return new Promise<boolean>((resolve) => {
            chrome.storage.local.get("MiniBookMark_isMigration", (data: { MiniBookMark_isMigration?: number }) => {
                resolve("MiniBookMark_isMigration" in data);
            });
        });
    }
}

export const chromeSetFlagMigration = () => {
    const api = typeof browser !== 'undefined' ? browser : chrome;
    api.storage.local.set({ MiniBookMark_isMigration: 1 });
}

/**
 * Cross-browser storage sync get function
 * 
 * @returns
 */
export const chromeStorageSyncGet = (): Promise<{ items: Item[] }> => {
    if (typeof browser !== 'undefined') {
        return browser.storage.sync.get("items") as Promise<{ items: Item[] }>;
    } else {
        return new Promise<{ items: Item[] }>((resolve) => {
            chrome.storage.sync.get("items", (data) => {
                resolve(data as { items: Item[] });
            });
        });
    }
}

/**
 * Cross-browser badge text function
 * 
 * @param newItems 
 */
export const chromeSetBadgeText = (newItems: Item[]) => {
    const api = typeof browser !== 'undefined' ? browser : chrome;
    if (api.browserAction) {
        api.browserAction.setBadgeText({ text: (newItems || []).length.toString() });
    } else if (api.action) {
        api.action.setBadgeText({ text: (newItems || []).length.toString() });
    }
};

/**
 * Cross-browser tabs query function
 * 
 * @returns 
 */
export const chromeTabsQuery = () => {
    const api = typeof browser !== 'undefined' ? browser : chrome;
    return api.tabs.query({ active: true, currentWindow: true });
};