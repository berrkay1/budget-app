"use client"
import { ContextType, BudgetModel } from '@/model/global';
import React, { createContext, useState, useContext, useEffect } from 'react';

const ContextProvider = createContext<ContextType | null>(null);

export const BudgetProvider = ({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(false);
    const [transactions, setTransactions] = useState<BudgetModel[]>([]);


    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const storedTransactions = localStorage.getItem('transactions');
        if (storedTransactions) {
            setTransactions(JSON.parse(storedTransactions));
        }
    }, [mounted]);

    useEffect(() => {
        if (!mounted) return;
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions, mounted]);




    const contextValue: ContextType = {
        transactions,
        setTransactions,
    };

    if (!mounted) {
        return null;
    }

    return (
        <ContextProvider.Provider value={contextValue}>
            {children}
        </ContextProvider.Provider>
    );
};

export const useBudget = () => {
    const context = useContext(ContextProvider);
    if (!context) {
        throw new Error('useBudget must be used within a BudgetProvider');
    }
    return context;
};