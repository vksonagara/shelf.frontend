import { Formik } from "formik";
import { folderSchema } from "../../utils/ValidationUtil";
import notesApi from "../../api/notes";
import { useDispatch, useSelector } from "react-redux";
import { renameFolder } from "../../redux/folders";
import Modal from "./Modal/Modal";
import Input from "../common/Form/Input";

// Modal for rename folder

function RenameFolderModal(prop) {
  const dispatch = useDispatch();

  const currentFolderName = prop.show.name;

  return (
    <Formik
      validationSchema={folderSchema}
      enableReinitialize
      initialValues={{
        folderName: currentFolderName,
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

export default RenameFolderModal;
