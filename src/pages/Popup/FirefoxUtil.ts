import { Item } from "../../containers/item";

/**
 * Firefox storage set function
 * 
 * @param updateItems
 */
export const firefoxStorageSet = (updateItems: Item[]) => {
    browser.storage.local.set({ MiniBookMark_Items: updateItems });
}

/**
 * Firefox storage get function
 * 
 * @returns
 */
export const firefoxStorageGet = async () => {
    const data = await browser.storage.local.get("MiniBookMark_Items") as { MiniBookMark_Items?: Item[] };
    return data.MiniBookMark_Items || [];
}

export const firefoxCheckMigration = async (): Promise<boolean> => {
    const data = await browser.storage.local.get("MiniBookMark_isMigration") as { MiniBookMark_isMigration?: number };
    return ("MiniBookMark_isMigration" in data);
}

export const firefoxSetFlagMigration = () => {
    browser.storage.local.set({ MiniBookMark_isMigration: 1 });
}

/**
 * Firefox storage sync get function
 * 
 * @returns
 */
export const firefoxStorageSyncGet = (): Promise<{ items: Item[] }> => {
    return browser.storage.sync.get("items") as Promise<{ items: Item[] }>;
}

/**
 * Firefox badge text function
 * 
 * @param newItems 
 */
export const firefoxSetBadgeText = (newItems: Item[]) => {
    browser.browserAction.setBadgeText({ text: (newItems || []).length.toString() });
};

/**
 * Firefox tabs query function
 * 
 * @returns 
 */
export const firefoxTabsQuery = () => {
    return browser.tabs.query({ active: true, currentWindow: true });
};