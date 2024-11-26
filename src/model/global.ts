export type ContextType = {
    transactions: BudgetModel[];
    setTransactions: React.Dispatch<React.SetStateAction<BudgetModel[]>>;
}

export type BudgetModel = {
    id: string;
    title: string;
    amount: number;
    date: string;
    description: string;
    type: "income" | "expense";
    category: string;
}

export type ExpenseLimitType = {
    category: string;
    limit: number;
}

export enum Urls {
    Dashboard = "/",
    Income = "/income",
    Expenses = "/expense",
    Transactions = "/transactions",
}

export enum BudgetCategories {
    Education = "education",
    Food = "food",
    Transportation = "transportation",
    Health = "health",
    Shopping = "shopping",
    Rent = "rent",
    Other = "other"

}

export enum BudgetType {
    Income = "income",
    Expense = "expense"
}


