import React, { useEffect, useState } from 'react'
import { find, isEmpty , size } from 'lodash'
import { FormGroup } from 'reactstrap'
import { addDocument, deleteDocument, getCollection, updateDocument } from './actions'
import './App.css' 
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"
import { BsPatchPlusFill, BsPencilSquare, BsTrash } from "react-icons/bs"

function App() {

  const [petName, setPetName] = useState("")
  const [petType, setPetType] = useState("")
  const [petBreed, setPetBreed] = useState("")
  const [petDateBorn, setPetDateBorn] = useState(new Date().toLocaleDateString('fr-FR'))
  const [ownerPet, setOwnerPet] = useState("")
  const [ownerPhone, setOwnerPhone] = useState("")
  const [ownerAddress, setOwnerAddress] = useState("")
  const [ownerEmail, setOwnerEmail] = useState("")
  const [pets, setPets] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")
  const [Find, setFind] = useState([])

  useEffect(() => 
  {
    (async() => 
    {
      const result = await getCollection("pets")
      if (result.statusResponse)
      {
        setPets(result.data)
      }
    })()
  }, [])

    const addPet = async(e) =>
    {
      e.preventDefault()

        if(isEmpty(petName))
        {
          setError("Debes ingresar el nombre de la mascota.")
          return
        }
        if(isEmpty(petType))
        {
          setError("Debes ingresar el tipo de la mascota.")
          return
        }
        if(isEmpty(petBreed))
        {
          setError("Debes ingresar la raza de la mascota.")
          return
        }
        if(isEmpty(petDateBorn))
        {
          setError("Debes ingresarla fecha de nacimiento de la mascota.")
          return
        }
        if(isEmpty(ownerPet))
        {
          setError("Debes ingresar el nombre del propietario de la mascota.")
          return
        }
        if(isEmpty(ownerPhone))
        {
          setError("Debes ingresar el número de telefono del propietario.")
          return
        }
        if(isEmpty(ownerAddress))
        {
          setError("Debes ingresar la dirección del propietario.")
          return
        }

        const Name = petName.toLowerCase()

        const result = await addDocument ("pets", { 
          petName: Name[0].toUpperCase() + Name.slice(1),
          petType: petType,
          petBreed: petBreed,
          petDateBorn: petDateBorn,
          ownerPet: ownerPet,
          ownerPhone: ownerPhone,
          ownerAddress: ownerAddress,
          ownerEmail: ownerEmail 
        })

          if( !result.statusResponse )
          {
            setError(result.error)
            return
          }

        setPets([ ...pets, { id : result.data.id, 
          petName: petName,
          petType: petType,
          petBreed: petBreed,
          petDateBorn: petDateBorn,
          ownerPet: ownerPet,
          ownerPhone: ownerPhone,
          ownerAddress: ownerAddress,
          ownerEmail: ownerEmail 
        }])

        setPetName("")
        setPetType("")
        setPetBreed("")
        setPetDateBorn("")
        setOwnerPet("")
        setOwnerPhone("")
        setOwnerAddress("")
        setOwnerEmail("")
        
    }

    const savePet = async(e) =>
    {
      e.preventDefault()

        if(isEmpty(petName))
        {
          setError("Debes ingresar el nombre de la mascota.")
          return
        }
        if(isEmpty(petType))
        {
          setError("Debes ingresar el tipo de la mascota.")
          return
        }
        if(isEmpty(petBreed))
        {
          setError("Debes ingresar la raza de la mascota.")
          return
        }
        if(isEmpty(petDateBorn))
        {
          setError("Debes ingresarla fecha de nacimiento de la mascota.")
          return
        }
        if(isEmpty(ownerPet))
        {
          setError("Debes ingresar el nombre del propietario de la mascota.")
          return
        }
        if(isEmpty(ownerPhone))
        {
          setError("Debes ingresar el número de telefono del propietario.")
          return
        }
        if(isEmpty(ownerAddress))
        {
          setError("Debes ingresar la dirección del propietario.")
          return
        }
        
        const Name = petName.toLowerCase()

        const result = await updateDocument("pets", id, { 
          petName: Name[0].toUpperCase() + Name.slice(1),
          petType: petType,
          petBreed: petBreed,
          petDateBorn: petDateBorn,
          ownerPet: ownerPet,
          ownerPhone: ownerPhone,
          ownerAddress: ownerAddress,
          ownerEmail: ownerEmail
        })

          if(!result.statusResponse)
          {
            setError(result.error)
            return
          }

        const editedPets = pets.map(item => item.id === id ? { id, 
          petName: petName,
          petType: petType,
          petBreed: petBreed,
          petDateBorn: petDateBorn,
          ownerPet: ownerPet,
          ownerPhone: ownerPhone,
          ownerAddress: ownerAddress,
          ownerEmail: ownerEmail} : item)

          setPets(editedPets)

          setEditMode(false)
          setPetName("")
          setPetType("")
          setPetBreed("")
          setPetDateBorn("")
          setOwnerPet("")
          setOwnerPhone("")
          setOwnerAddress("")
          setOwnerEmail("")
          setId("")
    }

    const editPet = (thePet) =>
    {
      setPetName(thePet.petName)
      setPetType(thePet.petType)
      setPetBreed(thePet.petBreed)
      setPetDateBorn(thePet.petDateBorn)
      setOwnerPet(thePet.ownerPet)
      setOwnerPhone(thePet.ownerPhone)
      setOwnerAddress(thePet.ownerAddress)
      setOwnerEmail(thePet.ownerEmail)
      setEditMode(true)
      setId(thePet.id)
    }

    const CancelEditMode = () =>
    {
      setEditMode(false)
      setPetName("")
      setPetType("")
      setPetBreed("")
      setPetDateBorn("")
      setOwnerPet("")
      setOwnerPhone("")
      setOwnerAddress("")
      setOwnerEmail("")
      setId("")
    }

    const deletePet = async(id) =>
    {
      const result = await deleteDocument("pets", id)
        if(!result.statusResponse)
        {
          setError(result.error)
          return
        }

        const filteredPets = pets.filter(pet => pet.id !== id)
        setPets(filteredPets)
    }

    const SearchPet = async(e) =>{
      e.preventDefault()

      if(isEmpty(petName)){
        return
      }

      const Name = search.toLowerCase()
      const PetSearched = pets.filter(pet => pet.petName === Name[0].toUpperCase() + Name.slice(1),)
      setFind(PetSearched)
      console.log(PetSearched)
    }

  return (
    <div className="Doc">
      <nav className="navbar navbar-expand-lg navbar-info bg-info">
        <h1 className="text-light my-3">Vet Plus</h1>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        </div>
        <div className="text-right">
            <form className="form-inline my-2 my-lg-0" onSubmit={SearchPet}>
              <input className="form-control mr-sm-2" 
                type="search" 
                placeholder="Search by name of pet" 
                aria-label="Search"
                onChange={(text) => setSearch(text.target.value)}
              />
              <button 
                className="btn btn-warning my-2 my-sm-0 float-right" 
                type="submit"
                href="#VetModalSearch" 
                data-toggle="modal"
              >
                Search
              </button>
            </form>
          </div>
      </nav>
      <div className="row">
        <div className="col 10">
          <table className="table table1">
            <thead>
              <tr>
                <th colSpan="4" className="T1">
                  <h3>
                  <p><strong >Mascota</strong></p>
                  </h3>
                </th>
                <th colSpan="4" className="T3">
                  <h3>
                    <p><strong >Propietario</strong></p>
                  </h3>
                </th>
                <th colSpan="2" rowSpan="2">
                  <div className="text-center">
                    <form>
                      <a href="#VetModal" 
                        role="button" 
                        className="btn btn-primary btn-lg my-5"
                        data-toggle="modal"
                      >
                          <strong><BsPatchPlusFill size={ 25 }/> Inscribir</strong>
                      </a>
                    </form>
                  </div>
                </th>
              </tr>
              <tr>
                <th className="T2">
                  <h4><b>Nombre</b></h4>
                </th>
                <th className="T2">
                  <h4><b>Tipo</b></h4>
                </th>
                <th className="T2">
                  <h4><b>Raza</b></h4>
                </th>
                <th className="T2">
                 <h4><b>Fecha nacimiento</b></h4>
                </th>
                <th className="T2">
                 <h4><b>Nombre completo</b></h4>
                </th>
                <th className="T2">
                  <h4><b>Telefono</b></h4>
                </th>
                <th className="T2">
                  <h4><b>Dirección</b></h4>
                </th>
                <th className="T2">
                  <h4><b>Email</b></h4>
                </th>
              </tr>
            </thead>
            <tbody>
              {
              size(pets) === 0 ? 
              (
                <tr>
                  <td colSpan="10" className="text-center">
                    <ul>
                      <li className="list-group-item">
                        No hay mascotas registradas en el sistema.
                      </li>
                    </ul>
                  </td>
                </tr>
              ):(
              pets.map((pet) => 
              (
                <tr key={pet.id}>
                  <td className="text-center" bgcolor="#FFFFFF">
                    <p><em><span>{pet.petName}</span></em></p>
                  </td>
                  <td className="text-center" bgcolor="#FFFFFF">
                  <p><em><span>{pet.petType}</span></em></p>
                  </td>
                  <td className="text-center" bgcolor="#FFFFFF">
                  <p><em><span>{pet.petBreed}</span></em></p>
                  </td>
                  <td className="text-center" bgcolor="#FFFFFF">
                  <p><em><span>{pet.petDateBorn}</span></em></p>
                  </td>
                  <td className="text-center" bgcolor="#FFFFFF">
                  <p><em><span>{pet.ownerPet}</span></em></p>
                  </td>
                  <td className="text-center" bgcolor="#FFFFFF">
                  <p><em><span>{pet.ownerPhone}</span></em></p>
                  </td>
                  <td className="text-center" bgcolor="#FFFFFF">
                  <p><em><span>{pet.ownerAddress}</span></em></p>
                  </td>
                  <td className="text-center" bgcolor="#FFFFFF">
                  <p><em><span>{pet.ownerEmail}</span></em></p>
                  </td>
                  <td className="text-center" bgcolor="#FFFFFF">
                    <a href="#VetModal" 
                      role="button" 
                      className="btn btn-warning btn-sm" 
                      data-toggle="modal"
                      onClick={() => editPet(pet)}>
                      <BsPencilSquare size={20} />
                    </a>
                  </td>
                  <td className="text-center">
                    <a href="#VetModalDelete" 
                      role="button" 
                      className="btn btn-danger btn-sm" 
                      data-toggle="modal"
                      onClick={() => setId(pet.id)}>
                      <BsTrash size={20}/>
                    </a>   
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>
      <div id="VetModal" className="modal fade">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className={ editMode? "modal-header bg-warning" : "modal-header bg-primary"}> 
                  <h2 className={ editMode? "modal-title text-light" : "modal-title text-light"}> 
                    <em><p>                         
                     { editMode ? "Actualicemos!" : "Vamos a inscribirlo!" }
                    </p></em>
                  </h2>
                    <button type="button" 
                    className="close" 
                    data-dismiss="modal" 
                    aria-hidden="true"
                    onClick={() => CancelEditMode()}>
                      &times;
                    </button>
                </div>
                <form onSubmit={ editMode ? savePet : addPet}>
                  <div className="modal-body">
                      <h4 className="text-center my-1">Mascota</h4>
                      <p></p>
                    <FormGroup>
                      <label>Nombre:</label>
                      <input type="text" 
                        className="float-right form-control"
                        style={{width: "50%"}}
                        placeholder="*"
                        onChange={(text) => setPetName(text.target.value)}
                        value = {petName}>
                      </input>
                    </FormGroup>
                    <FormGroup>
                    <label>Tipo:</label>
                      <select 
                        className="float-right form-control" 
                        aria-label="Default select example"
                        type= "text"
                        onChange={(text) => setPetType(text.target.value)}
                        value={petType}
                        style={{width: "50%"}}
                      >
                        <option>*</option>
                        <option value="Gato">Gato</option>
                        <option value="Perro">Perro</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </FormGroup>
                    <FormGroup>
                      <label>Raza:</label>
                      <input type="text"
                        className="float-right form-control"
                        style={{width: "50%"}}
                        placeholder="*"
                        onChange={(text) => setPetBreed(text.target.value)}
                        value={petBreed}>
                      </input>
                    </FormGroup>
                    <FormGroup>
                      <label>Fecha de nacimiento:</label>
                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        className="float-right form-control"
                        value={petDateBorn}
                        type="date"
                        onChange={(date) => {
                          const d = new Date(date).toLocaleDateString('fr-FR')
                          setPetDateBorn(d)
                        }}
                      />
                    </FormGroup>
                    <hr></hr>
                      <h4 className="text-center">Propietario</h4>
                    <FormGroup>
                      <label>Nombres completo:</label>
                      <input type="text" 
                        className="float-right form-control"
                        style={{width: "50%"}}
                        placeholder="*"
                        onChange={(text) => setOwnerPet(text.target.value)}
                        value={ownerPet}>
                      </input>
                    </FormGroup>
                    <FormGroup>
                      <label>Teléfono:</label>
                      <input type="text" 
                        className="float-right form-control"
                        style={{width: "50%"}}
                        placeholder="*"
                        onChange={(text) => setOwnerPhone(text.target.value)}
                        value={ownerPhone}>
                      </input>
                    </FormGroup>
                    <FormGroup>
                      <label>Dirección:</label>
                      <input type="text" 
                        className="float-right form-control"
                        style={{width: "50%"}}
                        placeholder="*"
                        onChange={(text) => setOwnerAddress(text.target.value)}
                        value={ownerAddress}>
                      </input>
                    </FormGroup>
                    <FormGroup>
                      <label>Email:</label>
                      <input type="text" 
                        className="float-right form-control"
                        style={{width: "50%"}}
                        placeholder="<Campo opcional>"
                        onChange={(text) => setOwnerEmail(text.target.value)}
                        value={ownerEmail}>
                      </input>
                    </FormGroup>
                    <h5 className="text-center my-1">
                    { editMode ? "Los campos con (*) son requeridos para actualizar el registro" 
                    : "Los campos con (*) son requeridos para realizar el registro" }
                  </h5>
                  </div>
                  <div className="modal-footer">
                    <div>
                      <h5 text-align="left">                            
                          {
                            error && <span className="text-danger">{error}</span>
                          }
                      </h5>
                    </div>
                      <button type="button" 
                      className="btn btn-default" 
                      data-dismiss="modal"
                      onClick={() => CancelEditMode()}>
                        Cerrar
                      </button>
                      <button type="submit" 
                      className={ editMode ? "btn btn-dark" : "btn btn-success"}>
                        { editMode ? "Modificar" : "Guardar" }
                      </button>
                  </div>
                </form>
            </div>
        </div>
      </div>
      <div id="VetModalDelete" className="modal fadet">
          <div className="modal-dialog">
              <div className="modal-content">
                  <div className="modal-header bg-dark">
                    <h3 className="modal-title text-light">
                      <em><p> Eliminar registro </p></em>
                    </h3>
                    <button type="button" 
                      className="close" 
                      data-dismiss="modal" 
                      aria-hidden="true">
                        &times;
                    </button>
                  </div>
                    <form>
                      <div className="modal-body">
                              <h4 className="lead text-center">
                                ¿Esta seguro que desea eliminar el registro de la mascota?
                              </h4>
                      </div>
                      <div className="modal-footer">
                        <button type="submit"
                        className="btn btn-danger btn-block"
                        data-dismiss="modal"
                        onClick={() => {deletePet((id))}}>
                          Si
                        </button>
                        <button type="button"
                        data-dismiss="modal"
                        className="btn btn-default btn-block">
                          No
                        </button>
                      </div>
                    </form>
              </div>
          </div>                    
      </div>
      <div id="VetModalSearch" className="modal fade">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-dark"> 
              <h2 className="modal-title text-light"> 
                <em><p>                         
                 Peluditos!
                </p></em>
              </h2>
                <button type="button" 
                  className="close text-light" 
                  data-dismiss="modal" 
                  aria-hidden="true"
                >
                  &times;
                </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col 12">
                  <table className="table table1">
                    <thead>
                      <tr>
                        <th colSpan="4" className="T1">
                          <h3>
                          <p><strong >Mascota</strong></p>
                          </h3>
                        </th>
                        <th colSpan="4" className="T3">
                          <h3>
                            <p><strong >Propietario</strong></p>
                          </h3>
                        </th>
                      </tr>
                      <tr>
                        <th className="T2">
                          <h4><b>Nombre</b></h4>
                        </th>
                        <th className="T2">
                          <h4><b>Tipo</b></h4>
                        </th>
                        <th className="T2">
                          <h4><b>Raza</b></h4>
                        </th>
                        <th className="T2">
                        <h4><b>Fecha nacimiento</b></h4>
                        </th>
                        <th className="T2">
                        <h4><b>Nombre completo</b></h4>
                        </th>
                        <th className="T2">
                          <h4><b>Telefono</b></h4>
                        </th>
                        <th className="T2">
                          <h4><b>Dirección</b></h4>
                        </th>
                        <th className="T2">
                          <h4><b>Email</b></h4>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                      size(Find) === 0 ? 
                      (
                        <tr>
                          <td colSpan="10" className="text-center">
                            <ul>
                              <li className="list-group-item">
                                No hay mascotas registradas en el sistema que cumplan con el nombre ingresado.
                              </li>
                            </ul>
                          </td>
                        </tr>
                      ):(
                      Find.map((pet) => 
                      (
                        <tr key={pet.id}>
                          <td className="text-center" bgcolor="#FFFFFF">
                            <p><em><span>{pet.petName}</span></em></p>
                          </td>
                          <td className="text-center" bgcolor="#FFFFFF">
                          <p><em><span>{pet.petType}</span></em></p>
                          </td>
                          <td className="text-center" bgcolor="#FFFFFF">
                          <p><em><span>{pet.petBreed}</span></em></p>
                          </td>
                          <td className="text-center" bgcolor="#FFFFFF">
                          <p><em><span>{pet.petDateBorn}</span></em></p>
                          </td>
                          <td className="text-center" bgcolor="#FFFFFF">
                          <p><em><span>{pet.ownerPet}</span></em></p>
                          </td>
                          <td className="text-center" bgcolor="#FFFFFF">
                          <p><em><span>{pet.ownerPhone}</span></em></p>
                          </td>
                          <td className="text-center" bgcolor="#FFFFFF">
                          <p><em><span>{pet.ownerAddress}</span></em></p>
                          </td>
                          <td className="text-center" bgcolor="#FFFFFF">
                          <p><em><span>{pet.ownerEmail}</span></em></p>
                          </td>
                          <td className="text-center" bgcolor="#FFFFFF">
                            <a href="#VetModal" 
                              role="button" 
                              className="btn btn-warning btn-sm" 
                              data-toggle="modal"
                              onClick={() => editPet(pet)}>
                              <BsPencilSquare size={20} />
                            </a>
                          </td>
                          <td className="text-center">
                            <a href="#VetModalDelete" 
                              role="button" 
                              className="btn btn-danger btn-sm" 
                              data-toggle="modal"
                              onClick={() => setId(pet.id)}>
                              <BsTrash size={20}/>
                            </a>   
                          </td>
                        </tr>
                      )))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) 
}

export default App
