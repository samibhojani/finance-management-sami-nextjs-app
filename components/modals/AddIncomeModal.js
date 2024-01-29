import { useRef, useEffect, useContext } from "react";
import { currencyFormatter } from "@/libs/utils";

import { financeContext } from "@/libs/store/finance-context";

// Icons
import { FaRegTrashAlt } from "react-icons/fa";

import Modal from "@/components/Modal";

function AddIncomeModal({ show, onClose }) {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const { income, addIncomeItem, removeIncomeItem } = useContext(financeContext);

  // Handler Function
  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
    };

    try {
        await addIncomeItem(newIncome)
        descriptionRef.current.value = "";
        amountRef.current.value = "";
        
    } catch (error) {
        console.log(error.message)
    }

  };
  const deleteIncomeEntryHandler = async (incomeId) => {
    try {
        await removeIncomeItem(incomeId);
    } catch (error) {
        console.log(error.message)
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <form onSubmit={addIncomeHandler} className="flex flex-col">
        <div className="grp-style">
          <label htmlFor="amount">Income Amount</label>
          <input
            type="number"
            min={0.01}
            step={0.01}
            name="amount"
            ref={amountRef}
            placeholder="Enter income amount"
            required
          />
        </div>
        <div className="grp-style">
          <label htmlFor="description">Income Description</label>
          <input
            type="text"
            name="description"
            ref={descriptionRef}
            placeholder="Enter income description"
            required
          />
        </div>

        <button className="btn btn-primary font-semibold">Add income</button>
      </form>

      <div className="flex flex-col gap-4 mt-6">
        <h3 className="text-2xl font-bold">Income History</h3>

        {income.map((i) => {
          return (
            <div key={i.id} className="flex justify-between items-center">
              <div>
                <p className="font-semibold ">{i.description}</p>
                <small className="text-xs">{i.createdAt.toISOString()}</small>
              </div>
              <p className="flex items-center gap-2">
                {currencyFormatter(i.amount)}
                <button
                  onClick={() => {
                    deleteIncomeEntryHandler(i.id);
                  }}
                >
                  <FaRegTrashAlt />
                </button>
              </p>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

export default AddIncomeModal;
