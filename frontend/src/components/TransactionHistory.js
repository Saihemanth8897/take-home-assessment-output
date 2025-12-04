import React, { useState, useEffect } from 'react';
import './TransactionHistory.css';
import { apiService } from '../services/apiService';

const TransactionHistory = ({ account }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: Implement fetchTransactions function
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        // TODO: Call apiService.getTransactions with account address if available
        // TODO: Update transactions state
        const data = await apiService.getTransactions(account);
        setTransactions(data?.transactions || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [account]);

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 12)}...${address.slice(-6)}`;
  };

  const formatDate = (timestamp) => {
    // TODO: Format the timestamp to a readable date
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <div className="transaction-history-container">
        <div className="loading">Loading transactions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="transaction-history-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="transaction-history-container">
      <div className="transaction-header">
        <h2>Transaction History</h2>
        {account && (
          <div className="wallet-filter">
            Filtering for: {formatAddress(account)}
          </div>
        )}
      </div>

      {/* TODO: Display transactions list */}
      {/* Show: type, from, to, amount, currency, status, timestamp, blockchainTxHash */}
      <div className="transactions-list">
        {transactions.length === 0 ? (
          <div className="placeholder">
            <p>No transactions found.</p>
          </div>
        ) : (
          transactions.map((tx, idx) => (
            <div className="transaction-card" key={idx}>
              <div className="transaction-header-info">
                <span className="transaction-type">{tx.type || "N/A"}</span>
                <span
                  className={`transaction-status ${
                    tx.status ? tx.status.toLowerCase() : ""
                  }`}
                >
                  {tx.status || "N/A"}
                </span>
              </div>
              <div className="transaction-details">
                <div className="transaction-detail-item">
                  <strong>From:</strong> {formatAddress(tx.from)}
                </div>
                <div className="transaction-detail-item">
                  <strong>To:</strong> {formatAddress(tx.to)}{" "}
                </div>
                <div className="transaction-detail-item">
                  <strong>Amount:</strong> {tx.amount} {tx.currency}
                </div>
                <div className="transaction-detail-item">
                  <strong>Date:</strong> {formatDate(tx.timestamp)}
                </div>
                <div className="transaction-detail-item">
                  <strong>Blockchain Tx Hash:</strong>{" "}
                  <span
                    className="transaction-tx-hash"
                    style={{ wordBreak: "break-all", whiteSpace: "pre-line" }}
                  >
                    {tx.blockchainTxHash || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;


