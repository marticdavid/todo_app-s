import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { storeContext } from "../context/storeContext";



function WalletDashboard() {
  const [wallet, setWallet] = useState(null);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const { apiUrl } = useContext(storeContext);

  const token = localStorage.getItem("todoApp_token");

  async function fetchWallet() {
    try {
      const res = await fetch(`${apiUrl}/wallet`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setWallet(data);
      setTransactions(
        (data.transactions || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
    } catch (err) {
      toast.error("Failed to fetch wallet");
    }
  }

  useEffect(() => {
    fetchWallet();
  }, []);

  async function handleFund() {
    if (amount <= 0) return toast.error("Enter valid amount");
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/wallet/fund`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: Number(amount) }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Wallet funded successfully");
        setAmount(0);
        setWallet(data);
        setTransactions(
          data.transactions.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      } else {
        toast.error(data.error || "Error funding wallet");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleWithdraw() {
    if (amount <= 0) return toast.error("Enter valid amount");
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/wallet/withdraw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: Number(amount) }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Withdrawal successful");
        setAmount(0);
        setWallet(data);
        setTransactions(
          data.transactions.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      } else {
        toast.error(data.error || "Error withdrawing");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl bg-gray-500 text-black rounded-md mx-auto mt-10 p-4 space-y-6">
      <div className="bg-white shadow rounded p-4 text-center">
        <h2 className="text-xl font-semibold mb-2">Wallet Balance</h2>
        <p className="text-3xl font-bold text-green-600">
          ₦{wallet?.balance?.toLocaleString() || 0}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="border px-3 py-2 rounded w-full"
        />
        <button
          disabled={loading}
          onClick={handleFund}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Fund
        </button>
        <button
          disabled={loading}
          onClick={handleWithdraw}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Withdraw
        </button>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-semibold mb-3">Transaction History</h3>
        {transactions.length === 0 ? (
          <table className="w-full text-sm text-left border border-gray-200 rounded-md overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2">Type</th>
                <th className="p-2">Amount (₦)</th>
                <th className="p-2">Reference</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, i) => (
                <tr
                  key={i}
                  className={`border-b hover:bg-gray-50 ${
                    transaction.type === "FUND" ? "bg-green-50" : "bg-red-50"
                  }`}
                >
                  <td className="p-2 font-medium text-gray-800">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs font-semibold ${
                        transaction.type === "FUND"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td className="p-2 text-gray-700">
                    {transaction.amount.toLocaleString()}
                  </td>
                  <td className="p-2 text-xs text-gray-500">
                    {transaction.reference}
                  </td>
                  <td className="p-2 text-xs text-gray-500">
                    {new Date(transaction.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-sm text-left border border-gray-200 rounded-md overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2">Type</th>
                <th className="p-2">Amount (₦)</th>
                <th className="p-2">Reference</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, i) => (
                <tr
                  key={i}
                  className={`border-b hover:bg-gray-50 ${
                    transaction.type === "FUND" ? "bg-green-50" : "bg-red-50"
                  }`}
                >
                  <td className="p-2 font-medium text-gray-800">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs font-semibold ${
                        transaction.type === "FUND"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td className="p-2 text-gray-700">
                    {transaction.amount.toLocaleString()}
                  </td>
                  <td className="p-2 text-xs text-gray-500">
                    {transaction.reference}
                  </td>
                  <td className="p-2 text-xs text-gray-500">
                    {new Date(transaction.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}


export default WalletDashboard;