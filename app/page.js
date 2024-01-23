"use client";

import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";
import Modal from "@/components/Modal";
import { currencyFormatter } from "@/libs/utils";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState } from "react";
import { Doughnut } from "react-chartjs-2";

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

  return (
    <>
      {/* Add Income Modal */}
      <Modal show={showAddIncomeModal} onClose={setshowAddIncomeModal}>
        <form className="grp-style">
          <div className="grp-style">
          <label htmlFor="amount">Income Amount</label>
          <input
            type="number"
            min={0.01}
            step={0.01}
            name="amount"
            placeholder="Enter income amount"
            required
          />

          </div>
          <div className="grp-style">
          <label htmlFor="description">Income Description</label>
          <input
            type="text"
            name="description"
            placeholder="Enter income description"
            required
          />
          </div>

          <button className="btn btn-primary font-semibold">Add income</button>
        </form>
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
