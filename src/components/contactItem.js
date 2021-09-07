import { useHistory } from 'react-router-dom'
export default ({ item, setEditIndex, delet }) => {
  const history = useHistory();
  const edit = (id) => {
    setEditIndex(id)
    history.push('/saveContact')
  }
  return (
    <div className="list">
      <div className="slide">
        <div className="icons">
          <a onClick={() => { edit(item) }}><img src="assets/images/pencil_icon.svg" alt="" /></a>
          <a onClick={() => { delet(item.id) }}><img src="assets/images/delete_icon.svg" alt="" /></a>
        </div>
        <div className="text_area">
          <span><b>{item.name}</b></span>
          <span>{item.number}</span>
        </div>
      </div>
      <div className="number">
        {item.priority}
      </div>
    </div>
  );
}