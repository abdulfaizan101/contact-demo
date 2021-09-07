
import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
function SaveContact({ setContacts, getEditIndex }) {
  const history = useHistory();
  let [contact, setContact] = useState({ name: '', discription: '' });
  const [ButtonDisabled, setButtonDisabled] = useState({ buttonDisabled: true });
  const validator = useRef(new SimpleReactValidator())
  useEffect(() => {
    if (validator.current.allValid()) {
      setButtonDisabled({ buttonDisabled: false });
    } else {
      setButtonDisabled({ buttonDisabled: true });
    }
  }, [contact])

  useEffect(() => {
    if (getEditIndex != null) {
      setContact({ name: getEditIndex.number, discription: getEditIndex.name })
    }
  }, [])

  const validate = (val) => {
    setContact({ ...contact, [val.target.name]: val.target.value });
    validator.current.showMessageFor(val.target.name);
  }
  const cancel = (event) => {
    event.preventDefault();
    history.push('/');
  }

  const add = (event) => {
    event.preventDefault();
    let i = { ...contact };
    if (getEditIndex != null) {
      i = {
        'name': i.discription, 'number': i.name, 'priority': getEditIndex.priority, 'id': getEditIndex.id
      }
    }
    setContacts(i);

    history.push('/');

    // if (viewProf && viewProf.name != null) {
    //   for (var i = 0; i < allContact.length; i++) {
    //     if (allContact[i].id === viewProf.id) {
    //       allContact.splice(i, 1);
    //       break;
    //     }
    //   }
    //   setSetAllContact([...allContact, { ...contact, priority: viewProf.priority, id: viewProf.id }])
    // } else {
    //   let pre = allContact.length > 0 ? parseInt(allContact[(allContact.length - 1)].priority) + 1 : 1;
    //   setSetAllContact([...allContact, { ...contact, priority: pre, id: (allContact.length + 1) }])
    // }
    // if (page != 4) {
    //   setPage(1)
    // }
    // if (page === 4) {
    //   setContact({ name: '', discription: '' });
    // }
  }
  return (
    <div className="main-container">
      <div className="inner_container">
        <div className="add_phone">
          <form>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input type="text" className="form-control" placeholder="Lorem ipsum" name="discription" id="floatingPassword" onChange={validate} value={contact.discription} />
              <div className="form-group" style={{ color: 'red' }}>
                {validator.current.message('discription', contact.discription, 'required|alpha')}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Phone no</label>
              <input type="text" className="form-control" placeholder="+1 (000) 000- 000" name="name" id="floatingInput" onChange={validate} value={contact.name} />
              <div className="form-group" style={{ color: 'red' }}>
                {validator.current.message('name', contact.name, 'required|phone')}
              </div>
            </div>
            <div className="buttons_row d-flex justify-content-between">
              <button className="btn btn-brand" onClick={cancel} > Cancel</button>
              <button onClick={add} className="btn btn-brand" disabled={ButtonDisabled.buttonDisabled}>Save</button>
            </div>
          </form>
        </div>
      </div>
      <footer />
    </div>);
}
export default SaveContact;