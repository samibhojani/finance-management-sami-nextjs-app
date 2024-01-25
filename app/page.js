"use client";
import { useEffect, useRef, useState } from "react";

import { currencyFormatter } from "@/libs/utils";

import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";
import Modal from "@/components/Modal";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Firebase
import { db } from "@/libs/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

// Icons
import { FaRegTrashAlt } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

const DUMMY_DATA = [
  {
    id: 1,
    title: "Entertainment",
    color: "#fff",
    total: 5000,
  },
  {
    id: 2,
    title: "Misc",
    color: "#000",
    total: 10000,
  },
  {
    id: 3,
    title: "Gas bill",
    color: "red",
    total: 3000,
  },
  {
    id: 4,
    title: "KE bill",
    color: "green",
    total: 7000,
  },
  {
    id: 5,
    title: "Rent",
    color: "yellow",
    total: 2000,
  },
];

export default function Home() {
  const [showAddIncomeModal, setshowAddIncomeModal] = useState(false);
  const [income, setIncome] = useState([]);
  console.log(income);

  const amountRef = useRef();
  const descriptionRef = useRef();

  // Handler Function
  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
    };

    const collectionRef = collection(db, "income");
    try {
      const docSnap = await addDoc(collectionRef, newIncome);

      // update state
      setIncome((prevState) => {
        return [
          ...prevState,
          {
            id: docSnap.id,
            ...newIncome,
          },
        ];
      });

      descriptionRef.current.value = "";
      amountRef.current.value = "";
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteIncomeEntryHandler = async (incomeId) => {
    const docRef = doc(db, "income", incomeId);
    try {
      await deleteDoc(docRef);
      setIncome((prevState) => {
        return prevState.filter((i) => i.id !== incomeId);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getIncomeData = async () => {
      const collectionRef = collection(db, "income");
      const docsSnap = await getDocs(collectionRef);

      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        };
      });

      setIncome(data);
    };

    getIncomeData();
  }, []);

  return (
    <>
      {/* Add Income Modal */}
      <Modal show={showAddIncomeModal} onClose={setshowAddIncomeModal}>
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
      <main className="container max-w-2xl px-6 mx-auto">
        <section className="py-3">
          <small className="">Balance:</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(400000)}</h2>
        </section>

        <section className="flex items-center py-3 gap-2">
          <button className="btn btn-primary ">+ Expenses</button>
          <button
            onClick={() => {
              setshowAddIncomeModal(true);
            }}
            className="btn btn-primary-outline"
          >
            + Income
          </button>
        </section>

        {/* Expenses */}
        <section>
          <h3>My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {DUMMY_DATA.map((expense) => {
              return (
                <ExpenseCategoryItem
                  key={expense.id}
                  color={expense.color}
                  title={expense.title}
                  total={expense.total}
                />
              );
            })}
          </div>
        </section>

        {/* Chart Section */}

        <section className="py-6">
          <h3 className="text-2xl ">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: DUMMY_DATA.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: DUMMY_DATA.map((expense) => expense.total),
                    backgroundColor: DUMMY_DATA.map((expense) => expense.color),
                    borderColor: ["#18181b"],
                    borderWidth: 5,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
