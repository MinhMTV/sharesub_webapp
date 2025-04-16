// src/components/account-list/AccountList.tsx

import React, { useState } from 'react';
import { Account } from '@/repository/accounts';
import { Plus, Minus } from 'lucide-react';
import {AddAccountDialog} from "@/components/ui/AddAccountDialog.tsx";
import { DeleteAccountsDialog } from "@/components/ui/DeleteAccountDialog.tsx";

export interface AccountListProps {
  accounts: Account[];
  selectedAccount: Account | null;
  onAccountSelect: (account: Account) => void;
}

export const AccountList: React.FC<AccountListProps> = ({
  accounts,
  selectedAccount,
  onAccountSelect
}) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <div className="w-72 bg-gray-50 rounded-xl shadow-md p-4 max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">👤 Accounts</h2>
        <div className="flex gap-2">
          {/* Add Button */}
            <button
              onClick={() => setShowAddDialog(true)}
              className="group p-2 rounded-full bg-green-300 hover:bg-green-400 transition"
              title="Account hinzufügen"
            >
              <Plus className="w-4 h-4 text-green-600 group-hover:text-green-900" strokeWidth={2.5} />
            </button>

            <button
              onClick={() => setShowDeleteDialog(true)}
              className="group p-2 rounded-full bg-red-300 hover:bg-red-400 transition"
              title="Accounts löschen"
            >
              <Minus className="w-4 h-4 text-red-700 group-hover:text-red-800" strokeWidth={2.5} />
            </button>
        </div>
      </div>

      <div className="space-y-3">
        {accounts.map((account) => {
          const isActive = selectedAccount?.email === account.email;
          return (
            <div
              key={account.email}
              onClick={() => onAccountSelect(account)}
              className={`cursor-pointer p-4 rounded-xl border transition 
                ${isActive
                  ? 'border-blue-600 bg-white shadow-md'
                  : 'border-gray-300 bg-white hover:shadow-sm hover:border-gray-400'}`}
            >
              <div className="text-sm font-medium text-gray-900">{account.email}</div>
            </div>
          );
        })}
      </div>

      {/* Add Dialog */}
      <AddAccountDialog open={showAddDialog} onClose={() => setShowAddDialog(false)} />

      {/* Delete Dialog */}
      <DeleteAccountsDialog
          open={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
        />
    </div>
  );
};