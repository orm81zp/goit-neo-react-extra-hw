import clsx from "clsx";
import { FaCalendar, FaPhoneAlt, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";
import { isApproved } from "../../utils/confirm";
import Button from "../Button/Button";
import css from "./Contact.module.css";
import { getFormatedDate } from "./utils";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const { id, name, number, createdAt } = contact;

  const handleDeleteClick = () => {
    if (isApproved()) {
      dispatch(deleteContact(id));
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
        <div className={clsx(css.row, css.date)}>
          <FaCalendar />
          <span>{getFormatedDate(createdAt)}</span>
        </div>
      </div>
      <div className={css.actions}>
        <Button onClick={handleDeleteClick}>Delete</Button>
      </div>
    </div>
  );
};

export default Contact;
