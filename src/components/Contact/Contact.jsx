import clsx from "clsx";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../../const";
import { deleteContact } from "../../redux/contacts/operations";
import { isApproved } from "../../utils/confirm";
import {
  errorNotification,
  successNotification,
} from "../../utils/notification";
import Button from "../Button/Button";
import css from "./Contact.module.css";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, name, number } = contact;

  const handleDeleteClick = () => {
    if (isApproved()) {
      dispatch(deleteContact(id))
        .unwrap()
        .then(() => {
          successNotification("Contact deleted");
        })
        .catch((error) => {
          if (error === "You are not authorized") {
            return navigate(ROUTERS.LOGIN);
          }
          errorNotification(error);
        });
    }
  };

  return (
    <div className={css.contact}>
      <div className={css.content}>
        <div className={clsx(css.row, css.name)}>
          <FaUser />
          <span>{name}</span>
        </div>
        <div className={css.row}>
          <FaPhoneAlt />
          <span>{number}</span>
        </div>
      </div>
      <div className={css.actions}>
        <Button onClick={handleDeleteClick}>Delete</Button>
      </div>
    </div>
  );
};

export default Contact;
