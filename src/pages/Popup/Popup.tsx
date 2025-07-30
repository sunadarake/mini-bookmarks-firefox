import React, { useState, useEffect } from "react";
import { Container, Button, ListGroup, Form } from "react-bootstrap";
import { Item } from "../../containers/item";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Common.css";
import { chromeCheckMigration, chromeSetBadgeText, chromeStorageGet, chromeStorageSet, chromeTabsQuery } from "./ChromeUtil";
import { Link } from "react-router-dom";

const Popup: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  useEffect(() => {
    (async () => {
      const items = await chromeStorageGet();
      setItems(items);
    })();
  }, []);

  const saveURL = (url: string, hostName: string, title?: string) => {
    const filterItems = items.filter(it => it.url !== url);
    const newItems = [{ url, hostName, title }, ...filterItems];

    chromeStorageSet(newItems);
    setItems(newItems);

    chromeSetBadgeText(newItems);
  };

  const parseHost = (url: string): string => {
    const result = url.match(/^(https?:\/\/[^/]+)/);
    if (result !== null) {
      return result[1];
    } else {
      return "";
    }
  }

  const handleAddURL = async () => {
    const tabs = await chromeTabsQuery();

    if (tabs.length > 0) {
      const currentTab = tabs[0];
      const currentURL = currentTab.url;
      const pageTitle = currentTab.title;

      if (currentURL) {
        const hostName = parseHost(currentURL);
        saveURL(currentURL, hostName, pageTitle);
      }
    }
  };

  const handleDeleteURL = (url: string) => {
    const updateItems = items.filter(it => it.url !== url);
    setItems(updateItems);
    chromeStorageSet(updateItems);
    chromeSetBadgeText(updateItems);
  };

  const filteredItems = searchKeyword
    ? items.filter((it) => it.title?.toLowerCase().includes(searchKeyword.toLowerCase()))
    : items;

  return (
    <Container className="p-3 bg-white rl-width">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <Link to="/setting">Setting</Link>
        <span className="fw-bold fs-6">Total: {items.length}</span>

        <Button variant="success" className="btn-sm" onClick={() => handleAddURL()}>
          Add <i className="bi bi-plus"></i>
        </Button>
      </div>

      <Form className="mt-4 mb-3">
        <Form.Control
          type="text"
          placeholder="Search..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </Form>
      <ListGroup>
        {filteredItems.map(({ url, hostName, title }) => (
          <ListGroup.Item key={url} className="p-1 d-flex justify-content-between align-items-center">
            <a href={url} target="_blank" rel="noopener noreferrer" className="fs-6 text-decoration-none flex-grow-1">
              <img src={`https://www.google.com/s2/favicons?domain=${hostName}`} alt="Favicon" className="favicon-size" /> {title || url}
            </a>
            <Button variant="danger" size="sm" onClick={() => handleDeleteURL(url)}>
              <i className="bi bi-trash"></i>
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container >
  );
};

export default Popup;