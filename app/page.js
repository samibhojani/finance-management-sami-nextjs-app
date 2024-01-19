import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";
import { currencyFormatter } from "@/libs/utils";

const DUMMY_DATA = [
  {
    id: 1,
    title: "Entertainment",
    color: "#fff",
    amount: 5000
  },
  {
    id: 2,
    title: "Misc",
    color: "#000",
    amount: 10000
  },
  {
    id: 3,
    title: "Entertainment",
    color: "#fff",
    amount: 3000
  },
  {
    id: 4,
    title: "Misc",
    color: "#000",
    amount: 7000
  },
  {
    id: 5,
    title: "Entertainment",
    color: "#fff",
    amount: 2000
  },
];

export default function Home() {
  return (
    <main className="container max-w-2xl px-6 mx-auto">
      <section className="py-3">
        <small className="">Balance:</small>
        <h2 className="text-4xl font-bold">{currencyFormatter(400000)}</h2>
      </section>

      <section className="flex items-center py-3 gap-2">
        <button className="btn btn-primary ">+ Expenses</button>
        <button className="btn btn-primary-outline">+ Income</button>
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
              amount={expense.amount}
            />
            )
          })}

        </div>
      </section>
    </main>
  );
}
