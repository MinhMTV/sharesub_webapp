import React from 'react';
import {Subscriber} from "@/repository/subscribers.ts";

export interface SubscriberListProps {
    subscribers: Subscriber[];
    selectedSubscriber: Subscriber | null;
    onSubscriberSelect: (subscriber: Subscriber) => void;
}

export const SubscriberList: React.FC<SubscriberListProps> = ({
    subscribers,
    selectedSubscriber,
    onSubscriberSelect,
}) => {
    return (
        <div className="w-fit bg-white rounded-xl shadow-md p-3 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-gray-800 mb-4">🧑‍🤝‍🧑 Subscribers</h2>
            <div className="space-y-2">
                {subscribers.map((sub) => {
                    const isActive = selectedSubscriber?.subscriber_id === sub.subscriber_id;
                    return (
                        <div
                            key={sub.subscriber_id}
                            onClick={() => onSubscriberSelect(sub)}
                            className={`p-3 rounded-lg cursor-pointer border transition 
                                ${isActive ? "bg-blue-100 border-blue-500" : "bg-gray-50 border-gray-200 hover:bg-gray-100"}`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-sm font-medium text-gray-900">{sub.name}</div>
                                    <div className="text-xs text-gray-500">{sub.subscriber_id}</div>
                                </div>
                                {/*{(sub.unreadMessages ?? 0) > 0 && (*/}
                                {/*    <span className="text-xs bg-blue-500 text-white rounded-full px-2">*/}
                                {/*        {sub.unreadMessages}*/}
                                {/*    </span>*/}
                                {/*)}*/}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SubscriberList;