import axios from "axios";
import sideDetails from '../assets/side-menu.png'
import { useState } from "react";

const TransactionList = ({ transactions, onDelete }) => {
const [navActive ,setNavActive] =useState(false)

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://personalfinancebackend-0415.onrender.com/api/personal/${id}`);
      onDelete(); 
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };
  const handleNav =()=>{
    setNavActive((prev)=> !prev)
  }
  const handleCancel =()=>{
    setNavActive(false)
  }
  

  return (
    <div className="overflow-hidden">
        <div className="png-btn" onClick={handleNav}>
            <button className="details"><span className="detailsBtn-span">Transaction Details </span> <span><img src={sideDetails} alt="" id="sideDetails" /></span></button>
           
        </div>
        <div className={`list-details ${navActive ? "active" :""}`}>
          <button className="cancel" onClick={handleCancel}><i class="fa-solid fa-xmark"></i></button>
          <div className="chartdelete">
      <h2 className="transctions-h2">Transactions</h2>
      {Array.isArray(transactions) && transactions.length > 0 ? (
        <ul className="ul">
          {transactions.map((t) => (
            <ul className="inner-ul">
            <li key={t._id} className="li">
             <span className="Amount-span">Amount :- </span>  {t.amount}
            </li>
            <li key={`desc-${t._id}`} className="li">
            <span className="Amount-span">Description :- </span> {t.description}
            </li>
            <div className="marge-flex">
            <li key={`date-${t._id}`} className="li">
            <span className="Amount-span">Date :- </span>{new Date(t.date).toLocaleDateString()}
            </li>
            <li key={`delete-${t._id}`} className="li ">
              <button onClick={() => handleDelete(t._id)}className="btnDelete" >Delete</button>
            </li>
            </div>
          </ul>
          
          ))}
        </ul>
        
      ) : (
        <p>No transactions available</p>
      )}
      </div>
      </div>
    </div>
  );
};

export default TransactionList;
