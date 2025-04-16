import React from 'react';
import {Subscriber} from "@/repository/subscribers.ts";

interface Props {
  subscribers: Subscriber[];
  selected: Subscriber | null;
  onSelect: (subscriber: Subscriber) => void;
}

export const SubscriberSelector: React.FC<Props> = ({
  subscribers,
  selected,
  onSelect,
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">Subscriber wählen</label>
      <select
        value={selected?.subscriber_id || ''}
        onChange={(e) => {
          const sub = subscribers.find(s => s.subscriber_id === e.target.value);
          if (sub) onSelect(sub);
        }}
        className="w-full border border-gray-300 rounded-md p-2"
      >
        <option value="">-- auswählen --</option>
        {subscribers.map((sub) => {
         const label = `${sub.name} (${sub.subscriber_id})`
          return (
            <option key={sub.subscriber_id} value={sub.subscriber_id}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};