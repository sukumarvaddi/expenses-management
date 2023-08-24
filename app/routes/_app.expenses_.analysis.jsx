import ExpenseStatistics from "~/components/expenses/ExpenseStatistics.jsx";
import Chart from "~/components/expenses/Chart";
import Error from "~/components/util/Error";
import {
  useRouteError,
  isRouteErrorResponse,
  useLoaderData,
} from "@remix-run/react";
import { getExpenses } from "../data/expenses.server";
import { json } from "@remix-run/node";
import { requireUserSession } from "../data/auth.server";

export async function loader({ request }) {
  const userId = await requireUserSession(request);
  const expenses = await getExpenses(userId);

  if (!expenses || expenses.length === 0) {
    throw json(
      { data: "No expense data" },
      { status: 404, statusText: "No Responses found" }
    );
  }

  return expenses;
}

export const meta = () => {
  return [{ title: "Analysis" }, { description: "Expenses Analysis" }];
};

const Analysis = () => {
  const expenses = useLoaderData();
  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
};

export default Analysis;

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return (
      <>
        <h1>Unknown Error</h1>
      </>
    );
  }
}
