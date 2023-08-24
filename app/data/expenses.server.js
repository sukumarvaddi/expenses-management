import { prisma } from "./database.server";

export async function addExpense(expenseData, userId) {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
        User: { connect: { id: userId } },
      },
    });
  } catch (e) {
    console.log(e);
    throw new Error("Failed to create Expense");
  }
}

export async function getExpenses(userId) {
  if (!userId) {
    throw new Error("Failed to get expenses");
  }
  try {
    return await prisma.expense.findMany({
      orderBy: { date: "desc" },
      where: { userId: userId },
    });
  } catch (e) {
    throw new Error("Failed to get Expenses");
  }
}

export async function getExpensesById(id) {
  try {
    return await prisma.expense.findFirst({
      orderBy: { date: "desc" },
    });
  } catch (e) {
    throw new Error("Failed to get Expense");
  }
}

export async function updateExpense(id, expenseData) {
  try {
    return await prisma.expense.update({
      where: { id },
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (e) {
    throw new Error("Failed to update Expense");
  }
}

export async function deleteExpense(id) {
  try {
    return await prisma.expense.delete({
      where: { id },
    });
  } catch (e) {
    throw new Error("Failed to Delete Expense");
  }
}
