import { Formik } from "formik";
import { folderSchema } from "../../utils/ValidationUtil";
import notesApi from "../../api/notes";
import { useDispatch, useSelector } from "react-redux";
import { renameFolder } from "../../redux/folders";
import Modal from "./Modal/Modal";
import Input from "../common/Form/Input";
import { useEffect, useState } from "react";

// Modal for rename folder

function RenameFolderModal(prop) {
  const dispatch = useDispatch();
  // const [props, setProps] = useState({});

  // setProps(prop);

  // useEffect(() => {}, []);

  async function handleRename() {
    console.log(prop);
  }

  return (
    <Formik
      validationSchema={folderSchema}
      enableReinitialize
      initialValues={{
        folderName: prop.show.name,
        id: prop.show.id,
      }}
      onSubmit={async (values, { resetForm }) => {
        console.log(values);
        console.log(prop);
        const { data, error } = await notesApi.renamefolder(
          values.id,
          values.folderName
        );
        if (!error) {
          dispatch(
            renameFolder({
              id: values.id,
              name: values.folderName,
            })
          );
        }
        resetForm({});
        prop.handleClose();
        // setProps({});
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
            type="Rename"
            title="Rename Folder"
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
