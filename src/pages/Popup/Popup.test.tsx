import { waitFor, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Popup from "./Popup";
import React from "react";
import * as chromeUtil from "./ChromeUtil";
import { Item } from "../../containers/item";

test("renders Add button", async () => {
    // We retrieve the list of registered sites from the Storage,
    // when the popup is displayed, 
    jest.spyOn(chromeUtil, "chromeStorageGet").mockImplementation(() => {
        const items = [
            { url: "https://example.com", title: "Example", hostName: "https://example.com" },
            { url: "https://test.com", title: "Test", hostName: "https://test.com" },
        ]

        return Promise.resolve(items);
    });

    render(<Popup />);

    const addButton = await screen.findByRole("button", { name: /add/i });
    expect(addButton).toBeInTheDocument();
});

test("renders Total URLs count", async () => {
    // We retrieve the list of registered sites from the Storage,
    // when the popup is displayed, 
    jest.spyOn(chromeUtil, "chromeStorageGet").mockImplementation(() => {
        const items = [
            { url: "https://example.com", title: "Example", hostName: "https://example.com" },
            { url: "https://test.com", title: "Test", hostName: "https://test.com" },
        ];

        return Promise.resolve(items);
    });

    render(<Popup />);

    const totalUrlsCount = await screen.findByText("Total: 2");
    expect(totalUrlsCount).toBeInTheDocument();
});

test("When we click the 'Add' button, the current URL will be registered.", async () => {
    // We retrieve the list of registered sites from the Storage,
    // when the popup is displayed, 
    jest.spyOn(chromeUtil, "chromeStorageGet").mockImplementation(() => {
        const items = [
            { url: "https://example.com", title: "Example", hostName: "https://example.com" },
        ];

        return Promise.resolve(items);
    });

    // We obtain the current tab's URL and title, When the Add button is clicked.
    jest.spyOn(chromeUtil, "chromeTabsQuery").mockImplementation(() => {
        const tabs = [
            {
                url: "https://test.com", title: "Test", favicon: "https://test.com/favicon.ico",
                // The values of the following properties are not relevant to the test, 
                // but they are defined to fulfill the Interface.
                index: 0, pinned: false, highlighted: false, windowId: 0, active: true, incognito: false,
                selected: false, discarded: false, autoDiscardable: false, groupId: 0,
            },
        ]

        return Promise.resolve(tabs);
    });

    // The Storage and the badge number will be updated, when the Add button is clicked,
    jest.spyOn(chromeUtil, "chromeSetBadgeText").mockImplementation((_: Item[]) => { });
    jest.spyOn(chromeUtil, "chromeStorageSet").mockImplementation((_: Item[]) => { });

    render(<Popup />);

    const addButton = await screen.findByRole("button", { name: /add/i });
    fireEvent.click(addButton);

    const newListItem = await screen.findByText("Test");
    expect(newListItem).toBeInTheDocument();
});
