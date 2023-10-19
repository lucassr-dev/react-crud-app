import { useState } from 'react';
import './App.css'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal';
import { PlusCircle, Edit, Trash2 } from 'react-feather'

function App() {

  const blankUser = {
    "name":"",
    "email":"",
    "cargo":"",
    "endereco":""
  }

  const [open, setOpen] = useState(false);
  const [action,setAction] = useState('Add');
  const [userdata, setUserdata] = useState([]);
  const [user, setUser] = useState(blankUser);
  const [editIndex, setEditIndex] = useState(null);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setAction('Add')
  }

  const addUser = () => {
    setUserdata([...userdata,user])
    setUser(blankUser)
    onCloseModal()
  }

  const editUser = (index) => {
    setAction('Edit')
    const selectedUser = userdata.find((x,i) => i === index)
    setUser(selectedUser)
    setEditIndex(index)
    onOpenModal()
  }

  const updateUser = () => {
    const newUsers = userdata.map((x,i) => {
      if(i === editIndex){
        return user
      }
      return x
    })
    setUserdata(newUsers)
    setUser(blankUser)
    setEditIndex(null)
    onCloseModal()
  }

  const deleteUser = (index) => {
    const newUsers = userdata.filter((x,i) => i !== index)
    setUserdata(newUsers)
  }

  return (
      <div className="container">
        <div className="d-flex">
          <h1>CRUD APP</h1>
        </div>
        <div className='toolbar'>
        <button className='btn btn-p' onClick={onOpenModal}>
          <PlusCircle size={16}></PlusCircle>
          <span>Add</span>
        </button>
        </div>
        <hr />
        {/*<p>{JSON.stringify(userdata)}</p>*/}
        <table className='table'>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Cargo</th>
              <th>Endereço</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {userdata.length > 0 && userdata.map((user,index) =>{
              return(
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.cargo}</td>
                  <td>{user.endereco}</td>
                  <td>
                    <button className='btn ml2' onClick={() => editUser(index)}>
                      <Edit size={16} />
                      <span>Editar</span>
                    </button>
                    <button className='btn ml2' onClick={() => deleteUser(index)}>
                      <Trash2 size={16} />
                      <span>Excluir</span>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <Modal open={open} onClose={onCloseModal} center>
        <h2>{action} Usuário</h2>
        {/*<p>{JSON.stringify(user)}</p>*/}
        <div className="form">
        <label htmlFor="name">Nome</label>
        <input type="text" value={user.name} onChange={(e) => setUser({...user,"name":e.target.value})}/>
        <label htmlFor="name">Email</label>
        <input type="text" value={user.email} onChange={(e) => setUser({...user,"email":e.target.value})}/>
        <label htmlFor="name">Cargo</label>
        <input type="text" value={user.cargo} onChange={(e) => setUser({...user,"cargo":e.target.value})}/>
        <label htmlFor="name">Endereço</label>
        <textarea name="endereco" value={user.endereco} cols="30" rows="4" onChange={(e) => setUser({...user,"endereco":e.target.value})}/>
        {action === 'Add' &&<button className='btn' onClick={()=>addUser()}>Cadastrar</button>}
        {action === 'Edit' &&<button className='btn' onClick={()=>updateUser()}>Editar</button>}
        </div>
      </Modal>

        </div>
  )
}

export default App
