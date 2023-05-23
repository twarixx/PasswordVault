import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toaster } from "evergreen-ui";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { PulseLoader } from "react-spinners";

export const UpgradePremiumPage = () => {
    const [upgrading, setUpgrading] = useState(false);
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [text, setText] = useState({
        firstname: "",
        lastname: "",
        zipcode: "",
        city: "",
        bank: "",
    });

    const mutation = useMutation(
        (data) => {
            return makeRequest.post("/upgrade");
        },
        {
            onSuccess: (data) => {
                setUpgrading(false);

                setCurrentUser(data.data);
                navigate("/");

                toaster.success("You have been upgraded!", {
                    hasCloseButton: true,
                    duration: 3,
                    id: "upgrade-successful",
                });
            },
            onError: (error) => {
                setUpgrading(false);

                toaster.danger(error.response.data.message, {
                    hasCloseButton: true,
                    duration: 3,
                    id: "upgrade-failed",
                });
            },
        }
    );

    const handleRoleChange = (event) => {
        event.preventDefault();

        if (
            text.firstname === "" ||
            text.lastname === "" ||
            text.zipcode === "" ||
            text.city === "" ||
            text.bank === ""
        ) {
            return toaster.danger("Enter all the fields!", {
                hasCloseButton: true,
                duration: 5,
                id: "upgrade-failed",
            });
        }

        setUpgrading(true);
        mutation.mutate(text);
    };

    if (currentUser.role === "Admin") {
        return (
            <div className="flex justify-center gap-24 w-[100vw] z-2">
                <div className="bg-stone-600 rounded w-[60%] flex items-center justify-center p-4 h-16">
                    <p className="font-semibold">
                        You can't upgrade your account since you are an
                        Administrator!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex justify-center gap-24 w-[100vw] z-2">
                <div className="bg-stone-600 rounded w-[60%] flex justify-center items-center p-4 h-16">
                    <p className="font-semibold text-xl">
                        Let's get you going!
                    </p>
                </div>
            </div>

            <div className="flex justify-center gap-6 w-[100vw] z-2">
                <div className="bg-stone-600 rounded w-[60%] flex flex-col justify-between pt-2 px-4 pb-4 gap-2">
                    <form className="flex flex-col items-center gap-4 w-full">
                        <div className="flex gap-6 text-center w-full">
                            <div className="flex flex-col w-full">
                                <label htmlFor="firstname">First Name</label>
                                <input
                                    className="bg-stone-500 px-2 py-1.5 rounded placeholder-white text-white border border-stone-600 hover:border-sky-500 focus:border-sky-500 ring-0 outline-none"
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <label htmlFor="lastname">Last Name</label>
                                <input
                                    className="bg-stone-500 px-2 py-1.5 rounded placeholder-white text-white border border-stone-600 hover:border-sky-500 focus:border-sky-500 ring-0 outline-none"
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                />
                            </div>
                        </div>

                        <div className="flex gap-6 text-center w-full">
                            <div className="flex flex-col w-full">
                                <label htmlFor="zipcode">Zip Code</label>
                                <input
                                    className="bg-stone-500 px-2 py-1.5 rounded placeholder-white text-white border border-stone-600 hover:border-sky-500 focus:border-sky-500 ring-0 outline-none"
                                    type="text"
                                    id="zipcode"
                                    name="zipcode"
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <label htmlFor="city">City</label>
                                <input
                                    className="bg-stone-500 px-2 py-1.5 rounded placeholder-white text-white border border-stone-600 hover:border-sky-500 focus:border-sky-500 ring-0 outline-none"
                                    type="text"
                                    id="city"
                                    name="city"
                                />
                            </div>
                        </div>

                        <div className="flex gap-6 text-center w-full">
                            <div className="flex flex-col w-full">
                                <label htmlFor="bank">Bank Number</label>
                                <input
                                    className="bg-stone-500 px-2 py-1.5 rounded placeholder-white text-white border border-stone-600 hover:border-sky-500 focus:border-sky-500 ring-0 outline-none"
                                    type="text"
                                    id="bank"
                                    name="bank"
                                />
                            </div>
                        </div>

                        <button
                            onClick={(e) => handleRoleChange(e)}
                            className={`${
                                currentUser.role === "Paid"
                                    ? "bg-stone-500"
                                    : "bg-sky-500 hover:bg-sky-600"
                            } transition w-full py-2 rounded text-xl`}
                        >
                            {upgrading ? (
                                <PulseLoader color="white" />
                            ) : (
                                "Upgrade"
                            )}
                        </button>
                    </form>
                </div>

                {/* <div className="bg-stone-600 rounded w-[36.6%] flex flex-col justify-between pt-2 px-4 pb-4 gap-2">
                    <p className="font-semibold text-xl text-center">
                        Paid Account
                    </p>

                    <p>
                        Upgrade to our paid account and unleash the full
                        potential of our password management platform. With our
                        premium offering, you'll enjoy the benefit of saving
                        unlimited passwords. This means you can safeguard every
                        facet of your online presence, from personal email
                        accounts to critical business applications, and
                        everything in between. Say goodbye to limitations and
                        embrace the freedom of unrestricted password storage.
                        Invest in our paid account today and experience the
                        convenience of seamless password management without any
                        boundaries or restrictions.
                    </p>

                    <button
                        onClick={(e) => handleRoleChange(e, "Paid")}
                        className={`${
                            currentUser.role === "Paid"
                                ? "bg-stone-500"
                                : "bg-sky-500 hover:bg-sky-600"
                        } transition px-2 py-2 rounded text-xl`}
                    >
                        {upgrading && currentUser.role === "Free" ? (
                            <PulseLoader color="white" />
                        ) : (
                            "Upgrade"
                        )}
                    </button>
                </div> */}
            </div>
        </div>
    );
};
