import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { fetchExpenses } from "../api/expenses";
import { formatAmount, formatTimestamp } from "../common/utils";
import { Transaction } from "../models/transaction";

const ExpenseData = React.lazy(async () => {
  const transactions = await fetchExpenses();
  return {
    default: () => <ExpensesTable transactions={transactions} />,
  };
});

export const Expenses: React.FC = () => {
  return (
    <ErrorBoundary
      fallback={
        <p className="text-red-500 text-xl font-medium text-center">
          ⚠️ Something went wrong loading the expenses!
        </p>
      }
    >
      <Suspense fallback={<p>Loading...</p>}>
        <ExpenseData />
      </Suspense>
    </ErrorBoundary>
  );
};

const ExpensesTable: React.FC<{ transactions: Transaction[] }> = ({
  transactions,
}) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100 text-left">
          {["ID", "Date", "Amount", "Merchant", "Category"].map((header) => (
            <th key={header} className="p-2 border border-gray-300">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction: Transaction) => {
          return (
            <tr key={transaction.id} className="">
              <td className="p-2 border border-gray-300">{transaction.id}</td>
              <td className="p-2 border border-gray-300">
                {formatTimestamp(transaction.date)}
              </td>
              <td className="p-2 border border-gray-300">
                {formatAmount(transaction.amount)}
              </td>
              <td className="p-2 border border-gray-300">
                {transaction.merchant}
              </td>
              <td className="p-2 border border-gray-300">
                {transaction.category}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
