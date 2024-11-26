"use client"
import BudgetCard from '@/components/BudgetCard';
import FormModal from '@/components/FormModal';
import PriceCard from '@/components/PriceCard'
import { useBudget } from '@/context/ContextProvider';
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { Legend, Cell, Pie, PieChart } from 'recharts';
import { renderCustomizedLabel } from '@/helpers/global';
import { BudgetType } from '@/model/global';
import InfoCard from '@/components/InfoCard';
const Expense = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { transactions } = useBudget();
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


    const data = transactions.filter((expense) => expense.type === BudgetType.Expense).map((transaction) => ({
        name: transaction.title,
        value: transaction.amount
    }));

    const totalExpense = data.reduce((total, item) => total + item.value, 0);

    return (
        <div className="container">
            <PriceCard color="error" title="Toplam Gider" price={totalExpense} />
            <div className="flex gap-4 mt-8 flex-col lg:flex-row">
                <div className="flex-1 border h-[380px] border-gray-300 rounded-lg p-4 overflow-auto">
                    <div className='flex items-center justify-between mb-4'>
                        <div className='text-title dark:text-dark-title font-semibold text-lg mb-4'>Giderler</div>
                        <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center w-auto bg-primary text-white p-2 rounded hover:bg-primary/80 transition">
                            <FaPlus className="mr-2" />
                            <span>Gider Ekle</span>
                        </button>
                    </div>
                    <div className='space-y-4'>
                        {
                            transactions.filter((expense) => expense.type === BudgetType.Expense).length > 0 ?
                                <>
                                    {
                                        transactions.filter((expense) => expense.type === BudgetType.Expense).map((transaction) => (
                                            <BudgetCard key={transaction.id} transaction={transaction} />
                                        ))
                                    }
                                </>
                                : <InfoCard text="Henüz Gider eklenmedi" type="info" />
                        }
                    </div>
                    <FormModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        type="expense"
                        titleText="Gider"
                    />
                </div>
                <div className="flex flex-col h-[380px] flex-1 border border-gray-300 rounded-lg p-4">
                    <div className="text-lg font-semibold text-title dark:text-dark-title mb-4">Gider Dağılımı</div>
                    {
                        transactions.filter((expense) => expense.type === BudgetType.Expense).length > 0 ?
                            <div className='flex items-center justify-center'>
                                <PieChart width={300} height={300}>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={120}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                        ))}
                                    </Pie>
                                    <Legend
                                        layout="horizontal"
                                        verticalAlign="bottom"
                                        align="center"
                                    />
                                </PieChart>
                            </div>
                            : <InfoCard text="Henüz Gider eklenmedi" type="info" />
                    }
                </div>
            </div>
        </div>
    )
}

export default Expense