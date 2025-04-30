
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

export type Category = 
  | 'food' 
  | 'transportation' 
  | 'housing' 
  | 'utilities' 
  | 'entertainment' 
  | 'healthcare' 
  | 'education' 
  | 'shopping'
  | 'personal'
  | 'travel'
  | 'gifts'
  | 'income'
  | 'other';

export type Transaction = {
  id: string;
  amount: number;
  description: string;
  category: Category;
  date: string;
  type: 'income' | 'expense';
};

export type Budget = {
  category: Category;
  amount: number;
};

type FinanceState = {
  transactions: Transaction[];
  budgets: Budget[];
  loading: boolean;
};

type FinanceAction = 
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'UPDATE_TRANSACTION'; payload: Transaction }
  | { type: 'SET_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'SET_BUDGETS'; payload: Budget[] }
  | { type: 'ADD_BUDGET'; payload: Budget }
  | { type: 'UPDATE_BUDGET'; payload: Budget }
  | { type: 'DELETE_BUDGET'; payload: Category };

const initialState: FinanceState = {
  transactions: [],
  budgets: [],
  loading: true,
};

// Example data for demonstration
const demoTransactions: Transaction[] = [
  {
    id: '1',
    amount: 2500,
    description: 'Salary deposit',
    category: 'income',
    date: '2025-04-25',
    type: 'income',
  },
  {
    id: '2',
    amount: 45.99,
    description: 'Grocery shopping',
    category: 'food',
    date: '2025-04-26',
    type: 'expense',
  },
  {
    id: '3',
    amount: 9.99,
    description: 'Streaming subscription',
    category: 'entertainment',
    date: '2025-04-27',
    type: 'expense',
  },
  {
    id: '4',
    amount: 35.50,
    description: 'Gas station',
    category: 'transportation',
    date: '2025-04-28',
    type: 'expense',
  },
  {
    id: '5',
    amount: 75.00,
    description: 'Electricity bill',
    category: 'utilities',
    date: '2025-04-29',
    type: 'expense',
  }
];

const demoBudgets: Budget[] = [
  { category: 'food', amount: 400 },
  { category: 'transportation', amount: 200 },
  { category: 'entertainment', amount: 150 },
  { category: 'utilities', amount: 300 },
];

function financeReducer(state: FinanceState, action: FinanceAction): FinanceState {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return {
        ...state,
        transactions: action.payload,
        loading: false,
      };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case 'SET_BUDGETS':
      return {
        ...state,
        budgets: action.payload,
      };
    case 'ADD_BUDGET':
      return {
        ...state,
        budgets: [...state.budgets, action.payload],
      };
    case 'UPDATE_BUDGET':
      return {
        ...state,
        budgets: state.budgets.map((b) =>
          b.category === action.payload.category ? action.payload : b
        ),
      };
    case 'DELETE_BUDGET':
      return {
        ...state,
        budgets: state.budgets.filter((b) => b.category !== action.payload),
      };
    default:
      return state;
  }
}

type FinanceContextType = {
  state: FinanceState;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (transaction: Transaction) => void;
  addBudget: (budget: Budget) => void;
  updateBudget: (budget: Budget) => void;
  deleteBudget: (category: Category) => void;
};

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  useEffect(() => {
    // Load data from localStorage or use demo data
    const savedTransactions = localStorage.getItem('transactions');
    const savedBudgets = localStorage.getItem('budgets');

    if (savedTransactions) {
      dispatch({ type: 'SET_TRANSACTIONS', payload: JSON.parse(savedTransactions) });
    } else {
      // Use demo data
      dispatch({ type: 'SET_TRANSACTIONS', payload: demoTransactions });
    }

    if (savedBudgets) {
      dispatch({ type: 'SET_BUDGETS', payload: JSON.parse(savedBudgets) });
    } else {
      dispatch({ type: 'SET_BUDGETS', payload: demoBudgets });
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!state.loading) {
      localStorage.setItem('transactions', JSON.stringify(state.transactions));
      localStorage.setItem('budgets', JSON.stringify(state.budgets));
    }
  }, [state.transactions, state.budgets, state.loading]);

  // Generate a unique ID
  const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: generateId(),
    };
    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
  };

  const deleteTransaction = (id: string) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  const updateTransaction = (transaction: Transaction) => {
    dispatch({ type: 'UPDATE_TRANSACTION', payload: transaction });
  };

  const addBudget = (budget: Budget) => {
    dispatch({ type: 'ADD_BUDGET', payload: budget });
  };

  const updateBudget = (budget: Budget) => {
    dispatch({ type: 'UPDATE_BUDGET', payload: budget });
  };

  const deleteBudget = (category: Category) => {
    dispatch({ type: 'DELETE_BUDGET', payload: category });
  };

  return (
    <FinanceContext.Provider
      value={{
        state,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        addBudget,
        updateBudget,
        deleteBudget,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}
