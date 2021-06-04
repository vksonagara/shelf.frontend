import { Formik } from "formik";
import { folderSchema } from "../../utils/ValidationUtil";
import notesApi from "../../api/notes";
import { useDispatch } from "react-redux";
import { createFolder } from "../../redux/folders";

// MOdal for Creating new Folder

function CreateFolderModal(prop) {
  const dispatch = useDispatch();
  return (
    <div show={prop.show} onHide={prop.handleClose} centered>
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
              <div closeButton>
                <div>Folder Name</div>
              </div>
              <div>
                <input
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
              </div>
              <div>
                <button
                  variant="primary"
                  disabled={isSubmitting}
                  type="submit"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Create New
                </button>
              </div>
            </>
          );
        }}
      </Formik>
    </div>
  );
}

export default CreateFolderModal;
