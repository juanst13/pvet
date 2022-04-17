import {collection, getDocs, getDoc, query, doc,  addDoc, deleteDoc, updateDoc, QuerySnapshot, where} from "firebase/firestore"
import db from './firebase'

export const getCollection = async(collectionApp) => {
    const result = { statusResponse : false, data : null, error : null}
    try {
        const data = await getDocs(collection(db, collectionApp))
        const arrayData = data.docs.map(doc => ({ id : doc.id, ...doc.data()}))
        result.statusResponse = true
        result.data = arrayData
    } catch (error) {
        result.error = error
    }
    return result
}

export const addDocument = async(collectionApp, data) =>
{
    const result = { statusResponse : false, data : null, error : null}
    try {
        const response = await addDoc(collection(db, collectionApp), {
            petName: data.petName,
            petType: data.petType,
            petBreed: data.petBreed,
            petDateBorn: data.petDateBorn,
            ownerPet: data.ownerPet,
            ownerPhone: data.ownerPhone,
            ownerAddress: data.ownerAddress,
            ownerEmail: data.ownerEmail 
        })
        result.data = { id : response.id }
        result.statusResponse = true
    } catch (error) {
        result.error = error
    }
    return result
}

export const getDocument = async(collectionApp, id) => 
{
    const result = { statusResponse : false, data : null, error : null}
    try {
        const response = await getDoc(collection(db, collectionApp, id))
        result.data = { id : response.id, ...response.data() }
        result.statusResponse = true
    } catch (error) {
        result.error = error
    }
    return result
}

export const updateDocument = async(collectionApp, id, data) =>
{
    const result = { statusResponse : false, error : null }
    try {
        await updateDoc(doc(db, collectionApp, id), {   
            petName: data.petName,
            petType: data.petType,
            petBreed: data.petBreed,
            petDateBorn: data.petDateBorn,
            ownerPet: data.ownerPet,
            ownerPhone: data.ownerPhone,
            ownerAddress: data.ownerAddress,
            ownerEmail: data.ownerEmail 
        })
        result.statusResponse = true
    } catch (error) {
        result.error = error
    }
    return result
}

export const deleteDocument = async(collectionApp, id) =>
{
    const result = { statusResponse : false, error :null}
    try {
        await deleteDoc(doc(db, collectionApp, id))
        result.statusResponse = true
    } catch (error) {
        result.error = error
    }
        return result
}