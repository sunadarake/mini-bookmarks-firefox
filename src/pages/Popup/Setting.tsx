import React, { useState } from "react";
import { Container, Button, Form, Alert } from "react-bootstrap";
import { Item } from "../../containers/item";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Common.css";
import { chromeSetBadgeText, chromeStorageGet, chromeStorageSet } from "./ChromeUtil";
import { Link } from "react-router-dom";

const Setting: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errorAlert, setErrorAlert] = useState("");
    const [successAlert, setSuccessAlert] = useState("");

    const readFileAsText = (file: File): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event: ProgressEvent<FileReader>) => {
                const fileContent = event.target?.result as string;
                resolve(fileContent);
            };

            reader.onerror = (event: ProgressEvent<FileReader>) => {
                reject(event.target?.error);
            };

            reader.readAsText(file);
        });
    };


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type === 'application/json') {
            setSelectedFile(file);
            setErrorAlert("");
        } else {
            setSelectedFile(null);
            setErrorAlert("JSONファイルを選択してください。");
        }
    };

    const handleImport = async () => {
        if (selectedFile) {
            const data = await readFileAsText(selectedFile);

            let newItems = JSON.parse(data) as Item[];

            let prevItems = await chromeStorageGet();
            prevItems = prevItems.filter(it => {
                return (newItems.some(nit => nit.url == it.url) == false);
            });

            const items = [...newItems, ...prevItems];

            chromeStorageSet(items);
            chromeSetBadgeText(items);
            setSuccessAlert("importが完了しました。");
        } else {
            setErrorAlert("JSONファイルを選択してください。");
        }
    };

    const handleExport = async () => {
        const data = await chromeStorageGet();
        const jsonData = JSON.stringify(data);

        const url = window.URL.createObjectURL(new Blob([jsonData], { type: 'application/json' }));
        let a = document.createElement('a');
        a.href = url;
        a.download = "mini-bookmark-export.json";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <Container className="p-3 bg-white rl-width">
            <div className="d-flex align-items-center justify-content-between mb-2">
                <Link to="/">Back</Link>
            </div>

            {errorAlert && (
                <Alert variant="danger" onClose={() => setErrorAlert("")} dismissible>
                    {errorAlert}
                </Alert>
            )}

            {successAlert && (
                <Alert variant="success" onClose={() => setSuccessAlert("")} dismissible>
                    {successAlert}
                </Alert>
            )}

            <div className="my-3">
                <h3>Import</h3>
                <Form>
                    <Form.Group>
                        <Form.Control type="file" accept=".json" onChange={handleFileChange} />

                        <Button variant="primary" onClick={handleImport}>
                            Import
                        </Button>
                    </Form.Group>
                </Form>
            </div>

            <div className="my-3">
                <h3>Export</h3>

                <Button variant="success" onClick={handleExport}>
                    Export
                </Button>
            </div>

        </Container >
    );
};

export default Setting;