import { Modal, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import { folderSchema } from "../../utils/ValidationUtil";
import notesApi from "../../api/notes";
import { useDispatch } from "react-redux";
import { renameFolder } from "../../redux/folders";

// Modal for rename folder

function RenameFolderModal(prop) {
  const dispatch = useDispatch();
  return (
    <Modal show={prop.show.value} onHide={prop.handleClose} centered>
      <Formik
        validationSchema={folderSchema}
        initialValues={{
          folderName: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          const { data, error } = await notesApi.renamefolder(
            prop.show.id,
            values.folderName
          );
          if (!error) {
            dispatch(
              renameFolder({
                id: prop.show.id,
                name: values.folderName,
              })
            );
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
                  Rename Folder
                </Button>
              </Modal.Footer>
            </>
          );
        }}
      </Formik>
    </Modal>
  );
}

export default RenameFolderModal;
