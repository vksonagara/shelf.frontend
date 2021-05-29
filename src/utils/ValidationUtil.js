import { isString } from "formik";
import * as Yup from "yup";

const signUpSchema = Yup.object({
  firstName: Yup.string().min(3).max(32).required().label("First Name"),
  lastName: Yup.string().max(32).label("Last Name"),
  emailId: Yup.string().email().required().label("Email"),
  password: Yup.string().min(4).max(64).required().label("Password"),
});

const signInSchema = Yup.object({
  emailId: Yup.string().email().required().label("Email"),
  password: Yup.string().min(4).max(64).required().label("Password"),
});

const folderSchema = Yup.object({
  folderName: Yup.string().min(3).max(32).required().label("Folder Name"),
})

export { signUpSchema, signInSchema, folderSchema};
