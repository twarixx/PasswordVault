import { useContext, useEffect, useState } from "react";
import { MasterPasswordContext } from "../../context/MasterPasswordContext";
import { useMutation } from "@tanstack/react-query";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MasterPasswordDialog } from "../../components/dialogs/MasterPasswordDialog";
import { loadPost, makeRequest } from "../../axios";
import { UnknownPage } from "../UnknownPage";
import { toaster } from "evergreen-ui";

export const EditPasswordPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const { masterPassword } = useContext(MasterPasswordContext);
    const [text, setText] = useState({
        website: "",
        username: "",
        password: "",
        confirmpassword: "",
        masterpassword: masterPassword,
        passwordchanged: false,
    });

    const { data, isLoading, error } = loadPost(
        ["showpassword", id],
        "/passwords/show",
        { id: id, masterpassword: masterPassword }
    );

    const handleChange = (event) => {
        if (event.target.id === "password") {
            text.passwordchanged = true;
            event.target.type = "password";
        }

        setText((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    useEffect(() => {
        if (masterPassword) return;
        navigate("/");
    }, [masterPassword]);

    useEffect(() => {
        setText({ ...data, masterpassword: masterPassword } || {});
    }, [data]);

    console.log(data);

    const mutation = useMutation(
        (data) => {
            return makeRequest.put(`/passwords/${id}`, data);
        },
        {
            onSuccess: (data) => {
                setSaving(false);
                save(data.data);

                queryClient.invalidateQueries([
                    "passwords",
                    currentUser.username,
                ]);

                navigate("/");

                toaster.success("Successfully updated!", {
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
            text.confirmpassword === "" ||
            text.website === ""
        ) {
            return toaster.danger("Enter all the fields!", {
                hasCloseButton: true,
                duration: 3,
                id: "register-failed",
            });
        }

        mutation.mutate(text);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <UnknownPage />;

    return (
        <>
            <MasterPasswordDialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                destination="/"
            />
            <div className="flex flex-col justify-center gap-5 ml-80 w-[100vw] z-2">
                <div className="bg-stone-600 flex flex-col  rounded  items-center w-[75%] justify-center p-4 h-16">
                    <p className="font-semibold text-xl">Edit Password</p>
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
                                    >
                                        <option value="social">Social</option>
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
                                        type="text"
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

                                <button
                                    type="reset"
                                    className="bg-red-500 h-12 flex justify-center items-center hover:bg-red-600 focus:bg-red-600 transition rounded px-4 py-2"
                                >
                                    {deleting ? (
                                        <PulseLoader color="white" />
                                    ) : (
                                        "Delete"
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

    return (
        <>
            <MasterPasswordDialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                destination="/"
            />
            <div className="flex flex-col  justify-center  gap-5 ml-80 w-[100vw] z-2">
                <div className="bg-stone-600 flex flex-col  rounded  items-center w-[75%] justify-center p-4 h-16">
                    <p className="font-semibold text-xl">Edit Password</p>
                </div>
                <div className=" flex flex-col bg-stone-600 w-[75%] justify-center rounded">
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-between">
                            <div className="flex flex-col mt-4">
                                <div className="flex flex-col">
                                    <label className="ml-4" htmlFor="website">
                                        Website:
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        value={text.website}
                                        className="ml-4 bg-stone-500 px-2 py-1.5 rounded placeholder-white text-white border border-stone-600 hover:border-sky-500 focus:border-sky-500 ring-0 outline-none"
                                        type="text"
                                        id="webiste"
                                        name="website"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className=" ml-4" htmlFor="username">
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

                                <div />
                                <div className="flex flex-col">
                                    <label className=" ml-4" htmlFor="category">
                                        Category:
                                    </label>
                                    <select
                                        className="ml-4 bg-stone-500 px-2 py-1.5 rounded placeholder-white text-white border border-stone-600 hover:border-sky-500 focus:border-sky-500 ring-0 outline-none"
                                        id="category"
                                        name="category"
                                    >
                                        <option value="social">Social</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg
                                            className="fill-current h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                                {!masterPassword ? (
                                    <Link
                                        to="/"
                                        className="bg-sky-500 h-12  flex justify-center w-[200px] items-center hover:bg-sky-600 focus:bg-sky-600 transition rounded ml-4  px-4 mt-10 py-2 mb-10"
                                    >
                                        <p className="font-semibold text-xl">
                                            Save
                                        </p>
                                    </Link>
                                ) : (
                                    <button className="bg-sky-500 h-12  flex justify-center w-[200px] items-center hover:bg-sky-600 focus:bg-sky-600 transition rounded ml-4  px-4 mt-10 py-2 mb-10 ">
                                        {saving ? (
                                            <PulseLoader color="white" />
                                        ) : (
                                            "Save!"
                                        )}
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-col mt-4">
                                <div className="flex flex-col">
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        onChange={handleChange}
                                        value={text.password}
                                        className=" mr-4 bg-stone-500 px-2 py-1.5 rounded placeholder-white text-white border border-stone-600 hover:border-sky-500 focus:border-sky-500 ring-0 outline-none"
                                        type="text"
                                        id="password"
                                        name="password"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="password">
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
                </div>
            </div>
        </>
    );
};
