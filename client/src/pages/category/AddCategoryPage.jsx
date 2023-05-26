import { useState } from "react";
import { PulseLoader } from "react-spinners";
import { toaster } from "evergreen-ui";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";
import { useQueryClient } from "@tanstack/react-query";

import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

import { useNavigate } from "react-router-dom";

export const AddCategoryPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { currentUser } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [saving, setSaving] = useState(false);

    const mutation = useMutation(
        (data) => {
            return makeRequest.post("/categories", data);
        },
        {
            onSuccess: (data) => {
                setSaving(false);
                queryClient.invalidateQueries([
                    "categories",
                    currentUser.username,
                ]);

                navigate("/");

                toaster.success("Successfully saved category!", {
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

        if (!name) {
            return toaster.danger("Enter all the fields!", {
                hasCloseButton: true,
                duration: 3,
                id: "register-failed",
            });
        }

        setSaving(true);

        mutation.mutate({ name: name });
    };

    return (
        <>
            <div className="flex flex-col justify-center gap-5 ml-80 w-[100vw] z-2">
                <div className="bg-stone-600 flex flex-col  rounded  items-center w-[75%] justify-center p-4 h-16">
                    <p className="font-semibold text-xl">Add Category</p>
                </div>

                <div className="flex bg-stone-600 w-[75%] rounded p-4">
                    <form
                        className="w-full flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col w-full">
                            <label htmlFor="name">Name:</label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                className="bg-stone-500 px-2 py-1.5 rounded placeholder-white text-white border border-stone-600 hover:border-sky-500 focus:border-sky-500 ring-0 outline-none"
                                type="text"
                                id="name"
                                name="name"
                            />
                        </div>

                        <div className="flex justify-between w-full">
                            <button className="bg-sky-500 h-12 flex justify-center items-center hover:bg-sky-600 focus:bg-sky-600 transition rounded px-4 py-2">
                                {saving ? (
                                    <PulseLoader color="white" />
                                ) : (
                                    "Save!"
                                )}
                            </button>

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
