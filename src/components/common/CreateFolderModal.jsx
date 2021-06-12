import { Formik } from "formik";
import { folderSchema } from "../../utils/ValidationUtil";
import notesApi from "../../api/notes";
import { useDispatch } from "react-redux";
import { createFolder } from "../../redux/folders";
import Modal from "./Modal/Modal";
import Input from "../common/Form/Input";

// Modal for Creating new Folder

function CreateFolderModal(prop) {
  const dispatch = useDispatch();

  // Formik Validation
  return (
    <Formik
      validationSchema={folderSchema}
      initialValues={{
        folderName: "",
      }}
      onSubmit={async (values, { resetForm }) => {
        const { data, error } = await notesApi.createFolder(values.folderName);
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
          <Modal
            show={prop.show}
            handleClose={prop.handleClose}
            func={handleSubmit}
            type="Create"
            title="Create a Folder"
          >
            <Input
              type="text"
              name="folderName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.folderName}
              errorMessage={touched.folderName && errors.folderName}
            />
          </Modal>
        );
      }}
    </Formik>
  );
}

export default CreateFolderModal;
