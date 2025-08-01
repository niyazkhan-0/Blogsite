import { db } from "../firebase/config"
import { updateDoc,serverTimestamp,doc } from "firebase/firestore"
import { setUser } from "./authSlice"

export const updateUserProfile = async (info, user, dispatch) => {
  try{
    updateDoc(doc(db, "users", info.uid),{
        ...info,
        updatedAt:serverTimestamp()
    })

    dispatch(setUser({
        ...user,
        ...info
    }))

  }catch(error){
    console.log(error)
  }
}
