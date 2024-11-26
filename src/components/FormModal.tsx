import React from 'react'
import { IoClose } from 'react-icons/io5';
import IncomeExpenseForm from './IncomeExpenseForm';

type FormModalProps = {
    isOpen: boolean;
    onClose: () => void;
    type: "income" | "expense";
    titleText: string;
}

const FormModal = ({ isOpen, onClose, type, titleText }: FormModalProps) => {

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

                    <div className="relative bg-white dark:bg-dark-secondary rounded-lg shadow-lg p-6 w-[90%] md:w-2/5">
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
                            aria-label="Close"
                        >
                            <IoClose className="text-2xl" />
                        </button>
                        <IncomeExpenseForm
                            onClose={onClose}
                            title={titleText}
                            type={type}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default FormModal