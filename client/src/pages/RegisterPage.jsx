import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { PulseLoader } from "react-spinners";
import { toaster } from "evergreen-ui";
import { makeRequest } from "../axios";


export const RegisterPage = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loggingIn, setLoggingIn] = useState(false);

    const [text, setText] = useState({
        email: "",
        username: "",
        password: "",
        confirmpassword: "",
    });

    const [validation, setValidation] = useState("");


    const handleChange = (event) => {
        if (event.target.name == "password") {
            if (event.target.value.length < 12) {
                setValidation(event.target.value.length == 0 ? "" : "Password is too short!")
            }
            else if (!event.target.value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-=_+{}[\]|;:',.<>?]).+$")) {
                setValidation("Password does not contain lowercase, uppercase, special character or number!")
            }
            else {
                setValidation("Everything looks fine!");
            }
        };

        setText((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };
    const mutation = useMutation(
        (data) => {
            return makeRequest.post("/register", data);
        },
        {
            onSuccess: (data) => {
                setLoggingIn(false);
                login(data.data);

                navigate("/");

                toaster.success("Successfully signed up!", {
                    hasCloseButton: true,
                    duration: 3,
                    id: "register-successful",
                });
            },
            onError: (error) => {
                setLoggingIn(false);

                toaster.danger(error.response.data.message, {
                    hasCloseButton: true,
                    duration: 3,
                    id: "register-failed",
                });
            },
        }
    );

    const handleSubmit = (event) => {
        event.preventDefault();

        if (text.username === "" || text.password === "" || text.email === "" || text.confirmpassword === "") {
            return toaster.danger("Enter all the fields!", {
                hasCloseButton: true,
                duration: 3,
                id: "register-failed",
            });
        }

        setLoggingIn(true);

        mutation.mutate(text);
    };

    return (
        <div className="bg-[url('/images/background.jpg')] bg-center bg-cover h-[100vh] text-white font-['roboto']">
            <div className="bg-black bg-opacity-60 h-[100vh]">
                <div className="flex justify-center items-center h-[100vh]">
                    <div className="bg-stone-800 bg-opacity-90 rounded-xl w-[40%] flex flex-col items-center p-4">
                        <div className="pb-4">
                            <h1 className="text-xl">Register</h1>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-3 w-[60%]"
                        >
                            <div className="flex flex-col">
                                <label
                                    className="text-stone-300"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    onChange={handleChange}
                                    value={text.email}
                                    className="outline outline-stone-600 hover:outline-sky-500 focus:outline-sky-500 transition ring-0 px-4 py-2 bg-stone-600 rounded"
                                    type="email"
                                    id="email"
                                    name="email"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label
                                    className="text-stone-300"
                                    htmlFor="username"
                                >
                                    Username
                                </label>
                                <input
                                    onChange={handleChange}
                                    value={text.username}
                                    className="outline outline-stone-600 hover:outline-sky-500 focus:outline-sky-500 transition ring-0 px-4 py-2 bg-stone-600 rounded"
                                    type="text"
                                    id="username"
                                    name="username"
                                />
                            </div>
                            <div className="flex flex-col">
                                {validation && <p className={validation == "Everything looks fine!" ? "text-green-500" : "text-red-600"}>{validation}</p>}
                                <label
                                    className="text-stone-300"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    onChange={handleChange}
                                    value={text.password}
                                    className="outline outline-stone-600 hover:outline-sky-500 focus:outline-sky-500 transition ring-0 px-4 py-2 bg-stone-600 rounded"
                                    type="password"
                                    id="password"
                                    name="password"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label
                                    className="text-stone-300"
                                    htmlFor="confirmpassword"
                                >
                                    Confirm password
                                </label>
                                <input
                                    onChange={handleChange}
                                    value={text.confirmpassword}
                                    className="outline outline-stone-600 hover:outline-sky-500 focus:outline-sky-500 transition ring-0 px-4 py-2 bg-stone-600 rounded"
                                    type="password"
                                    id="confirm-password"
                                    name="confirmpassword"
                                />
                            </div>
                            <button className="bg-sky-500 h-12 flex justify-center items-center hover:bg-sky-600 focus:bg-sky-600 transition rounded px-4 mt-2 py-2 mb-4">
                                {loggingIn ? (
                                    <PulseLoader color="white" />
                                ) : (
                                    "Sign up!"
                                )}
                            </button>
                        </form>

                        <Link className="w-full" to="/login">
                            <div className="flex justify-between w-full px-2 mb-2 mt-4 text-stone-300">
                                <p>Do you have a account?</p>
                                <p>Sign in!</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
