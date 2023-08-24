import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { addExpense } from "../data/expenses.server";
import { redirect } from "@remix-run/node";
import { validateExpenseInput } from "../data/validation.server";
import { requireUserSession } from "../data/auth.server";
export const meta = () => {
  return [{ title: "Add" }, { description: "Add Expenses" }];
};

export async function action({ request, params }) {
  const userId = await requireUserSession(request);
  const formData = await request.formData();
  const expense = Object.fromEntries(formData);
  try {
    validateExpenseInput(expense);
  } catch (error) {
    return error;
  }
  try {
    const data = await addExpense(expense, userId);
    return redirect("/expenses");
  } catch (e) {
    throw e;
  }
}

const Add = () => {
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
export default Add;
