import React from 'react';
import {Subscription} from "@/repository/subscriptions.ts";

interface SubscriptionInfoProps {
    subscription: Subscription | null;
}

export const SubscriptionInfo: React.FC<SubscriptionInfoProps> = ({ subscription }) => {
    if (!subscription) return null;

    return (

        <div className="bg-white rounded-xl shadow-md p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">📄 Subscription Info</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                {/* Erste Reihe */}
                <div>
                    <p><span className="font-medium">Name:</span> {subscription.name}</p>
                </div>
                <div>
                    <p><span className="font-medium">ID:</span> {subscription.unique_id}</p>
                </div>
                <div>
                    <p><span className="font-medium">Account E-Mail:</span> {subscription.account_email}</p>
                </div>
                <div>
                    <p><span className="font-medium">Benutzer:</span> {subscription.num_users}</p>
                </div>

                {/* Zweite Reihe */}
                {subscription.link && (
                    <div>
                        <p><span className="font-medium">Link:</span> {subscription.link}</p>
                    </div>
                )}
                {subscription.address && (
                    <div>
                        <p><span className="font-medium">Adresse:</span> {subscription.address}</p>
                    </div>
                )}
                <div>
                    <p><span className="font-medium">Freie Plätze:</span> {subscription.free_spots}</p>
                </div>
                <div>
                    <p><span className="font-medium">Erstellt am:</span> {subscription.created_date}</p>
                </div>
                <div>
                    <p><span className="font-medium">Login E-Mail:</span> {subscription.email}</p>
                </div>
                <div>
                    <p><span className="font-medium">Passwort:</span> {subscription.password}</p>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionInfo;