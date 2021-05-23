import { Modal, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import { folderSchema } from "../../utils/ValidationUtil";
import userApi from "../../api/users";
import { useDispatch, useSelector } from "react-redux";
import { createFolder } from "../../redux/folders";

function ModalDemo(prop) {
  const dispatch = useDispatch();
  return (
    <Modal show={prop.show} onHide={prop.handleClose} centered>
      <Formik
        validationSchema={folderSchema}
        initialValues={{
          folderName: "",
        }}
        onSubmit={async (values, {resetForm}) => {
          const { data, error } = await userApi.createFolder(values.folderName);
          if (error) {
            console.log(error);
          } else {
            console.log(data);
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
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  disabled={isSubmitting}
                  type="submit"
                  onClick = {() => {
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

export default ModalDemo;
