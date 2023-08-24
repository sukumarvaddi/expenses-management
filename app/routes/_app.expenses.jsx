import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";

import ExpensesList from "~/components/expenses/ExpensesList";
import { getExpenses } from "../data/expenses.server";
import { requireUserSession } from "../data/auth.server";

export async function loader({ request, params }) {
  const userId = await requireUserSession(request);
  const expenses = await getExpenses(userId);

  return expenses;
}

export default function Expenses() {
  const expenses = useLoaderData();
  const hasExpenses = expenses?.length > 0;
  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        {hasExpenses && <ExpensesList expenses={expenses} />}
        {!hasExpenses && (
          <section id="no-expenses">
            <h1>No expenses found</h1>
            <p>
              Start <Link to="add">Add some</Link> today
            </p>
          </section>
        )}
      </main>
    </>
  );
}
