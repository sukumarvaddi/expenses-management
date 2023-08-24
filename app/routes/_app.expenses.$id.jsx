import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import {
  deleteExpense,
  getExpensesById,
  updateExpense,
} from "../data/expenses.server";
import { redirect } from "@remix-run/node";
import { validateExpenseInput } from "../data/validation.server";

export const meta = () => {
  return [{ title: "Expense Details" }, { description: "Details of Expense" }];
};

// export async function loader({ request, params }) {
//   const { id } = params;
//   return getExpensesById(id);
// }

export async function action({ request, params }) {
  const expenseId = params.id;
  const formData = await request.formData();
  const expense = Object.fromEntries(formData);
  if (request.method.toLowerCase() === "delete") {
    const deleteId = await deleteExpense(expenseId);
    return deleteId;
  } else {
    try {
      validateExpenseInput(expense);
    } catch (error) {
      return error;
    }

    await updateExpense(expenseId, expense);
    return redirect("/expenses");
  }
}

const ExpenseDetails = () => {
  const navigate = useNavigate();
  function closeHandler() {
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
};

export default ExpenseDetails;
