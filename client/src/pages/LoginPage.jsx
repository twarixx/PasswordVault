import { useContext, useState } from "react";
import { makeRequest } from "../axios";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import { toaster } from "evergreen-ui";

export const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const [text, setText] = useState({
        username: "",
        password: "",
    });

    const mutation = useMutation(
        (data) => {
            return makeRequest.post("/login", data);
        },
        {
            onSuccess: (data) => {
                login(data.data);

                toaster.success("Successfully signed in!", {
                    hasCloseButton: true,
                    duration: 3,
                    id: "login-successful",
                });
            },
            onError: (error) => {
                console.log("Error: " + error);
            },
        }
    );

    const handleChange = (event) => {
        setText((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        mutation.mutate(text);
    };

    return (
        <div className="bg-[url('/images/background.jpg')] bg-center bg-cover h-[100vh] text-white font-['roboto']">
            <div className="bg-black bg-opacity-60 h-[100vh]">
                <div className="flex justify-center items-center h-[100vh]">
                    <div className="bg-stone-800 bg-opacity-90 rounded-xl w-[40%] flex flex-col items-center p-4">
                        <div className="pb-4">
                            <h1 className="text-xl">Login</h1>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-3 w-[60%]"
                        >
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
                            <button className="bg-sky-500 hover:bg-sky-600 focus:bg-sky-600 transition rounded px-4 mt-2 py-2 mb-4">
                                Sign in
                            </button>
                        </form>

                        <div className="flex justify-between w-full px-2 mb-2 text-stone-300">
                            <p>Don't have an account?</p>
                            <p>Sign up!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
