import React, { useState } from 'react'
import { isEmpty } from 'lodash'
import { FormGroup } from 'reactstrap'
import shortid from 'shortid'


function App() {

  const [namePet, setNamePet] = useState("")
  const [typePet, setTypePet] = useState("")
  const [breed, setBreed] = useState("")
  const [dateBorn, setDateBorn] = useState("")
  const [owner, setOwner] = useState("")
  const [phoneOwner, setPhoneOwner] = useState("")
  const [addressOwner, setAddressOwner] = useState("")
  const [emailOwner, setEmailOwner] = useState("")
  const [pets, setPets] = useState([])

    const addPet = (e) =>
    {
      e.preventDefault()

        if(isEmpty(namePet))
        {
          console.log("The pet name field is empty")
          return
        }
        if(isEmpty(typePet))
        {
          console.log("The pet type field is empty")
          return
        }
        if(isEmpty(breed))
        {
          console.log("The pet breed field is empty")
          return
        }
        if(isEmpty(dateBorn))
        {
          console.log("The pet date born field is empty")
          return
        }
        if(isEmpty(owner))
        {
          console.log("The owner's name field is empty")
          return
        }
        if(isEmpty(phoneOwner))
        {
          console.log("The owner's phone field is empty")
          return
        }
        if(isEmpty(addressOwner))
        {
          console.log("The owner's address field is empty")
          return
        }
        
        const newPet = 
        {
          id: shortid.generate(),
          petName: namePet,
          petType: typePet,
          petBreed: breed,
          petDateBorn: dateBorn,
          ownerPet: owner,
          ownerPhone: phoneOwner,
          ownerAddress: addressOwner,
          ownerEmail: emailOwner
        }

        setPets([ ...pets, newPet])
        setNamePet("")
        setTypePet("")
        setBreed("")
        setDateBorn("")
        setOwner("")
        setPhoneOwner("")
        setAddressOwner("")
        setEmailOwner("")

    }

  return (
    <div className="container mt-5">
      <a href="#victorModal" 
         role="button" 
         class="btn btn-large btn-primary btn-lg float-right mt-5" 
         data-toggle="modal">
            Inscribir +
      </a>
      <h1>Veterinaria vet</h1>
      <hr/>
      <br></br>
          <div id="victorModal" class="modal fade">
              <div class="modal-dialog">
                  <div class="modal-content">
                      <div class="modal-header">
                      <h4 class="modal-title">¿Estás seguro?</h4>
                          <button type="button" 
                          class="close" 
                          data-dismiss="modal" 
                          aria-hidden="true">
                            &times;
                          </button>

                      </div>
                      <form onSubmit={addPet}>
                      <div class="modal-body">
                        <FormGroup>
                          <label>Nombre de la mascota:</label>
                          <input type="text" 
                            className="float-right"
                            onChange={(text) => setNamePet(text.target.value)}
                            value = {namePet}>
                          </input>
                        </FormGroup>
                        <FormGroup>
                        <label>Tipo de mascota:</label>
                          <input type="text"
                            className="float-right"
                            onChange={(text) => setTypePet(text.target.value)}
                            value={typePet}>
                          </input>
                        </FormGroup>
                        <FormGroup>
                          <label>Raza de mascota:</label>
                          <input type="text"
                            className="float-right" 
                            onChange={(text) => setBreed(text.target.value)}
                            value={breed}>
                          </input>
                        </FormGroup>
                        <FormGroup>
                          <label>Fecha de nacimiento de la mascota:</label>
                          <input type="date"
                            className="float-right"
                            onChange={(text) => setDateBorn(text.target.value)}
                            value={dateBorn}>
                          </input>
                        </FormGroup>
                        <FormGroup>
                          <hr></hr>
                          <label>Nombres y apellidos del propietario:</label>
                          <input type="text" 
                            className="float-right"
                            onChange={(text) => setOwner(text.target.value)}
                            value={owner}>
                          </input>
                        </FormGroup>
                        <FormGroup>
                          <label>Teléfono del propietario:</label>
                          <input type="text" 
                            className="float-right"
                            onChange={(text) => setPhoneOwner(text.target.value)}
                            value={phoneOwner}>
                          </input>
                        </FormGroup>
                        <FormGroup>
                          <label>Dirección del propietario:</label>
                          <input type="text" 
                            className="float-right"
                            onChange={(text) => setAddressOwner(text.target.value)}
                            value={addressOwner}>
                          </input>
                        </FormGroup>
                        <FormGroup>
                          <label>Email del propietario:</label>
                          <input type="text" 
                            className="float-right"
                            onChange={(text) => setEmailOwner(text.target.value)}
                            value={emailOwner}>
                          </input>
                        </FormGroup>
                      </div>
                      <div class="modal-footer">
                          <button type="button" 
                          class="btn btn-default" 
                          data-dismiss="modal">
                            Cerrar
                          </button>
                          <button type="submit" class="btn btn-primary">
                            Guardar
                          </button>
                      </div>
                      </form>
                      
                  </div>
                  
              </div>
          </div>
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
                          <th className="text-center">
                          </th>
                          <th className="text-center">
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                    {pets.map((pet) => 
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
                              <button className="btn btn-warning btn-sm">
                                Editar
                              </button>
                          </td>
                          <td className="text-center">
                              <button className="btn btn-danger btn-sm">
                                Eliminar
                              </button>   
                          </td>
                      </tr>

                    ))}

                  
                  </tbody>
              </table>
            </div>
          </div>
    </div>
  ) 
}

export default App
