import { Modal, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import { folderSchema } from "../../utils/ValidationUtil";
import notesApi from "../../api/notes";
import { useDispatch } from "react-redux";
import { createFolder } from "../../redux/folders";

// MOdal for Creating new Folder

function CreateFolderModal(prop) {
  const dispatch = useDispatch();
  return (
    <Modal show={prop.show} onHide={prop.handleClose} centered>
      <Formik
        validationSchema={folderSchema}
        initialValues={{
          folderName: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          const { data, error } = await notesApi.createFolder(
            values.folderName
          );
          if (!error) {
            dispatch(createFolder(data));
           }
          resetForm({});
          prop.handleClose();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => {
          return (
            <>
              <Modal.Header closeButton>
                <Modal.Title>Folder Name</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Control
                  type="text"
                  className="input mt-0"
                  name="folderName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.folderName}
                />
                {touched.folderName && errors.folderName && (
                  <p
                  className="m-0 p-0 text-danger"
                  style={{
                    fontSize: "11px",
                  }}
                >
                  {errors.folderName}
                </p>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  disabled={isSubmitting}
                  type="submit"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Create New
                </Button>
              </Modal.Footer>
            </>
          );
        }}
      </Formik>
    </Modal>
  );
}

export default CreateFolderModal;
