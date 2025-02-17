import { useState } from "react";
import axios from "axios";

const TransactionForm = ({ onAdd }) => {
  const [form, setForm] = useState({ amount: "", date: "", description: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://personalfinancebackend-0415.onrender.com/api/personal", form);
    setForm({ amount: "", date: "", description: "" });
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input name="amount" type="number" placeholder="Amount" onChange={handleChange} value={form.amount} required />
      <input name="date" type="date" onChange={handleChange} value={form.date} required />
      <input name="description" type="text" placeholder="Description" onChange={handleChange} value={form.description} required />
      <button type="submit" className="submitBtn">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
