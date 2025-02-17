import { useState, useEffect } from 'react';
import './App.css';
import TransactionForm from './component/TransactionForm';
import TransactionList from './component/TransactionList';
import ExpenseChart from './component/ExpensesChart';

function App() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await fetch("https://personalfinancebackend-0415.onrender.com/api/personal");
      const data = await res.json();
      
      if (Array.isArray(data.transactions)) {
        setTransactions(data.transactions); 
      } else {
        console.error("API did not return an array:", data);
      }
    } catch (error) {
      console.log("Transaction fetch error:", error);
    }
  };
  

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <ExpenseChart transactions={transactions} />
      <TransactionForm onAdd={fetchTransactions} />
      <TransactionList transactions={transactions} onDelete={fetchTransactions} />

      
    </>
  );
}

export default App;
