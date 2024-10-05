import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../../const";
import { addContact } from "../../redux/contacts/operations";
import {
  errorNotification,
  successNotification,
} from "../../utils/notification";
import Button from "../Button/Button";
import FieldInput from "../FieldInput/FieldInput";
import { initialValues } from "./const";
import { validationSchema } from "./const/validation";
import css from "./ContactForm.module.css";

const ContactForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values))
      .unwrap()
      .then(() => {
        actions.resetForm();
        successNotification("Contact added");
      })
      .catch((error) => {
        if (error === "You are not authorized") {
          return navigate(ROUTERS.LOGIN);
        }
        errorNotification(error);
      });
  };

  return (
    <div className={css.wrapper}>
      <Formik
        validateOnBlur={false}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={css.form}>
          <FieldInput name="name" label="Name" />
          <FieldInput name="number" label="Number" placeholder="111-222-3333" />
          <div className={css.actions}>
            <Button type="submit">Add contact</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
