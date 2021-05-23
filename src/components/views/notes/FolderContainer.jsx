import React from "react";

import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Form,
  InputGroup,
  Badge,
  Dropdown,
  Modal,
  Button,
} from "react-bootstrap";

import ModalDemo from "../../common/ModalDemo";

import userApi from "../../../api/users";
import { getAllFolders, deleteFolder, changeCurrentFolder } from "../../../redux/folders";

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
    <i
      className="bi bi-three-dots-vertical"
      style={{
        color: "white",
      }}
    ></i>
    {children}
  </a>
));

function FolderContainer() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const { folders, currentFolderId } = useSelector((state) => state.folders);

  useEffect(() => {
    userApi.getFolders().then(({ error, data }) => {
      if (error) {
        console.log(error);
      } else {
        dispatch(getAllFolders(data));
      }
    });
  }, []);
  return (
    <div
      style={{
        width: "280px",
        height: "100vh",
        padding: "1rem 1rem",
        backgroundColor: "rgb(29 50 70)",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Folder Container Header  */}
      <div
        style={{
          height: "90px",
        }}
      >
        <Form>
          <Form.Group
            controlId="exampleForm.SelectCustom"
            style={{
              margin: "0",
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
          On My Shelf
        </p>
      </div>
      {/* folder container body  */}
      <div
        id="foldersContainer"
        style={{
          overflowY: "auto",
          height: "calc(100vh - 170px)",
        }}
      >
        {folders.map((folder) => {
            const {id} = folder;
          return (
            <section className={`folder ${folder.id == currentFolderId ? "active-folder" : ""}`} style= {{
                cursor: "pointer",
            }}>
              <div onClick = {() => {   
                  dispatch(changeCurrentFolder(id));
              }}>
                <i className="bi bi-folder folder-icon">
                  <Badge className="badge">{folder.notesCount}</Badge>
                </i>
                <div>
                  <p className="folder-para1">{folder.name}</p>
                  <p className="folder-para2">{folder.updatedAt}</p>
                </div>
              </div>
              <Dropdown>
                <Dropdown.Toggle
                  as={CustomToggle}
                  id="dropdown-custom-components"
                ></Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="1">Rename</Dropdown.Item>
                  <Dropdown.Item
                    eventKey="2"
                    onClick={async () => {
                    console.log(id)
                      const { data, error } = await userApi.deletefolder(id);
                      if (error) {
                        console.log(error);
                      } else{
                        dispatch(deleteFolder(id));
                      }
                    }}
                  >
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </section>
          );
        })}
      </div>

      {/* folder container footer  */}
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          height: "50px",
        }}
      >
        <div
          className="d-flex align-items-center"
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            handleShow();
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
            New Folder
          </p>
        </div>
      </div>
      <ModalDemo
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </div>
  );
}

export default FolderContainer;