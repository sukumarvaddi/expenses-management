import { Outlet } from "@remix-run/react";
import expensesStyles from "~/styles/expenses.css";
import ExpensesNavigation from "~/components/navigation/ExpensesHeader";

export function links() {
  return [{ rel: "stylesheet", href: expensesStyles }];
}

export function meta() {
  return [{ name: "viewport", content: "width=device-width,initial-scale=2" }];
}

function ExpensesAppLayout() {
  return (
    <>
      <ExpensesNavigation />
      <Outlet />
    </>
  );
}
export default ExpensesAppLayout;
