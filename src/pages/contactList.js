import React from 'react';
import Nav from '../components/nav'
import ContactItem from '../components/contactItem';
import { useHistory } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function ContactList(props) {
  const history = useHistory();
  let allList = props.contacts.sort((a, b) => a.priority > b.priority && 1 || -1)
  const addContact = (e) => {
    props.setEditIndex(null)
    history.push('/saveContact');
  }
  function handleOnDragEnd(result) {

    const items = Array.from(props.contacts);
    let priority = items[result.source.index]['priority'];
    items[result.source.index]['priority'] = items[result.destination.index]['priority'];
    items[result.destination.index]['priority'] = priority;
    props.setContacts(items);
  }
  return (
    <div className="wrapper">
      <div className="container">
        <Nav />
        <div className="main-container">
          <div className="inner_container">
            {props.contacts.length == 0 ?
              <div className="add_contact">
                <div className="text-center">
                  <div className="btn btn-brand rounded btn-center mb-3" onClick={addContact}>ADD CONTACT</div>
                  <p className="mb-5">Let's start adding contacts of your loved ones in your list!</p>
                </div>
                <img src="assets/images/img-add-contact.svg" alt="" />
              </div> :
              <div className="contact_list">
                <div className="text-center">
                  <div className="btn btn-brand rounded btn-center mb-3" onClick={addContact}>ADD CONTACT</div>
                </div>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId="characters">
                    {(provided) => (
                      <div className="contacts_list_group characters" {...provided.droppableProps} ref={provided.innerRef}>
                        {allList.map((item, index) => {
                          return (<Draggable key={item.id} draggableId={item.id + ""} index={index}>
                            {(provided) => (
                              <div className={props.active == item.priority ? "list_parent active" : "list_parent"} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={() => { props.setActive(item.priority) }}>
                                <ContactItem item={item} active={props.active} setActive={props.setActive} delet={props.delet} setEditIndex={props.setEditIndex} />
                                {provided.placeholder}
                              </div>
                            )}
                          </Draggable>);
                        })}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            }
          </div>
          <footer />
        </div>
      </div>
    </div>
  );
}

export default ContactList;