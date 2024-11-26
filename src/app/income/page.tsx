"use client"
import BudgetCard from '@/components/BudgetCard';
import FormModal from '@/components/FormModal';
import InfoCard from '@/components/InfoCard';
import PriceCard from '@/components/PriceCard'
import { useBudget } from '@/context/ContextProvider';
import { renderCustomizedLabel } from '@/helpers/global';
import { BudgetType } from '@/model/global';
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { Legend, Cell, Pie, PieChart } from 'recharts';

const Income = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { transactions } = useBudget();
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const data = transactions.filter((income) => income.type === BudgetType.Income).map((transaction) => ({
        name: transaction.title,
        value: transaction.amount
    }));

    const totalIncome = data.reduce((total, item) => total + item.value, 0);

    return (
        <div className="container">
            <PriceCard color="success" title="Toplam Gelir" price={totalIncome} />
            <div className="flex gap-4 mt-8 flex-col lg:flex-row">
                <div className="flex-1 border h-[380px] border-gray-300 rounded-lg p-4 overflow-auto">
                    <div className='flex items-center justify-between mb-4'>
                        <div className='text-title dark:text-dark-title font-semibold text-lg mb-4'>Gelirler</div>
                        <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center w-auto bg-primary text-white p-2 rounded hover:bg-primary/80 transition">
                            <FaPlus className="mr-2" />
                            <span>Gelir Ekle</span>
                        </button>
                    </div>
                    <div className='space-y-4'>
                        {
                            transactions.filter((income) => income.type === BudgetType.Income).length > 0 ?
                                <>
                                    {
                                        transactions.filter((income) => income.type === BudgetType.Income).map((transaction) => (
                                            <BudgetCard key={transaction.id} transaction={transaction} />
                                        ))
                                    }
                                </>
                                : <InfoCard text="Henüz Gelir eklenmedi" type="info" />
                        }
                    </div>
                    <FormModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        type="income"
                        titleText="Gelir"
                    />
                </div>
                <div className="flex flex-1 h-[380px] flex-col border border-gray-300 box-shadow-md p-4 rounded-lg">
                    <div className="text-lg font-semibold text-title dark:text-dark-title mb-4">Gelir Dağılımı</div>
                    {
                        transactions.filter((income) => income.type === BudgetType.Income).length > 0 ?
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
                            : <InfoCard text="Henüz Gelir eklenmedi" type="info" />
                    }
                </div>
            </div>
        </div>
    )
}

export default Income