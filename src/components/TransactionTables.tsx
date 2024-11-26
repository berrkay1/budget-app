import { categoriesNames, expenseLimits } from "@/helpers/global";
import { BudgetCategories, BudgetModel, BudgetType } from "@/model/global";
import { useState } from "react";
import html2pdf from 'html2pdf.js';
import InfoCard from "./InfoCard";
import { FaRegFilePdf } from "react-icons/fa6";


const TransactionTable = ({ transactions, type }: { transactions: BudgetModel[], type: string }) => {

  const [selectedCategory, setSelectedCategory] = useState<string>("Hepsi");
  const titles = ["Başlık", "Tutar", "Tarih", "Açıklama", "Kategori", "Limit"];

  const categories = ["Hepsi", ...new Set(expenseLimits.map(t => t.category) as string[])];

  const filteredTransactions = selectedCategory === "Hepsi"
    ? transactions
    : transactions.filter(t => t.category === selectedCategory);


  const handleDownloadPDF = () => {
    const element = document.getElementById('transaction-table-' + type);
    const opt = {
      margin: 1,
      filename: 'işlem-tablosu.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (

    < >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Kategori Filtrele:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="outline-none p-1 border border-main rounded dark:bg-gray-700"
          >

            {categories.map((category, index) => (
              <option key={index} value={category}>
                {index === 0 ? category : categoriesNames(category as BudgetCategories)}
              </option>
            ))}
          </select>
        </div>
        <button
          disabled={transactions.length === 0 || filteredTransactions.length === 0}
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-dark-primary text-white rounded-md hover:bg-blue-700 dark:hover:bg-dark-primary-hover  "
        >
          <FaRegFilePdf />
          <span>PDF İndir</span>
        </button>
      </div>


      <div id={"transaction-table-" + type} className="bg-white dark:bg-dark-secondary px-2 py-4 rounded-lg shadow overflow-x-auto w-full">
        <div className='text-xl font-bold text-title dark:text-dark-title mb-3'>{type === BudgetType.Income ? "Gelir" : "Gider"} Tablosu</div>
        <table className="min-w-full">
          <thead className="bg-gray-100 dark:bg-dark-secondary border-b-2">
            <tr>
              {titles.map((title, index) => (
                <th key={index} className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">{title}</th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-300 dark:divide-dark-secondary">
            {
              transactions.length > 0 ?
                <>
                  {
                    filteredTransactions.length === 0 ?
                      <tr>
                        <td colSpan={6}>
                          <InfoCard text="Bu kategori için henüz bir işlem yok" type="info" />
                        </td>
                      </tr>
                      : (
                        <>
                          {
                            filteredTransactions?.map((transaction) => (
                              <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-dark-secondary">
                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">{transaction.title}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                                  {transaction.amount.toLocaleString('tr-TR')} ₺
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                                  {new Date(transaction.date).toLocaleDateString('tr-TR')}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300 truncate max-w-[150px]">
                                  {transaction.description}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">{categoriesNames(transaction.category as BudgetCategories)}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">{expenseLimits.find(limit => limit.category === transaction.category)?.limit.toLocaleString('tr-TR') || 0} ₺</td>
                              </tr>
                            ))
                          }
                        </>
                      )
                  }
                </>
                :
                <tr>
                  <td colSpan={6}>
                    <InfoCard text="Henüz bir işlem yok" type="info" />
                  </td>
                </tr>
            }
          </tbody>
        </table>
      </div>
    </>

  );
};

export default TransactionTable;