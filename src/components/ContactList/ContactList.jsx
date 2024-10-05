import { useSelector } from "react-redux";
import {
  selectFilteredContacts,
  selectHasContacts,
} from "../../redux/contactsSlice";
import Contact from "../Contact/Contact";
import SearchBox from "../SearchBox/SearchBox";
import css from "./ContactList.module.css";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const hasContacts = useSelector(selectHasContacts);

  return (
    <div className={css.wrapper}>
      {hasContacts && <SearchBox />}
      <div className={css.contactList}>
        {filteredContacts.map((contact) => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
};

export default ContactList;
