import { useContext, useReducer } from "react";
import { Transactions, Categories } from "../dummyData";
import React from "react";

export const TransactionContext = React.createContext({
    transactions: Transactions,
    categories: Categories,
    addTransaction: ({title, amount, date, category, type}) => {},
    deleteTransaction: (id) => {},
    updateTransaction: (id, {title, category, date, type}) => {},
});

function transactionReducer(state, action) {
    switch (action.type) {
        case 'ADD_TRANSACTION':
            const id = new Date().toString() + Math.random().toString();
            return {
                ...state,
                transactions: [
                    ...state.transactions,
                    {
                        id,
                        title: action.payload.title,
                        amount: action.payload.amount,
                        date: action.payload.date,
                        category: action.payload.category,
                        type: action.payload.type,
                    }
                ]
            };
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction.id !== action.payload.id)
            };
        case 'UPDATE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.map(transaction => {
                    if (transaction.id === action.payload.id) {
                        return {
                            ...transaction,
                            title: action.payload.title,
                            category: action.payload.category,
                            date: action.payload.date,
                            type: action.payload.type,
                        }
                    }
                    return transaction;
                })
            };
        default:
            return state;
    }
}


function TransactionProvider({children}) {
    const [state, dispatch] = useReducer(transactionReducer, {transactions: Transactions, categories: Categories});

    function addTransaction({title, amount, date, category, type}) {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: {
                title,
                amount,
                date,
                category,
                type,
            }
        });
    }

    function deleteTransaction(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: {
                id,
            }
        });
    }

    function updateTransaction(id, {title, category, date, type}) {
        dispatch({
            type: 'UPDATE_TRANSACTION',
            payload: {
                id,
                title,
                category,
                date,
                type,
            }
        });
    }

    return (
        <TransactionContext.Provider value={{
            transactions: state.transactions,
            categories: state.categories,
            addTransaction,
            deleteTransaction,
            updateTransaction,
        }}>
            {children}
        </TransactionContext.Provider>
    );
}
export default TransactionProvider;