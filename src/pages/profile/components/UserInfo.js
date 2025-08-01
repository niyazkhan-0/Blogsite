import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../../store/updateUserProfile";
import { db } from "../../../firebase/config";
import { doc, getDoc} from "firebase/firestore";
import { updateBlogAuthor } from "../../../store/updateBlogAuthor";
import { ProfileSkeletonCard } from "../../../components";


export const UserInfo = ({ user, isOwner, searchedUser }) => {

    const [editProfileSec, setEditProfileSec] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [name, setName] = useState("")
    const [bio, setBio] = useState("")

    const dispatch = useDispatch()

    const bannerInputRef = useRef();
    const profileInputRef = useRef()

    const handleBannerChange = async (event) => {

        const image = event.target.files[0];
        if (!image) return
        const url = await getImageUrl(image)
        const info = {
            uid: user.uid,
            banner: url
        }
        await updateUserProfile(info, user, dispatch)

    };

    const handelProfileChange = async (event) => {
        const image = event.target.files[0]
        if (!image) return
        const url = await getImageUrl(image)
        const info = {
            uid: user.uid,
            profile: url
        }
        const authorInfo = {
            "author.profile" : url
        }
        await updateUserProfile(info, user, dispatch)
        await updateBlogAuthor(user, authorInfo)
        
    }

    async function handleSave() {
        const info = {
            uid: user.uid,
            name: name,
            bio: bio
        }
        await updateUserProfile(info, user, dispatch)
        setEditProfileSec(false)
    }

    async function getImageUrl(image) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "blogsite_preset"); // replace with your preset
        data.append("cloud_name", "dfeg8txnk"); // replace with your cloud name

        const response = await fetch(
            "https://api.cloudinary.com/v1_1/dfeg8txnk/image/upload",
            {
                method: "POST",
                body: data,
            }
        );

        const json = await response.json();
        return json.secure_url; // This is the public image URL
    }

    useEffect(() => {
        async function getUser() {
            if (isOwner) {
                setCurrentUser(user)
            } else {
                try {
                    const docRef = doc(db, "users", searchedUser)
                    const userSnap = await getDoc(docRef)
                    setCurrentUser(userSnap.data())
                } catch (error) {
                    console.log("Error finding the user " + error)
                }
            }
        }
        getUser()
    }, [isOwner, user, searchedUser])

    return (
        !currentUser ? (
            <ProfileSkeletonCard/>
        ) : (
            <section>
                <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden dark:bg-gradient-to-bl dark:from-sky-600 dark:via-blue-900 dark:to-blue-950">
                    {/* Header Banner */}
                    <div className="relative h-48 overflow-hidden">
                        <img
                            src={currentUser.banner || 'https://wallup.net/wp-content/uploads/2018/09/26/634694-abstract-digital_art.jpg'}
                            alt="Cover"
                            className="w-full h-full object-cover"
                        />
                        {/* Dark overlay for text readability */}
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                        {isOwner && (<div>
                            <input
                                type="file"
                                accept="image/*"
                                ref={bannerInputRef}
                                onChange={handleBannerChange}
                                style={{ display: "none" }}
                            />

                            <button onClick={() => bannerInputRef.current.click()} className="absolute top-4 right-4 w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-all">
                                <i class="bi bi-camera-fill"></i>
                            </button>
                        </div>)}

                    </div>

                    {/* Profile Section */}
                    <div className="relative px-6 pb-6">
                        {/* Profile Picture */}
                        <div className="relative -mt-12 mb-4">
                            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200 mx-auto">
                                <img
                                    src={currentUser.profile}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {isOwner && (
                                <div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={profileInputRef}
                                        onChange={handelProfileChange}
                                        style={{ display: "none" }}

                                    />
                                    <button onClick={() => profileInputRef.current.click()} className="absolute bottom-0 right-1/2 transform translate-x-12 translate-y-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-600 transition-colors">
                                        <i class="bi bi-camera-fill"></i>
                                    </button>
                                </div>
                            )}

                        </div>

                        {/* User Info */}
                        <div className="text-center mb-6 ">
                            <h2 className="text-xl font-bold text-gray-900 mb-1 dark:text-white">{currentUser.name}</h2>
                            <p className="text-gray-600 text-sm dark:text-white">{currentUser.bio}</p>
                        </div>

                        {/* Stats */}
                        <div className="flex justify-center mb-6 ">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser.posts}</div>
                                <div className="text-sm text-gray-600 dark:text-white">Posts</div>
                            </div>
                        </div>

                        {/* Edit Profile Button */}
                        {isOwner && (
                            <button onClick={() => setEditProfileSec(true)} className="w-1/3 mx-auto  bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                                <i class="bi bi-pencil-square"></i>
                                Edit Profile
                            </button>
                        )}
                        {editProfileSec &&
                            (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
                                        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">Name</label>
                                            <input
                                                type="text"
                                                value={name || currentUser.name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">Bio</label>
                                            <textarea
                                                value={bio || currentUser.bio}
                                                onChange={(e) => setBio(e.target.value)}
                                                rows={3}
                                                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                        </div>

                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => setEditProfileSec(false)}
                                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSave}
                                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </section>
        )
    )
}
