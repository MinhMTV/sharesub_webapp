import React from 'react';
import {Subscription} from "@/repository/subscriptions.ts";

interface Props {
  subscriptions: Subscription[];
  selected: Subscription | null;
  onSelect: (subscription: Subscription) => void;
}

export const SubscriptionSelector: React.FC<Props> = ({
  subscriptions,
  selected,
  onSelect,
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">Subscription wählen</label>
      <select
        value={selected?.unique_id || ''}
        onChange={(e) => {
          const sub = subscriptions.find(s => s.unique_id === e.target.value);
          if (sub) onSelect(sub);
        }}
        className="w-full border border-gray-300 rounded-md p-2"
      >
        <option value="">-- auswählen --</option>
        {subscriptions.map((sub) => {
          const label = `${sub.name} (${sub.unique_id})`
          return (
            <option key={sub.unique_id} value={sub.unique_id}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};