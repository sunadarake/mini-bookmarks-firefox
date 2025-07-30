// Firefox WebExtensions API types
declare namespace browser {
  namespace storage {
    interface StorageArea {
      get(keys?: string | string[] | Record<string, any> | null): Promise<Record<string, any>>;
      set(items: Record<string, any>): Promise<void>;
    }
    const local: StorageArea;
    const sync: StorageArea;
  }

  namespace browserAction {
    function setBadgeText(details: { text: string; tabId?: number }): Promise<void>;
  }

  namespace action {
    function setBadgeText(details: { text: string; tabId?: number }): Promise<void>;
  }

  namespace tabs {
    interface Tab {
      id?: number;
      url?: string;
      title?: string;
      active: boolean;
      windowId: number;
    }
    function query(queryInfo: { active?: boolean; currentWindow?: boolean }): Promise<Tab[]>;
  }

  namespace runtime {
    interface Event<T extends Function> {
      addListener(callback: T): void;
      removeListener(callback: T): void;
    }
    const onStartup: Event<() => void>;
    const onInstalled: Event<() => void>;
  }
}

// Chrome Extensions API types (for compatibility)
declare namespace chrome {
  namespace storage {
    interface StorageArea {
      get(keys?: string | string[] | Record<string, any> | null, callback?: (items: Record<string, any>) => void): void;
      get(keys?: string | string[] | Record<string, any> | null): Promise<Record<string, any>>;
      set(items: Record<string, any>, callback?: () => void): void;
    }
    const local: StorageArea;
    const sync: StorageArea;
  }

  namespace action {
    function setBadgeText(details: { text: string; tabId?: number }, callback?: () => void): void;
  }

  namespace browserAction {
    function setBadgeText(details: { text: string; tabId?: number }, callback?: () => void): void;
  }

  namespace tabs {
    interface Tab {
      id?: number;
      url?: string;
      title?: string;
      active: boolean;
      windowId: number;
    }
    function query(queryInfo: { active?: boolean; currentWindow?: boolean }, callback?: (tabs: Tab[]) => void): void;
    function query(queryInfo: { active?: boolean; currentWindow?: boolean }): Promise<Tab[]>;
  }

  namespace runtime {
    interface Event<T extends Function> {
      addListener(callback: T): void;
      removeListener(callback: T): void;
    }
    const onStartup: Event<() => void>;
    const onInstalled: Event<() => void>;
  }
}