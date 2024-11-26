import { BudgetModel, BudgetType } from '@/model/global';
import React from 'react'

type LatestTransactionsProps = {
    transaction: BudgetModel;
}

const LatestTransactions = ({ transaction }: LatestTransactionsProps) => {
    return (

        <div className="w-full shadow-md bg-white dark:bg-dark-secondary rounded-lg p-4 flex justify-between items-center">
            <div className={`text-lg font-bold ${transaction.type === BudgetType.Income ? "text-success" : "text-error"}`}>{transaction.title}</div>
            <div
                className={`text-lg font-bold ${transaction.type === BudgetType.Income ? "text-success" : "text-error"}`}
            >
                {transaction.type === BudgetType.Income ? "+" : "-"}
                {transaction.amount.toLocaleString('tr-TR')} ₺
            </div>
        </div>

    )
}

export default LatestTransactions