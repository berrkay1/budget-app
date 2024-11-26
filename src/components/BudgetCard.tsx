import { useBudget } from '@/context/ContextProvider';
import { BudgetModel } from '@/model/global';
import React from 'react'
import { BsChatDots } from 'react-icons/bs'
import { BsCalendarEvent, } from 'react-icons/bs'
import { FaTrashAlt } from 'react-icons/fa'
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { toast } from 'react-toastify';

type BudgetCardProps = {
    transaction: BudgetModel;
}

const BudgetCard = ({ transaction }: BudgetCardProps) => {

    const { setTransactions } = useBudget();

    const handleDelete = (id: string) => {
        setTransactions(prevTransactions => prevTransactions.filter(item => item.id !== id));
        toast.success(`${transaction.type === 'income' ? 'Gelir' : 'Gider'} başarıyla silindi`);
    }

    return (
        <div className="flex items-center p-4 bg-white dark:bg-dark-secondary shadow-md rounded-lg space-x-4">
            <div className="flex-1">
                <div className="flex items-center gap-1 mb-2">
                    <div className="font-semibold text-title dark:text-dark-title">{transaction.title}</div>
                </div>
                <div className="flex items-center text-gray-500 text-sm space-x-4">

                    <div className="flex items-center space-x-2">
                        <FaRegMoneyBillAlt />
                        <span className="font-medium">{transaction.amount.toLocaleString('tr-TR')} ₺</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <BsCalendarEvent />
                        <span>{transaction.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <BsChatDots />
                        <span className='max-w-[150px] truncate'>{transaction.description}</span>
                    </div>
                </div>
            </div>
            <button
                className="bg-indigo-600 p-2 rounded-full hover:bg-indigo-700 transition"
                onClick={() => handleDelete(transaction.id)}
            >
                <FaTrashAlt className="text-white text-sm" />
            </button>
        </div>
    )
}

export default BudgetCard