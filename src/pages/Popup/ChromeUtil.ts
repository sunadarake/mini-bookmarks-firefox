import { Item } from "../../containers/item";

/**
 * Firefox storage set function
 * 
 * @param updateItems
 */
export const chromeStorageSet = (updateItems: Item[]) => {
    browser.storage.local.set({ MiniBookMark_Items: updateItems });
}

/**
 * Cross-browser storage get function
 * 
 * @returns
 */
export const chromeStorageGet = async () => {
    const data = await browser.storage.local.get("MiniBookMark_Items") as { MiniBookMark_Items?: Item[] };
    return data.MiniBookMark_Items || [];
}

export const chromeCheckMigration = async (): Promise<boolean> => {
    const data = await browser.storage.local.get("MiniBookMark_isMigration") as { MiniBookMark_isMigration?: number };
    return ("MiniBookMark_isMigration" in data);
}

export const chromeSetFlagMigration = () => {
    browser.storage.local.set({ MiniBookMark_isMigration: 1 });
}

/**
 * Cross-browser storage sync get function
 * 
 * @returns
 */
export const chromeStorageSyncGet = (): Promise<{ items: Item[] }> => {
    return browser.storage.sync.get("items") as Promise<{ items: Item[] }>;
}

/**
 * Firefox badge text function
 * 
 * @param newItems 
 */
export const chromeSetBadgeText = (newItems: Item[]) => {
    browser.browserAction.setBadgeText({ text: (newItems || []).length.toString() });
};

/**
 * Firefox tabs query function
 * 
 * @returns 
 */
export const chromeTabsQuery = () => {
    return browser.tabs.query({ active: true, currentWindow: true });
};