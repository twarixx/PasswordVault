import { Dialog } from "@headlessui/react";
import { Transition } from "@headlessui/react";

export const ConfirmationDialog = ({ isOpen, onClose, confirmAction }) => {
    return (
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
                                    className="text-xl font-medium leading-6 text-gray text-white items-center justify-center flex"
                                >
                                    Are you sure?
                                </Dialog.Title>
                                <div className="flex gap-4 text-white">
                                    <button
                                        className="bg-green-500 h-12  flex justify-center w-[250px] items-center hover:bg-green-600 focus:bg-green-600 transition rounded   px-4 mt-5 py-2"
                                        onClick={confirmAction}
                                    >
                                        Confirm
                                    </button>

                                    <button
                                        className="bg-red-500 h-12  flex justify-center w-[250px] items-center hover:bg-red-600 focus:bg-red-600 transition rounded   px-4 mt-5 py-2"
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
