import { Form, InputGroup, Badge } from "react-bootstrap";

function NotesDashboard() {
  return (
    <div
      style={{
        position: "relative",
        left: "75px",
        display: "flex",
      }}
    >
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
          <section className="folder">
            <div>
              <i className="bi bi-folder folder-icon">
                <Badge className="badge">9</Badge>
              </i>
              <div>
                <p className="folder-para1">my docs</p>
                <p className="folder-para2">5 min ago</p>
              </div>
            </div>
            <i class="bi bi-three-dots-vertical"></i>
          </section>
          <section className="folder">
            <div>
              <i className="bi bi-folder folder-icon">
                <Badge className="badge">9</Badge>
              </i>
              <div>
                <p className="folder-para1">
                  ssuhdosjfofohslodhfohdfsdofhoofsodf kbskaibdibsaibdbasdia{" "}
                </p>
                <p className="folder-para2">5 min ago</p>
              </div>
            </div>
            <i class="bi bi-three-dots-vertical"></i>
          </section>
        </div>
        {/* folder container footer  */}
        <div
          className=" d-flex align-items-center justify-content-center" 
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
            New Folder
          </p>
        </div>
      </div>
      {/* Notes Container  */}
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
          <Form className= "d-flex">
            <Form.Group
              controlId="exampleForm.SelectCustom"
              style={{
                margin: "0",
                width: "220px"
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
            <i class="bi bi-three-dots-vertical"></i>
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
      </div>
  );
}

export default NotesDashboard;
