import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../../firebase/config"
import { useRef } from "react"
import { toast } from "react-toastify"


export const ForgetPassword = ({ setDisplayModal }) => {
    const emailRef = useRef()

    function handelForgetPassword() {
        sendPasswordResetEmail(auth, emailRef.current.value)
            .then(() => {
                toast.success('Email send', {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnCLick: true
                });
            })
            .catch((error) => {
                console.log(error)
                switch (error.code) {
                    case 'auth/user-not-found':
                        toast.error("No account found with this email")
                        break
                    case 'auth/invalid-email':
                        toast.error("Invalid email address")
                        break
                    default:
                        toast.error("Error sending reset email. Please try again.")
                }
            })
    }

    return (
        <section>
            <div id="default-modal" className="bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-start w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 lg:w-2/5 xl:w-1/3 w-1/2 max-w-2xl max-h-full">

                    <div className="relative bg-cyan-50 rounded-lg shadow-md shadow-blue-50 dark:bg-gray-700">

                        <div className="flex items-center justify-between p-2 md:p-3 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Reset Password
                            </h3>
                            <button onClick={() => setDisplayModal(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-4 md:p-5 space-y-4">
                            <p className="dark:text-white text-sm text-gray-600">we will send reset password email on this email address</p>
                            <div className="relative mb-6">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                    </svg>
                                </div>
                                <input ref={emailRef} type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" />
                            </div>
                        </div>

                        <div className="flex items-center p-2 md:p-3 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button onClick={handelForgetPassword} data-modal-hide="default-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send Email</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}