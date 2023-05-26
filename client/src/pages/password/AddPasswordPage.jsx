import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toaster } from "evergreen-ui";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { load, makeRequest } from "../../axios";
import { useQueryClient } from "@tanstack/react-query";

import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

import { MasterPasswordDialog } from "../../components/dialogs/MasterPasswordDialog";
import { MasterPasswordContext } from "../../context/MasterPasswordContext";

import { useNavigate } from "react-router-dom";

export const AddPasswordPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [isOpen, setIsOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const { currentUser } = useContext(AuthContext);
    const { masterPassword } = useContext(MasterPasswordContext);
    const [text, setText] = useState({
        website: "",
        username: "",
        password: "",
        category: "null",
        confirmpassword: "",
    });

    const { data, isLoading, error } = load(
        ["categories", currentUser.username],
        "/categories"
    );

    const handleChange = (event) => {
        if (event.target.id === "category") {
            return setText((prev) => ({
                ...prev,
                [event.target.name]: event.target.value,
            }));
        }

        setText((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const generateRandomPassword = (event) => {
        event.preventDefault();

        let password = "";
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;

        let counter = 0;
        while (counter < 12) {
            password += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
            counter++;
        }

        setText((prev) => ({
            ...prev,
            password: password,
            confirmpassword: password,
        }));
    };

    useEffect(() => {
        if (masterPassword) return;
        navigate("/");
    }, [masterPassword]);

    const mutation = useMutation(
        (data) => {
            return makeRequest.post("/passwords", data);
        },
        {
            onSuccess: (data) => {
                setSaving(false);
                queryClient.invalidateQueries([
                    "passwords",
                    currentUser.username,
                ]);

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

        if (
            text.username === "" ||
            text.password === "" ||
            text.email === "" ||
            text.confirmpassword === "" ||
            text.website === ""
        ) {
            return toaster.danger("Enter all the fields!", {
                hasCloseButton: true,
                duration: 3,
                id: "register-failed",
            });
        }

        setSaving(true);

        const data = {
            website: text.website,
            username: text.username,
            email: text.email,
            password: text.password,
            confirmpassword: text.confirmpassword,
            category: text.category === "null" ? null : getId(text.category),
            masterpassword: masterPassword,
        };

        mutation.mutate(data);
    };

    if (isLoading) return;

    let categories = data.map((item) => ({
        key: item.name,
        value: item.id,
    }));

    const getId = (name) => {
        return categories.find((item) => item.key === name).value;
    };

    return (
        <>
            <MasterPasswordDialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                destination="/"
            />
            <div className="flex flex-col justify-center gap-5 ml-80 w-[100vw] z-2">
                <div className="bg-stone-600 flex flex-col  rounded  items-center w-[75%] justify-center p-4 h-16">
                    <p className="font-semibold text-xl">Add Password</p>
                </div>

                <div className="flex bg-stone-600 w-[75%] rounded p-4">
                    <form
                        className="w-full flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col w-full">
                                    <label htmlFor="name">Website:</label>
                                    <input
                                        onChange={handleChange}
                                        value={text.website}
                                        className="bg-stone-500 px-2 py-1.5 rounded placeholder-white text-white border border-stone-600 hover:border-sky-500 focus:border-sky-500 ring-0 outline-none"
                                        type="text"
                                        id="website"
                                        name="website"
                                    />
                                </div>

                                <div className="flex flex-col w-full">
                                    <label htmlFor="name">Username:</label>
                                    <input
                                        onChange={handleChange}
                                        value={text.username}
                                        className="bg-stone-500 px-2 py-1.5 rounded placeholder-white text-white border border-stone-600 hover:border-sky-500 focus:border-sky-500 ring-0 outline-none"
                                        type="text"
                                        id="username"
                                        name="username"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="category">Category:</label>
                                    <select
                                        className="bg-stone-500 px-2 py-1.5 rounded placeholder-white text-white border border-stone-600 hover:border-sky-500 focus:border-sky-500 ring-0 outline-none"
                                        id="category"
                                        name="category"
                                        onChange={handleChange}
                                        value={text.category}
                                    >
                                        <>
                                            <option
                                                key="null"
                                                value="Uncategorized"
                                            >
                                                Uncategorized
                                            </option>
                                            {data.map((item) => (
                                                <option
                                                    key={item.id}
                                                    value={item.name}
                                                >
                                                    {item.name}
                                                </option>
                                            ))}
                                        </>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center px-2 text-gray-700">
                                        <svg
                                            className="fill-current h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col w-full">
                                    <label htmlFor="name">Password:</label>
                                    <input
                                        onChange={handleChange}
                                        value={text.password}
                                        className="bg-stone-500 px-2 py-1.5 rounded placeholder-white text-white border border-stone-600 hover:border-sky-500 focus:border-sky-500 ring-0 outline-none"
                                        type="password"
                                        id="password"
                                        name="password"
                                    />
                                </div>

                                <div className="flex flex-col w-full">
                                    <label htmlFor="name">
                                        Confirm Password:
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        value={text.confirmpassword}
                                        className="bg-stone-500 px-2 py-1.5 rounded placeholder-white text-white border border-stone-600 hover:border-sky-500 focus:border-sky-500 ring-0 outline-none"
                                        type="password"
                                        id="confirmpassword"
                                        name="confirmpassword"
                                    />
                                </div>

                                <div className="flex flex-col w-full">
                                    <button
                                        onClick={generateRandomPassword}
                                        type="reset"
                                        className="bg-orange-500 h-12 flex justify-center items-center hover:bg-orange-600 focus:bg-orange-600 transition rounded px-4 py-2"
                                    >
                                        Generate Random
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between w-full">
                            <div className="flex gap-2">
                                <button className="bg-sky-500 h-12 flex justify-center items-center hover:bg-sky-600 focus:bg-sky-600 transition rounded px-4 py-2">
                                    {saving ? (
                                        <PulseLoader color="white" />
                                    ) : (
                                        "Save!"
                                    )}
                                </button>
                            </div>

                            <Link to="/">
                                <div className="bg-sky-500 h-12 flex justify-center items-center hover:bg-sky-600 focus:bg-sky-600 transition rounded px-4 py-2">
                                    <p>Back</p>
                                </div>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
