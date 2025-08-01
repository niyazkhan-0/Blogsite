import { useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import { ForgetPassword } from './ForgetPassword'
import { toast } from 'react-toastify'
import { useDispatch} from 'react-redux'

import "./loginCardPassword.css"

import {
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
} from 'firebase/auth'
import { auth, googleProvider } from "../../firebase/config"
import { setIsAuth, setUser } from '../../store/authSlice'

// Add these new imports for Firestore
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase/config'

export const LoginCard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const emailRef = useRef()
    const passwordRef = useRef()
    const formRef = useRef()

    const [isActive, setIsActive] = useState({ button: "login", active: false })
    const [showPassword, setShowPassword] = useState(false)
    const [displayModal, setDisplayModal] = useState(false)

    const activeClass = "text-3xl font-bold mb-2"
    const inactiveClass = "opacity-80"

    // Create or update user document in Firestore
    async function createUserDocument(userInfo) {
        const userRef = doc(db, 'users', userInfo.uid)
        const userSnap = await getDoc(userRef)

        if (!userSnap.exists()) {
            // Create new user document
            await setDoc(userRef, {
                uid: userInfo.uid,
                email: userInfo.email,
                name: userInfo.displayName || '',
                bio:"A blogsite user",
                profile: userInfo.photoURL || "https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=ejx13G9ZroRrcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-young-user-icon-2400.png&ehk=NNF6zZUBr0n5i%2fx0Bh3AMRDRDrzslPXB0ANabkkPyv0%3d&risl=&pid=ImgRaw&r=0",
                banner: "https://wallup.net/wp-content/uploads/2018/09/26/634694-abstract-digital_art.jpg" ,
                posts: 0,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            })
        }

        // Get the latest user data
        const updatedSnap = await getDoc(userRef)
        return updatedSnap.data()
    }

    async function updateUserState(result) {
        try {
            const userInfo = result.user || result.currentUser

            // Create/get user document from Firestore
            const userData = await createUserDocument(userInfo)

            const user = {
                uid: userData.uid,
                email: userData.email,
                name: userData.name,
                bio: userData.bio,
                profile: userData.profile,
                posts: userData.posts || 0,
                banner: userData.banner
                
            }

            dispatch(setUser(user))
        } catch (error) {
            console.error('Error updating user state:', error)
            toast.error('Failed to load user data')
        }
    }

    function handleGoogleLogin() {
        signInWithPopup(auth, googleProvider)
            .then(async (result) => {
                dispatch(setIsAuth(true))
                await updateUserState(result)
                navigate("/")
            })
            .catch(error => {
                toast.error(error.code)
            })
    }

    function handleSubmit(event) {
        event.preventDefault()

        if (isActive.button === "login") {
            signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
                .then(async (credentials) => {
                    dispatch(setIsAuth(true))
                    await updateUserState(credentials)
                    navigate("/")
                    formRef.current.reset()
                })
                .catch(error => {
                    console.log(error)
                    toast.error(error.code)
                })
        }

        if (isActive.button === "signUp") {
            createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
                .then(async (credentials) => {
                    // For email/password signup, set a display name
                    await updateProfile(credentials.user, {
                        displayName: emailRef.current.value.split('@')[0] // Use email prefix as default name
                    })

                    dispatch(setIsAuth(true))
                    await updateUserState(credentials)
                    navigate("/")
                    formRef.current.reset()
                })
                .catch(error => {
                    toast.error(error.code)
                })
        }
    }

    return (
        <section className='w-full flex justify-center items-center mt-5'>
            {/* Rest of your JSX remains the same */}
            <div className="flex max-w-4xl sm:flex-row flex-col rounded-xl shadow-lg overflow-hidden bg-white w-full dark:shadow-sm dark:shadow-sky-800">
                <div className="sm:w-1/2 w-full bg-gradient-to-br from-sky-400 to-sky-600 p-10 text-white flex flex-col justify-center items-center cursor-pointer dark:bg-gradient-to-br dark:from-blue-900 dark:to-sky-900">
                    <h2 onClick={() => setIsActive({ button: "login", active: false })} className={isActive.active ? inactiveClass : activeClass}>LOGIN</h2>
                    <h2 onClick={() => setIsActive({ button: "signUp", active: true })} className={isActive.active ? activeClass : inactiveClass}>SIGN UP</h2>
                </div>

                <div className="sm:w-1/2 w-full p-10 dark:bg-gradient-to-bl dark:from-blue-950 dark:to-blue-800">
                    <div className="flex justify-center">
                        <i className="bi bi-people-fill text-6xl text-blue-800 dark:text-white"></i>
                    </div>
                    <h3 className="text-center text-2xl font-semibold text-blue-500 mb-6 dark:text-white">{isActive.active ? "Sign Up" : "Login In"}</h3>

                    <form className="space-y-5" onSubmit={handleSubmit} ref={formRef}>
                        <div>
                            <label className="block text-gray-600 dark:text-white">Email</label>
                            <input ref={emailRef} type="email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 dark:placeholder:text-white dark:bg-blue-900" placeholder="Enter your email" />
                        </div>
                        <div className="relative">
                            <label className="block text-gray-600 dark:text-white">Password</label>
                            <input
                                ref={passwordRef}
                                type={showPassword ? "text" : "password"}
                                className="w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 dark:placeholder:text-white dark:bg-blue-900 no-password-reveal"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
                            </button>
                        </div>

                        <div className="text-right">
                            <span onClick={() => setDisplayModal(true)} className="text-sky-400 text-sm hover:underline cursor-pointer dark:text-white">Forgot Password?</span>
                        </div>

                        <button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 rounded-md dark:bg-blue-700">
                            {isActive.active ? "SIGN UP" : "LOGIN"}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500 dark:text-white">Or Login with</div>

                    <div className="mt-4 flex justify-center gap-4">
                        <button onClick={handleGoogleLogin} className="flex items-center gap-2 border px-4 py-2 rounded-md text-sm dark:bg-white">
                            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt='google' /> Google
                        </button>
                    </div>
                </div>
            </div>
            {displayModal && <ForgetPassword setDisplayModal={setDisplayModal} />}
        </section>
    )
}