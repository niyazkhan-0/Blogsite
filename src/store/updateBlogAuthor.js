import { collection, getDocs, query, updateDoc, where, doc } from "firebase/firestore"
import { db } from "../firebase/config"


export const updateBlogAuthor = async (user, authorInfo) => {
    try{
        const q = query(collection(db, "blogs"),where("author.uid", "==", user.uid))
        const querySnapshot = await getDocs(q)

        const updatePromise = querySnapshot.docs.map((blogDoc)=> {
            const blogRef = doc(db, "blogs", blogDoc.id)
            return updateDoc(blogRef,authorInfo)
        })

        await Promise.all(updatePromise);
        console.log("all blog updated sucessfully")
    }
    catch(error){
        console.log("error occured: " + error)
    }

}
