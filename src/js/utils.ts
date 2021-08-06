import firebase from 'firebase/app'


export const documentExists = async (reference: firebase.firestore.DocumentData) => {
  let docRef = null
  try {
      docRef = await reference.get()
  } catch {
      throw new Error('Reference not found')
  }
  if (docRef === null || !docRef.exists) throw new Error('Document not found')

  return docRef.exists && docRef
}