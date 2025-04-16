import React from 'react';
import {Subscription} from "@/repository/subscriptions.ts";

export interface SubscriptionListProps {
    subscriptions: Subscription[];
    selectedSubscription: Subscription | null;
    onSubscriptionSelect: (subscription: Subscription) => void;
}

export const SubscriptionList: React.FC<SubscriptionListProps> = ({
    subscriptions,
    selectedSubscription,
    onSubscriptionSelect,
}) => {
    return (
        <div className="w-fit bg-white rounded-xl shadow-md p-3 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-gray-800 mb-4">📦 Subscriptions</h2>
            <div className="space-y-2">
                {subscriptions.map((sub) => {
                    const isActive = selectedSubscription?.unique_id === sub.unique_id;
                    return (
                        <div
                            key={sub.unique_id}
                            onClick={() => onSubscriptionSelect(sub)}
                            className={`p-3 rounded-lg cursor-pointer border transition 
                                ${isActive ? "bg-blue-100 border-blue-500" : "bg-gray-50 border-gray-200 hover:bg-gray-100"}`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-sm font-medium text-gray-900">{sub.name}</div>
                                    <div className="text-xs text-gray-500">{sub.unique_id}</div>
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

export default SubscriptionList;