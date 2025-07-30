import { Item } from "../../containers/item";

/**
 * https://developer.chrome.com/docs/extensions/reference/storage/#type-StorageArea
 * 
 * @param updateItems
 */
export const chromeStorageSet = (updateItems: Item[]) => {
    chrome.storage.local.set({ MiniBookMark_Items: updateItems });
}

/**
 * https://developer.chrome.com/docs/extensions/reference/storage/#type-StorageArea
 * 
 * @returns
 */
export const chromeStorageGet = async () => {
    const data = await <{ MiniBookMark_Items?: Item[] }>chrome.storage.local.get("MiniBookMark_Items");

    return data.MiniBookMark_Items || [];
}

export const chromeCheckMigration = async (): Promise<boolean> => {
    const data = await <{ MiniBookMark_isMigration?: number }>chrome.storage.local.get("MiniBookMark_isMigration");
    return ("MiniBookMark_isMigration" in data);
}

export const chromeSetFlagMigration = () => {
    chrome.storage.local.set({ MiniBookMark_isMigration: 1 });
}

/**
 * https://developer.chrome.com/docs/extensions/reference/storage/#type-StorageArea
 * 
 * @returns
 */
export const chromeStorageSyncGet = (): Promise<{ items: Item[] }> => {
    return chrome.storage.sync.get("items") as Promise<{ items: Item[] }>;
}

/**
 * https://developer.chrome.com/docs/extensions/reference/action/#method-setBadgeText
 * 
 * @param newItems 
 */
export const chromeSetBadgeText = (newItems: Item[]) => {
    chrome.action.setBadgeText({ text: (newItems || []).length.toString() });
};

/**
 * https://developer.chrome.com/docs/extensions/reference/tabs/#method-query
 * 
 * @returns 
 */
export const chromeTabsQuery = () => {
    return chrome.tabs.query({ active: true, currentWindow: true });
};