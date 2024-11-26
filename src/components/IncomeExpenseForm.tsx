"use client"
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useBudget } from '@/context/ContextProvider';
import { FaPlus } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { BudgetCategories, BudgetType } from '@/model/global';
import { categoriesNames, expenseLimits } from '@/helpers/global';
import ConfirmModal from './ConfirmModal';

type IncomeExpenseFormProps = {
  type: "income" | "expense";
  title: string;
  onClose: () => void;
}

const IncomeExpenseForm = ({ type, title, onClose }: IncomeExpenseFormProps) => {

  const { transactions, setTransactions } = useBudget();
  const initialFormData = {
    title: '',
    amount: '',
    date: '',
    description: '',
    category: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showConfirm, setShowConfirm] = useState(false);

  const categoryLimit = expenseLimits.find((item) => item.category === formData.category);
  const categoryTotal = transactions.filter(i => i.type === 'expense' && i.category === formData.category).reduce((sum, t) => sum + t.amount, 0) + (parseFloat(formData.amount) ?? 0);

  console.log('categoryLimit', categoryLimit)
  console.log('categoryTotal', categoryTotal)

  if (categoryLimit && categoryTotal) {
    console.log('categoryTotal / categoryLimit.limit', categoryTotal / categoryLimit.limit)

  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (type == BudgetType.Expense && categoryLimit && (categoryTotal / categoryLimit.limit > 0.8)) {
      setShowConfirm(true);
      return;
    }

    submitTransaction();
  };

  const submitTransaction = () => {
    setTransactions([...transactions, {
      id: uuidv4(),
      title: formData.title,
      amount: parseFloat(formData.amount),
      date: formData.date,
      description: formData.description,
      category: formData.category,
      type: type
    }]);

    setFormData(initialFormData);
    onClose();
    toast.success(`${title} başarıyla eklendi`);
  };

  return (
    <div className="bg-white dark:bg-dark-secondary">
      <div>
        <div className="text-primary font-semibold text-lg mb-4">{title}</div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Başlık"
          required
          className="w-full outline-none p-2 border rounded border-main dark:bg-gray-700"
        />
        <input
          type="number"
          min={0}
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          placeholder="Miktar"
          required
          className="w-full outline-none p-2 border rounded border-main dark:bg-gray-700"
        />
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          placeholder="Tarih"
          min={new Date().toISOString().split('T')[0]}
          required
          className="w-full outline-none p-2 border rounded border-main dark:bg-gray-700"
        />
        <select
          name="category"
          id="category"
          className="w-full outline-none p-2 border border-main rounded dark:bg-gray-700"
          required
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="">Kategori Seçin</option>
          <option value={BudgetCategories.Education}>Eğitim</option>
          <option value={BudgetCategories.Food}>Yiyecek</option>
          <option value={BudgetCategories.Transportation}>Ulaştırma</option>
          <option value={BudgetCategories.Health}>Sağlık</option>
          <option value={BudgetCategories.Shopping}>Alışveriş</option>
          <option value={BudgetCategories.Rent}>Kira</option>
          <option value={BudgetCategories.Other}>Diğer</option>
        </select>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          maxLength={150}
          placeholder="Açıklama"
          required
          className="w-full outline-none p-2 border border-main rounded dark:bg-gray-700"
        />


        <button
          type="submit"
          className="flex items-center justify-center w-full bg-primary text-white p-2 rounded hover:bg-primary/80 transition"
        >
          <FaPlus className="mr-2" />
          <span>{title} Ekle</span>
        </button>
      </form>
      
      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={submitTransaction}
        title="Limit Uyarısı"
        message={`${categoriesNames((formData.category as BudgetCategories))} kategorisi için harcama limitinin %80'ini aştınız! Yine de eklemek istiyor musunuz?`}
      />
    </div>
  );
};

export default IncomeExpenseForm;