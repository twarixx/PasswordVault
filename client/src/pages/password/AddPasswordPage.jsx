import { useState } from "react";
import { PulseLoader } from 'react-spinners';
import { toaster } from "evergreen-ui";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";
//import { MasterPasswordContext } from "../context/MasterPasswordContext";
import { useQueryClient } from "@tanstack/react-query";

import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

import { MasterPasswordDialog } from "../../components/dialogs/MasterPasswordDialog";
import { MasterPasswordContext } from "../../context/MasterPasswordContext";

import { useNavigate } from "react-router-dom";

export const AddPasswordPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { masterPassword, updateMasterPassword } = useContext(
        MasterPasswordContext
    );
    const [text, setText] = useState({
        website: "",
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        category: "null",
        masterpassword: masterPassword,

    });

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { currentUser } = useContext(AuthContext);


    const [Saving, setSaving] = useState(false);
    const handleChange = (event) => {

        setText((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    }

    const mutation = useMutation(
        (data) => {
            return makeRequest.post("/passwords", data);
        },
        {
            onSuccess: (data) => {
                setSaving(false);
                queryClient.invalidateQueries(["passwords", currentUser.username]);

                navigate("/");

                toaster.success("Successfully saved password!", {
                    hasCloseButton: true,
                    duration: 3,
                    id: "saving-successful",
                });
            },
            onError: (error) => {
                setSaving(false);

                toaster.danger(error.response.data.message, {
                    hasCloseButton: true,
                    duration: 3,
                    id: "saving-failed",
                });
            },
        }
    );

    const handleSubmit = (event) => {
        event.preventDefault();


        if (text.username === "" || text.password === "" || text.email === "" || text.confirmpassword === "" || text.website === "") {
            return toaster.danger("Enter all the fields!", {
                hasCloseButton: true,
                duration: 3,
                id: "register-failed",
            });
        }

        setSaving(true);


        mutation.mutate(text);
    };




    return (
        <>
            <MasterPasswordDialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                destination="/"
            />
            <div className="flex flex-col  justify-center  gap-5 ml-80 w-[100vw] z-2">
                <div className="bg-stone-600 flex flex-col  rounded  items-center w-[75%] justify-center p-4 h-16">
                    <p className="font-semibold text-xl">Add Password</p>
                </div>
                <div className=" flex flex-col border-2 h-[75%] bg-stone-600 w-[75%] justify-center border-black rounded">
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="flex justify-between">
                            <div className="flex flex-col mt-4">
                                <div className="flex flex-col">
                                    <label
                                        className="ml-4"
                                        htmlFor="website"
                                    >
                                        Website:
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        value={text.website}
                                        className="ml-4 bg-stone-500 px-2 py-1.5 rounded placeholder-white text-white border border-stone-600 hover:border-sky-500 focus:border-sky-500 ring-0 outline-none"
                                        type="text"
                                        id="website"
                                        name="website"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label
                                        className=" ml-4"
                                        htmlFor="username"
                                    >
                                        Username:
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        value={text.username}
                                        className="ml-4 bg-stone-500 px-2 py-1.5 rounded placeholder-white text-white border border-stone-600 hover:border-sky-500 focus:border-sky-500 ring-0 outline-none"
                                        type="text"
                                        id="username"
                                        name="username"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label
                                        className=" ml-4"
                                        htmlFor="email"
                                    >
                                        Email:
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        value={text.email}
                                        className=" ml-4 bg-stone-500 px-2 py-1.5 rounded placeholder-white text-white border border-stone-600 hover:border-sky-500 focus:border-sky-500 ring-0 outline-none"
                                        type="email"
                                        id="email"
                                        name="email"
                                    />
                                </div>
                                <div />
                                <div className="flex flex-col">
                                    <label
                                        className=" ml-4"
                                        htmlFor="category"
                                    >
                                        Category:
                                    </label>
                                    <select
                                        className="ml-4 bg-stone-500 px-2 py-1.5 rounded placeholder-white text-white border border-stone-600 hover:border-sky-500 focus:border-sky-500 ring-0 outline-none"
                                        id="category"
                                        name="category"
                                        onChange={handleChange}
                                        value={text.category}>
                                        <option value="null">Uncategorized</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>

                                </div>
                                {!masterPassword ? (
                                    <Link to="/" className="bg-sky-500 h-12  flex justify-center w-[200px] items-center hover:bg-sky-600 focus:bg-sky-600 transition rounded ml-4  px-4 mt-10 py-2 mb-10">
                                        <p className="font-semibold text-xl">
                                            Save
                                        </p>
                                    </Link>
                                ) : (
                                    <button className="bg-sky-500 h-12  flex justify-center w-[200px] items-center hover:bg-sky-600 focus:bg-sky-600 transition rounded ml-4  px-4 mt-10 py-2 mb-10 ">
                                        {Saving ? (
                                            <PulseLoader color="white" />
                                        ) : (
                                            "Save!"
                                        )}
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-col mt-4">
                                <div className="flex flex-col">
                                    <input type="hidden" value={masterPassword} />
                                    <label
                                        htmlFor="password"
                                    >
                                        Password:
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        value={text.password}
                                        className=" mr-4 bg-stone-500 px-2 py-1.5 rounded placeholder-white text-white border border-stone-600 hover:border-sky-500 focus:border-sky-500 ring-0 outline-none"
                                        type="password"
                                        id="password"
                                        name="password"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="password"
                                    >
                                        Confirm password:
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        value={text.confirmpassword}
                                        className="mr-4 bg-stone-500 px-2 py-1.5 rounded placeholder-white text-white border border-stone-600 hover:border-sky-500 focus:border-sky-500 ring-0 outline-none"
                                        type="password"
                                        id="confirmpassword"
                                        name="confirmpassword"
                                    />
                                </div>
                                <div className=" mt-40">
                                    <Link to="/">
                                        <div className="bg-sky-500 h-12  flex justify-center w-[200px] items-center hover:bg-sky-600 focus:bg-sky-600 transition rounded px-4 py-2">
                                            <p>Back</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div >
            </div >

        </>
    );
};