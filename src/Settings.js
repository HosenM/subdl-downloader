// src/components/Settings.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

const Settings = ({ show, handleClose, info, handleChange }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="settings-item">
          <label>API Key:</label>
          <input
            type="text"
            name="api"
            value={info.api}
            onChange={handleChange}
          />
        </div>
        <div className="settings-item">
          <label>Language:</label>
          <input
            type="text"
            name="language"
            value={info.language}
            onChange={handleChange}
          />
        </div>
        <div className="settings-item">
          <label>Subtitles Per Page:</label>
          <input
            type="number"
            name="subsPerPage"
            value={info.subsPerPage}
            onChange={handleChange}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Settings;
