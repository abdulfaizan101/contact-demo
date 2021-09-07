import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const ContactList = lazy(() => import('./pages/contactList'));
const SaveContact = lazy(() => import('./pages/saveContact'));
function App() {
  const [active, setActive] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const [contacts, setContacts] = useState([
    {
      name: 'Abdul Faizan',
      number: '+923242403403',
      id: 1,
      priority: 1
    },
    {
      name: 'Abid',
      number: '+923242403402',
      id: 2,
      active: false,
      priority: 2
    },
    {
      name: 'Abdullah',
      number: '+923242403405',
      id: 3,
      active: false,
      priority: 3
    }
  ]);

  const setActivefun = (id) => {
    if (active == id) {
      setActive(0);
      return;
    }
    setActive(id);
  }

  const delet = (id) => {
    let a = [...contacts]
    for (var i = 0; i < contacts.length; i++) {
      if (contacts[i].id == id) {
        a.splice(i, 1)
        setContacts([...a]);
        break;
      }
    }

  }
  const saveContact = (contact) => {
    if (contact.id) {
      let i = contacts.filter((item) => item.id != contact.id);
      setContacts([...i, { ...contact }])
      return
    }
    let pre = contacts.length > 0 ? parseInt(contacts[(contacts.length - 1)].priority) + 1 : 1;
    let id = 0;
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].id > id) {
        id = contacts[i].id;
      }
    }
    setContacts([...contacts, { 'name': contact.discription, 'number': contact.name, priority: pre, 'id': id + 1 }])
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"><Suspense fallback={<div>Loading...</div>}><ContactList contacts={contacts} setContacts={setContacts} delet={delet} active={active} setActive={setActivefun} setEditIndex={setEditIndex} ></ContactList></Suspense></Route>
        <Route exact path="/saveContact"><Suspense fallback={<div>Loading...</div>}><SaveContact setContacts={saveContact} getEditIndex={editIndex} ></SaveContact></Suspense></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
