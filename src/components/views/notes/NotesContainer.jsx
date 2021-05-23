import React from "react";

import { Form, InputGroup, Badge, Dropdown } from "react-bootstrap";


const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {/* Render custom icon here */}
      <i class="bi bi-three-dots-vertical" style= {{
          color: "white",
      }}></i>
      {children}
    </a>
  ));

function NotesContainer() {
  return (
    <div
      style={{
        backgroundColor: "rgb(47 86 123)",
        width: "380px",
        height: "100vh",
        padding: "1rem 1rem",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* notes Container Header  */}
      <div
        style={{
          height: "90px",
        }}
      >
        <Form className="d-flex">
          <Form.Group
            controlId="exampleForm.SelectCustom"
            style={{
              margin: "0",
              width: "220px",
            }}
            className="d-flex justify-content-between align-items-center"
          >
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i class="bi bi-sort-down"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                as="select"
                custom
                className="input"
                style={{
                  margin: "0",
                  width: "140px",
                }}
              >
                <option>Sort By</option>
                <option>Notes</option>
                <option>Created At</option>
              </Form.Control>
            </InputGroup>
          </Form.Group>
        </Form>
        <p
          style={{
            margin: "1rem 0",
            fontSize: "0.75rem",
            fontWeight: "600",
          }}
        >
          Folder
        </p>
      </div>
      {/* Notes container body  */}
      <div
        id="notesContainer"
        style={{
          overflowY: "auto",
          height: "calc(100vh - 170px)",
        }}
      >
        <section className="notes">
          <div>
            <i class="bi bi-journal folder-icon"></i>
            <div>
              <p className="notes-para1">my docs</p>
              <p className="notes-para2">5 min ago</p>
            </div>
          </div>
          <Dropdown>
            <Dropdown.Toggle
              as={CustomToggle}
              id="dropdown-custom-components"
            ></Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="1">Rename</Dropdown.Item>
              <Dropdown.Item eventKey="2">Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </section>
      </div>
      {/* notes container footer  */}
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          height: "50px",
        }}
      >
        <i className="bi bi-plus-circle mr-1 icon-20"></i>
        <p
          className="mb-0"
          style={{
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          New Note
        </p>
      </div>
    </div>
  );
}

export default NotesContainer;
