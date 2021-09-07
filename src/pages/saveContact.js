import Nav from '../components/nav';
import Save from '../components/saveContact';

function SaveContact({ setContacts, getEditIndex }) {
  return (
    <div className="wrapper">
      <div className="container">
        <Nav />
        <Save setContacts={setContacts} getEditIndex={getEditIndex} />
      </div>
    </div>
  )
}

export default SaveContact;