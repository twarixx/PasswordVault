import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toaster } from "evergreen-ui";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { PulseLoader } from "react-spinners";

export const UpgradePage = () => {
    const [upgrading, setUpgrading] = useState(false);
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const mutation = useMutation(
        () => {
            return makeRequest.post("/downgrade");
        },
        {
            onSuccess: (data) => {
                setUpgrading(false);

                setCurrentUser(data.data);
                navigate("/");

                toaster.success("You have been downgraded!", {
                    hasCloseButton: true,
                    duration: 3,
                    id: "downgrade-successful",
                });
            },
            onError: (error) => {
                setUpgrading(false);

                toaster.danger(error.response.data.message, {
                    hasCloseButton: true,
                    duration: 3,
                    id: "downgrade-failed",
                });
            },
        }
    );

    const handleRoleChange = (event, role) => {
        event.preventDefault();

        if (upgrading) return;
        if (currentUser.role === role) {
            return toaster.danger("You are already on this plan!", {
                hasCloseButton: true,
                duration: 5,
                id: "upgrade-failed",
            });
        }

        switch (role) {
            case "Free":
                setUpgrading(true);
                mutation.mutate();
                break;
            case "Paid":
                navigate("/upgrade/paid");
                break;
        }
    };

    if (currentUser.role === "Admin") {
        return (
            <div className="flex justify-center gap-24 w-[100vw] z-2">
                <div className="bg-stone-600 rounded w-[75%] flex items-center justify-center p-4 h-16">
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
                <div className="bg-stone-600 rounded w-[75%] flex justify-center items-center p-4 h-16">
                    <p className="font-semibold text-xl">Upgrade Account</p>
                </div>
            </div>

            <div className="flex justify-center gap-6 w-[100vw] z-2">
                <div className="bg-stone-600 rounded w-[36.6%] flex flex-col justify-between pt-2 px-4 pb-4 gap-2">
                    <p className="font-semibold text-xl text-center">
                        Free Account
                    </p>

                    <p>
                        Thank you for choosing our services! By creating a free
                        account, you'll have the ability to store up to 50
                        passwords securely. This allocation ensures that you can
                        protect a substantial portion of your digital accounts
                        without incurring any costs. Whether it's your email,
                        social media profiles, or online banking credentials,
                        our platform offers a reliable solution to keep your
                        passwords organized and easily accessible. Sign up today
                        and enjoy the peace of mind that comes with efficient
                        password management.
                    </p>

                    <button
                        onClick={(e) => handleRoleChange(e, "Free")}
                        className={`${
                            currentUser.role === "Free"
                                ? "bg-stone-500"
                                : "bg-sky-500 hover:bg-sky-600"
                        } transition px-2 py-2 rounded text-xl`}
                    >
                        {upgrading && currentUser.role === "Paid" ? (
                            <PulseLoader color="white" />
                        ) : (
                            "Downgrade"
                        )}
                    </button>
                </div>

                <div className="bg-stone-600 rounded w-[36.6%] flex flex-col justify-between pt-2 px-4 pb-4 gap-2">
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
                </div>
            </div>
        </div>
    );
};
