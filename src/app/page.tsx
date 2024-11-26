"use client"
import InfoCard from "@/components/InfoCard";
import LatestTransactions from "@/components/LatestTransactions";
import PriceCard from "@/components/PriceCard";
import { useBudget } from "@/context/ContextProvider";
import { BudgetType } from "@/model/global";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  format,
  parseISO,
  getYear,
  getMonth,
  startOfMonth,
  endOfMonth,
  isWithinInterval
} from 'date-fns';
import { tr } from 'date-fns/locale';
import { useState } from "react";

export default function Home() {
  const [selectedYear, setSelectedYear] = useState(getYear(new Date()));
  const [selectedMonth, setSelectedMonth] = useState(getMonth(new Date()));

  const { transactions } = useBudget();

  const years = [...new Set(transactions.map(t => getYear(parseISO(t.date))))].sort((a, b) => b - a);

  const months = [
    { value: -1, label: 'Tüm Aylar' },
    ...Array.from({ length: 12 }, (_, i) => ({
      value: i,
      label: format(new Date(2024, i, 1), 'LLLL', { locale: tr })
    }))
  ];

  const filteredData = transactions
    .filter(transaction => {
      const transactionDate = parseISO(transaction.date);
      const yearMatch = getYear(transactionDate) === selectedYear;

      if (selectedMonth === -1) return yearMatch;

      if (yearMatch) {
        const startDate = startOfMonth(new Date(selectedYear, selectedMonth));
        const endDate = endOfMonth(new Date(selectedYear, selectedMonth));

        return isWithinInterval(transactionDate, { start: startDate, end: endDate });
      }

      return false;
    })
    .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
    .map(transaction => ({
      date: format(parseISO(transaction.date), 'd MMMM yyyy', { locale: tr }),
      income: transaction.type === BudgetType.Income ? transaction.amount : 0,
      expense: transaction.type === BudgetType.Expense ? transaction.amount : 0
    }));

  const calculateTotalForPeriod = (type: BudgetType) => {
    return transactions
      .filter(transaction => {
        const transactionDate = parseISO(transaction.date);
        const yearMatch = getYear(transactionDate) === selectedYear;

        if (selectedMonth === -1) return yearMatch && transaction.type === type;

        if (yearMatch) {
          const startDate = startOfMonth(new Date(selectedYear, selectedMonth));
          const endDate = endOfMonth(new Date(selectedYear, selectedMonth));

          return isWithinInterval(transactionDate, { start: startDate, end: endDate }) &&
            transaction.type === type;
        }

        return false;
      })
      .reduce((total, item) => total + item.amount, 0);
  };

  const totalIncomePeriod = calculateTotalForPeriod(BudgetType.Income);
  const totalExpensePeriod = calculateTotalForPeriod(BudgetType.Expense);
  const remainingBalancePeriod = totalIncomePeriod - totalExpensePeriod;


  const totalIncome = transactions.filter(t => t.type === BudgetType.Income).reduce((total, item) => total + item.amount, 0);
  const totalExpense = transactions.filter(t => t.type === BudgetType.Expense).reduce((total, item) => total + item.amount, 0);
  const remainingBalance = totalIncome - totalExpense;

  return (
    <div className="container">
      <div className="text-2xl font-bold text-title dark:text-dark-title">Bütçe Durumu</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 md:mt-8">
        <PriceCard color="success" title="Toplam Gelir" price={totalIncome} />
        <PriceCard color="error" title="Toplam Gider" price={totalExpense} />
        <PriceCard color="primary" title="Toplam Kalan" price={remainingBalance} />
      </div>



      <div className="flex h-auto lg:h-[460px]  justify-between mt-4 lg:mt-8 flex-col lg:flex-row gap-8 ">
        <div className="bg-indigo-100 dark:bg-dark-primary p-4 h-full flex flex-1 flex-col rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-title dark:text-dark-title mb-3">Gelir Gider Grafiği</div>

            {transactions.length > 0 && <div className="flex gap-4 mb-4">
              <select
                className="p-2 outline-none rounded-md border dark:bg-dark-secondary dark:text-dark-title"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <select
                className="p-2 outline-none rounded-md border dark:bg-dark-secondary dark:text-dark-title"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
              >
                {months.map(month => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>}

          </div>


          <div className="flex justify-center items-center mt-4">
            {
              transactions.length > 0 ?
                <>
                  {
                    remainingBalancePeriod == 0 ?
                      <InfoCard text="Bu ay için gelir gider bilgisi bulunamadı" type="info" />
                      :
                      <div className="w-full h-[300px] sm:h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={filteredData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 65 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                            <XAxis
                              dataKey="date"
                              angle={-45}
                              textAnchor="end"
                              height={60}
                              interval="preserveStartEnd"
                              dy={10}
                              tick={{ fontSize: 12 }}
                            />
                            <YAxis
                              dx={-10}
                              tick={{ fontSize: 12 }}
                            />
                            <Tooltip />
                            <Legend
                              verticalAlign="top"
                              height={36}
                            />
                            <Line
                              type="monotone"
                              dataKey="income"
                              stroke="#859F3D"
                              name="Gelir"
                              strokeWidth={2}
                              dot={{ strokeWidth: 2 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="expense"
                              stroke="#F95454"
                              name="Gider"
                              strokeWidth={2}
                              dot={{ strokeWidth: 2 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                  }
                </>
                : <InfoCard text="Henüz Gelir Gider işlemi yapılmadı" type="info" />
            }
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 dark:bg-dark-primary p-4 rounded-lg shadow-md overflow-auto">
          <div className="text-xl font-bold text-title dark:text-dark-title mb-4">Son Gelir Giderler</div>
          <div className="space-y-4">
            {
              transactions.length > 0 ?
                <>
                  {transactions.map((transaction, idx) => (
                    idx < 3 && <LatestTransactions key={transaction.id} transaction={transaction} />
                  ))}
                </>
                : <InfoCard text="Henüz Gelir Gider işlemi yapılmadı" type="info" />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
