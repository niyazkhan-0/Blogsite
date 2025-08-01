import "./customCat.css"
import { useEffect, useState } from "react";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from './../../firebase/config';

import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { updateUserProfile } from './../../store/updateUserProfile';

export const CreateBlog = ({user}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const predefinedCategories = [
        'Technology',
        'Travel',
        'Food & Cooking',
        'Health & Fitness',
        'Business',
        'Lifestyle',
        'Education',
        'Entertainment',
        'Sports',
        'Fashion',
        'Photography',
        'Art & Design'
    ];

    const validationRules = {
        title: /^[a-zA-Z0-9\s\-_.,!?]{3,60}$/,
        category: /^[\w\s&\-()]{3,30}$/i,
        content: /^[\s\S]{10,1000}$/
    }

    const [useCustomCat, setUseCustomCat] = useState(false)
    const [charLength, setCharLength] = useState(0)

    //form validation
    const [isFormValid, setIsFormValid] = useState(false)
    const [formData, setFormData] = useState(JSON.parse(localStorage.getItem("draftBlog")) || {
        title: "",
        category: ":",
        content: ""
    })

    const [fieldStates, setFieldStates] = useState({
        title: "initial",
        category: "initial",
        content: "initial"
    })

    function validateField(field, value) {
        if (value.trim() === "") {
            return "initial"
        }
        return validationRules[field].test(value.trim()) ? "valid" : "invalid"
    }

    function handelInputChange(field, value) {

        setFormData(prev => (
            { ...prev, [field]: value }
        ))
        const fieldState = validateField([field], value)
        setFieldStates(prev => (
            { ...prev, [field]: fieldState }
        ))
    }

    function handelCustomCat(event) {
        if (event.target.value === "custom") {
            setUseCustomCat(true)
            event.target.value = ""
        } else {
            setUseCustomCat(false)
        }
    }

    function handelLengthChange(event) {
        let word = event.target.value.replace(/\s/g, "").split("")
        setCharLength(word.length)
    }

    useEffect(() => {
        const isAllValid = Object.entries(fieldStates).every(([field, state]) => {
            return state === "valid"
        })
        setIsFormValid(isAllValid)
    }, [fieldStates])

    function inputStyling(fieldState) {

        const baseClasses = "w-full p-3 border-2 rounded-lg transition-colors duration-200 focus:outline-none bg-gradient-to-l form-sky-50 to-amber-50"

        switch (fieldState) {
            case 'initial':
                return `${baseClasses} border-gray-300 focus:border-blue-500`;
            case 'valid':
                return `${baseClasses} border-green-500 focus:border-green-600`;
            case 'invalid':
                return `${baseClasses} border-red-500 focus:border-red-600`;
            default:
                return `${baseClasses} border-gray-300`;
        }
    }

    function handelSaveOnDraft(){
        localStorage.setItem("draftBlog", JSON.stringify(formData))
    }

    //handeling the submit part
    function handelSubmit(){
        const blogData = {
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            title: formData.title,
            category: formData.category,
            content: formData.content,
            likedBy: [],
            author:{
                uid: user.uid,
                profile: user.profile ,
                email:user.email
            }
        }
        const collectionRef = collection(db, "blogs")
        const info = {
            uid: user.uid,
            posts: user.posts + 1
        }
        addDoc(collectionRef, blogData).then(() => {
            updateUserProfile(info, user, dispatch)
            localStorage.removeItem("draftBlog")
            navigate("/")
        })
    }

    return (
        <section>
            <div className="min-h-screen  py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className=" text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-2">
                            Create New Blog Post
                        </h1>
                        <p className="text-gray-600">Share your thoughts with the world</p>
                    </div>

                    {/* Main Form */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                        {/* Form Header with Gradient */}
                        <div className="bg-gradient-to-r from-blue-500 to-orange-400 p-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-white">Write Your Story</h2>
                                    <p className="text-blue-100 text-sm">Express yourself and inspire others</p>
                                </div>
                            </div>
                        </div>

                        {/* Form Body */}
                        <div className="p-8 space-y-8">
                            {/* Title Field */}
                            <div className="space-y-2">
                                <label htmlFor="title" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    <span>Blog Title</span>
                                </label>
                                <div className="relative">
                                    <input
                                        onChange={(event) => {
                                            handelInputChange("title", event.target.value)
                                        }}
                                        value={formData.title}
                                        type="text"
                                        id="title"
                                        placeholder="Enter an engaging title for your blog post..."
                                        className={inputStyling(fieldStates.title)}
                                        required
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/5 to-orange-400/5 pointer-events-none"></div>
                                </div>
                            </div>

                            {/* Category Selection */}
                            <div className="space-y-4">
                                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                    <span>Category</span>
                                </label>

                                {/* Dropdown */}
                                <div className="relative">
                                    <select onChange={(event) => {
                                        handelCustomCat(event)
                                        handelInputChange("category", event.target.value)
                                    }}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 text-gray-800 shadow-sm hover:shadow-md appearance-none bg-white">
                                        <option value="">Select a category...</option>
                                        {predefinedCategories.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                        
                                        <option value="custom">✨ Create Custom Category</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Custom Category Input - Hidden by default */}
                                <div className={`${useCustomCat ? "" : "hidden"} animate-slide-down `}>
                                    <div className="relative">
                                        <input
                                            onChange={(event) => handelInputChange("category", event.target.value)}
                                            type="text"
                                            placeholder="Enter your custom category..."
                                            className={inputStyling(fieldStates.category)}
                                        />
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                            <span className="text-orange-400 text-sm font-medium">Custom</span>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="mt-2 text-xs text-gray-500 hover:text-gray-700 transition-colors flex items-center space-x-1"
                                    >
                                        <span>← Back to predefined categories</span>
                                    </button>
                                </div>
                            </div>

                            {/* Blog Content */}
                            <div className="space-y-2">
                                <label htmlFor="blog" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full"></span>
                                    <span>Blog Content</span>
                                </label>
                                <div className="relative">
                                    <textarea
                                        onChange={(event) => {
                                            handelLengthChange(event)
                                            handelInputChange("content", event.target.value)
                                        }}
                                        value={formData.content}
                                        id="blog"
                                        placeholder="Write your amazing blog content here... Share your experiences, insights, and stories that will captivate your readers."
                                        rows="12"
                                        className={inputStyling(fieldStates.content)}
                                        required
                                    />
                                    <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                                        {charLength} characters
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <button
                                    onClick={handelSaveOnDraft}
                                    type="button"
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow-md"
                                >
                                    Save as Draft
                                </button>

                                <button
                                    onClick={handelSubmit}
                                    disabled={!isFormValid}
                                    type="submit"
                                    className={`${isFormValid ? "from-blue-500 to-orange-400 hover:from-blue-600 hover:to-orange-500 hover:-translate-y-0.5" : "from-slate-600 to-gray-600 cursor-not-allowed"} flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform  bg-gradient-to-r   text-white`}
                                >
                                    Publish Blog Post
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tips Section */}
                    <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                            <span className="w-6 h-6 bg-gradient-to-r from-blue-500 to-orange-400 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">💡</span>
                            </span>
                            <span>Writing Tips</span>
                        </h3>
                        <ul className="text-sm text-gray-600 space-y-2">
                            <li className="flex items-start space-x-2">
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></span>
                                <span>Keep your title engaging and descriptive</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2"></span>
                                <span>Choose the most relevant category for better discoverability</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></span>
                                <span>Structure your content with clear paragraphs and good flow</span>
                            </li>
                        </ul>
                    </div>
                </div>


            </div>
        </section>
    )
}
