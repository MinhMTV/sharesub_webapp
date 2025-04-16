import React from 'react';
import {Account} from "@/repository/accounts.ts";

interface Props {
  accounts: Account[];
  selected: Account | null;
  onSelect: (account: Account) => void;
}

export const AccountSelector: React.FC<Props> = ({ accounts, selected, onSelect }) => {
  const safeAccounts = Array.isArray(accounts) ? accounts : [];

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">Account wählen</label>
      <select
        value={selected?.email ?? ''}
        onChange={(e) => {
          const acc = safeAccounts.find(a => a.email === e.target.value);
          if (acc) onSelect(acc);
        }}
        className="w-full border border-gray-300 rounded-md p-2"
      >
        <option value="">-- auswählen --</option>
        {safeAccounts.map((acc) => (
          <option key={acc.email} value={acc.email}>
            {acc.email}
          </option>
        ))}
      </select>
    </div>
  );
};