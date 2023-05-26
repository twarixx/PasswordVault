import { Dialog } from '@headlessui/react'
import { useContext, useState } from 'react'
import { Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { MasterPasswordContext } from '../../context/MasterPasswordContext';

export const MasterPasswordDialog = ({ isOpen, onClose, destination }) => {
    const [masterPassword, setMasterPassword] = useState("");
    const navigate = useNavigate();
    const { updateMasterPassword } = useContext(MasterPasswordContext);


    return (
        <form>
            <Transition appear show={isOpen}>
                <Dialog as="div" className="relative" onClose={onClose}>
                    <Transition.Child
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full  transform overflow-hidden rounded-2xl bg-stone-600 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray text-white items-center justify-center flex"
                                    >
                                        Enter Master Password
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <input
                                            value={masterPassword}
                                            onChange={(e) =>
                                                setMasterPassword(e.target.value)
                                            }
                                            id="masterPassword"
                                            name="masterPassword"
                                            type="password"
                                            className="bg-stone-500 px-2 py-1.5 rounded placeholder-white text-white border w-[250px] border-stone-600 hover:border-sky-500 focus:border-sky-500 ring-0 outline-none"
                                        ></input>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="bg-sky-500 h-12  flex justify-center w-[250px] items-center hover:bg-sky-600 focus:bg-sky-600 transition rounded   px-4 mt-5 py-2"
                                            onClick={() => {
                                                navigate(destination);
                                                updateMasterPassword(masterPassword);
                                            }}
                                        >
                                            Authenticate !
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </form>
    );
};
