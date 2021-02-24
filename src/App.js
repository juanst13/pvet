import React, { useState } from 'react'
import { isEmpty , size } from 'lodash'
import { FormGroup } from 'reactstrap'
import shortid from 'shortid'


function App() {

  const [petName, setPetName] = useState("")
  const [petType, setPetType] = useState("")
  const [petBreed, setPetBreed] = useState("")
  const [petDateBorn, setPetDateBorn] = useState("")
  const [ownerPet, setOwnerPet] = useState("")
  const [ownerPhone, setOwnerPhone] = useState("")
  const [ownerAddress, setOwnerAddress] = useState("")
  const [ownerEmail, setOwnerEmail] = useState("")
  const [pets, setPets] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)

    const addPet = (e) =>
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
        
        const newPet = 
        {
          id: shortid.generate(),
          petName: petName,
          petType: petType,
          petBreed: petBreed,
          petDateBorn: petDateBorn,
          ownerPet: ownerPet,
          ownerPhone: ownerPhone,
          ownerAddress: ownerAddress,
          ownerEmail: ownerEmail
        }

        setPets([ ...pets, newPet])
        setPetName("")
        setPetType("")
        setPetBreed("")
        setPetDateBorn("")
        setOwnerPet("")
        setOwnerPhone("")
        setOwnerAddress("")
        setOwnerEmail("")
    }

    const savePet = (e) =>
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

        const editedPets = pets.map(item => item.id === id ? { id, petName: petName,
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

    const deletePet = (id) =>
    {
      const filteredPets = pets.filter(pet => pet.id !== id)
      setPets(filteredPets)
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

  return (
    <div className="container mt-5">
      <a href="#VetModal" 
         role="button" 
         class="btn btn-large btn-primary btn-lg float-right mt-5" 
         data-toggle="modal">
            Inscribir +
      </a>
      <h1>Veterinaria vet</h1>
      <hr/>
      <br></br>
      <div className="row">
        <div className="col 12">
          <table class="table">
            <thead>
              <tr>
                <th className="text-center">
                <span className="lead"> Nombre de la mascota</span>
                </th>
                <th className="text-center">
                <span className="lead">Tipo de mascota</span>
                </th>
                <th className="text-center">
                <span className="lead">Raza de mascota</span>
                </th>
                <th className="text-center">
                <span className="lead">Fecha de nacimiento de la mascota</span>
                </th>
                <th className="text-center">
                <span className="lead"> Nombres y apellidos del propietario</span>
                </th>
                <th className="text-center">
                <span className="lead">Teléfono del propietario</span>
                </th>
                <th className="text-center">
                <span className="lead"> Dirección del propietario</span>
                </th>
                <th className="text-center">
                <span className="lead"> Email del propietario</span>
                </th>
                <th>
                </th>
                <th>
                </th>
              </tr>
            </thead>
            <tbody>
              {
              size(pets) == 0 ? 
              (
                <td colspan="10" className="text-center">
                  <li className="list-group-item">No hay mascotas registradas en el sistema.</li>
                </td>
              ):(
              pets.map((pet) => 
              (
                <tr key={pet.id}>
                  <td className="text-center">
                    <span>{pet.petName}</span>
                  </td>
                  <td className="text-center">
                    <span>{pet.petType}</span>
                  </td>
                  <td className="text-center">
                    <span>{pet.petBreed}</span>
                  </td>
                  <td className="text-center">
                    <span>{pet.petDateBorn}</span>
                  </td>
                  <td className="text-center">
                    <span>{pet.ownerPet}</span>
                  </td>
                  <td className="text-center">
                    <span>{pet.ownerPhone}</span>
                  </td>
                  <td className="text-center">
                    <span>{pet.ownerAddress}</span>
                  </td>
                  <td className="text-center">
                    <span>{pet.ownerEmail}</span>
                  </td>
                  <td className="text-center">
                    <a href="#VetModal" 
                      role="button" 
                      className="btn btn-warning btn-sm" 
                      data-toggle="modal"
                      onClick={() => editPet(pet)}>
                      Editar
                    </a>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-danger btn-sm"
                      onClick={() => deletePet(pet.id)}>
                      Eliminar
                    </button>   
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>
      <div id="VetModal" class="modal fade">
              <div class="modal-dialog">
                  <div class="modal-content">
                      <div class="modal-header">
                        <h4 class="modal-title">                            
                            {
                              error && <span className="text-danger">{error}</span>
                            }
                        </h4>
                          <button type="button" 
                          class="close" 
                          data-dismiss="modal" 
                          aria-hidden="true">
                            &times;
                          </button>
                      </div>
                      <form onSubmit={ editMode ? savePet : addPet}>
                        <div class="modal-body">
                          <FormGroup>
                            <label>Nombre de la mascota:</label>
                            <input type="text" 
                              className="float-right"
                              onChange={(text) => setPetName(text.target.value)}
                              value = {petName}>
                            </input>
                          </FormGroup>
                          <FormGroup>
                          <label>Tipo de mascota:</label>
                            <input type="text"
                              className="float-right"
                              onChange={(text) => setPetType(text.target.value)}
                              value={petType}>
                            </input>
                          </FormGroup>
                          <FormGroup>
                            <label>Raza de mascota:</label>
                            <input type="text"
                              className="float-right" 
                              onChange={(text) => setPetBreed(text.target.value)}
                              value={petBreed}>
                            </input>
                          </FormGroup>
                          <FormGroup>
                            <label>Fecha de nacimiento de la mascota:</label>
                            <input type="date"
                              className="float-right"
                              onChange={(text) => setPetDateBorn(text.target.value)}
                              value={petDateBorn}>
                            </input>
                          </FormGroup>
                          <FormGroup>
                            <hr></hr>
                            <label>Nombres y apellidos del propietario:</label>
                            <input type="text" 
                              className="float-right"
                              onChange={(text) => setOwnerPet(text.target.value)}
                              value={ownerPet}>
                            </input>
                          </FormGroup>
                          <FormGroup>
                            <label>Teléfono del propietario:</label>
                            <input type="text" 
                              className="float-right"
                              onChange={(text) => setOwnerPhone(text.target.value)}
                              value={ownerPhone}>
                            </input>
                          </FormGroup>
                          <FormGroup>
                            <label>Dirección del propietario:</label>
                            <input type="text" 
                              className="float-right"
                              onChange={(text) => setOwnerAddress(text.target.value)}
                              value={ownerAddress}>
                            </input>
                          </FormGroup>
                          <FormGroup>
                            <label>Email del propietario:</label>
                            <input type="text" 
                              className="float-right"
                              onChange={(text) => setOwnerEmail(text.target.value)}
                              value={ownerEmail}>
                            </input>
                          </FormGroup>
                        </div>
                        <div class="modal-footer">
                            <button type="button" 
                            class="btn btn-default" 
                            data-dismiss="modal">
                              Cerrar
                            </button>
                            <button type="submit" className={ editMode ? "btn btn-success" : "btn btn-primary"}>
                              { editMode ? "Modificar" : "Guardar" }
                            </button>
                        </div>
                      </form>
                  </div>
              </div>
          </div>
    </div>
    
    
  ) 
}

export default App
