"use client"
import TransactionTable from '@/components/TransactionTables'
import { useBudget } from '@/context/ContextProvider';
import { BudgetType } from '@/model/global';
import React, { useState } from 'react'
import SavingsRecommendationCard from '../../../components/SavingsRecommendationCard';

const Transactions = () => {

    const { transactions } = useBudget();
    const [showCard, setShowCard] = useState(false);

    const income = transactions.filter((income) => income.type === BudgetType.Income).reduce((acc, curr) => acc + curr.amount, 0);
    const expenses = transactions.filter((expense) => expense.type === BudgetType.Expense).reduce((acc, curr) => acc + curr.amount, 0);


    return (
        <div className="container">
            <div className='flex justify-between'>
                <div className='text-2xl font-bold text-title dark:text-dark-title mb-6'>Gelir-Gider İşlemleri</div>

                <div>
                    <button
                        onClick={() => setShowCard(true)}
                        disabled={transactions.length === 0}
                        className={`${transactions.length > 0 ? "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" : "bg-gray-500 text-gray-300 px-4 py-2 rounded cursor-not-allowed"}`}
                    >
                        Tasarruf Önerilerini Göster
                    </button>
                    {showCard && (
                        <SavingsRecommendationCard
                            income={income}
                            expenses={expenses}
                            onClose={() => setShowCard(false)}
                        />
                    )}
                </div>
            </div>
            <div className='mt-4 space-x-2 mb-10'>
                <TransactionTable type={BudgetType.Income} transactions={transactions.filter((income) => income.type === BudgetType.Income)} />
            </div>
            <div className='mt-4 space-x-2'>
                <TransactionTable type={BudgetType.Expense} transactions={transactions.filter((expense) => expense.type === BudgetType.Expense)} />
            </div>
        </div>
    )
}

export default Transactions