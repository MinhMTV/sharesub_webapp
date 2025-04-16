// App.tsx (angepasst für Mobile-App-Style mit Modalen für Add/Delete)

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useMediaQuery } from 'react-responsive';
import { Toaster } from 'sonner';

import { Input } from '@/components/ui/input';
import { AccountList } from './components/AccountList';
import { SubscriptionList } from './components/SubscriptionList';
import { SubscriberList } from './components/SubscriberList';
import { ChatWindow } from './components/ChatWindow';
import { SubscriptionInfo } from './components/SubscriptionInfo';
import { AccountSelector } from './components/selectors/AccountSelector';
import { SubscriptionSelector } from './components/selectors/SubscriptionSelector';
import { SubscriberSelector } from './components/selectors/SubscriberSelector';
import { AddAccountDialog } from '@/components/ui/AddAccountDialog';
import { DeleteAccountsDialog } from '@/components/ui/DeleteAccountDialog';

import { Account, fetchAccounts } from '@/repository/accounts';
import { fetchAllSubscriptions, Subscription } from '@/repository/subscriptions';
import { fetchAllSubscribers, Subscriber } from '@/repository/subscribers';
import { useMessages } from '@/hooks/useMessages';
import { useSendMessage } from '@/hooks/useSendMessage';
import {Minus, Plus} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Settings } from 'lucide-react';

export default function App() {
  const isMobile = useMediaQuery({maxWidth: 1023});
  const navigate = useNavigate();

  const [activeAccount, setActiveAccount] = useState<Account | null>(null);
  const [activeSubscription, setActiveSubscription] = useState<Subscription | null>(null);
  const [activeSubscriber, setActiveSubscriber] = useState<Subscriber | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const {data: accountsData} = useQuery({queryKey: ['accounts'], queryFn: fetchAccounts});
  const accounts = Array.isArray(accountsData) ? accountsData : [];
  const {data: subscriptions = []} = useQuery({queryKey: ['subscriptions'], queryFn: fetchAllSubscriptions});
  const {data: subscribers = []} = useQuery({queryKey: ['subscribers'], queryFn: fetchAllSubscribers});

  const {data: messages = [], isLoading: messagesLoading} = useMessages(activeSubscriber?.subscriber_id);

  const {mutate: sendMessage} = useSendMessage();

  const filteredSubscriptions = activeAccount
      ? subscriptions.filter((s) => s.account_email === activeAccount.email)
      : [];

  const filteredSubscribers = activeSubscription
      ? subscribers.filter((s) => s.subscription_id === activeSubscription.unique_id && !s.is_old)
      : [];

  useEffect(() => {
    if (!searchTerm) return;
    const lowerSearch = searchTerm.toLowerCase();
    const matchedSub = subscriptions.find(s => s.unique_id === searchTerm || s.name.toLowerCase().includes(lowerSearch));
    if (matchedSub) {
      setActiveAccount(accounts.find(a => a.email === matchedSub.account_email) || null);
      setActiveSubscription(matchedSub);
      return;
    }
    const matchedSubr = subscribers.find(s => s.subscriber_id === searchTerm || s.name.toLowerCase().includes(lowerSearch));
    if (matchedSubr) {
      const parentSub = subscriptions.find(sub => sub.unique_id === matchedSubr.subscription_id);
      if (parentSub) {
        setActiveAccount(accounts.find(a => a.email === parentSub.account_email) || null);
        setActiveSubscription(parentSub);
        setActiveSubscriber(matchedSubr);
      }
    }
  }, [searchTerm, subscriptions, subscribers, accounts]);

  const handleSendMessage = (text: string) => {
    if (!activeAccount || !activeSubscription || !activeSubscriber) return;
    sendMessage({
      subscriber_id: activeSubscriber.subscriber_id,
      subscription_id: activeSubscription.unique_id,
      account_email: activeAccount.email,
      content: text,
      sender: 'me',
    });
  };


 return (
  <div className="min-h-screen w-screen bg-gray-100 p-4 overflow-hidden relative">
    <Toaster position="top-center" />

    {/* 💡 Settings-Button immer sichtbar */}
    <div className="absolute top-4 right-4 z-10">
      <button
        onClick={() => navigate('/settings')}
        className="h-[42px] aspect-square bg-gray-300 rounded-md flex items-center justify-center hover:bg-gray-400 transition"
        title="Einstellungen"
      >
        <Settings className="w-5 h-5" />
      </button>
    </div>

    {accounts.length === 0 ? (
      <div className="absolute inset-0 flex items-center justify-center text-gray-500">
        ⚠️ Noch keine Accounts geladen.
      </div>
    ) : (
      <>
        {/* vorherige UI bleibt gleich */}
        <div className="mb-4 flex items-center gap-2 mt-12">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔎 Suche nach Subscriber ID, Subscription ID oder Name"
            className="flex-grow"
          />
        </div>

              {isMobile ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center px-1">
                      <h2 className="text-lg font-bold">👤 Accounts</h2>
                      <div className="flex gap-2">
                        <button
                            onClick={() => setShowAddDialog(true)}
                            className="group p-2 rounded-full bg-green-300 hover:bg-green-400 transition"
                            title="Account hinzufügen"
                        >
                          <Plus className="w-4 h-4 text-green-600 group-hover:text-green-900" strokeWidth={2.5}/>
                        </button>

                        <button
                            onClick={() => setShowDeleteDialog(true)}
                            className="group p-2 rounded-full bg-red-300 hover:bg-red-400 transition"
                            title="Accounts löschen"
                        >
                          <Minus className="w-4 h-4 text-red-700 group-hover:text-red-800" strokeWidth={2.5}/>
                        </button>
                      </div>
                    </div>

                    <AccountSelector
                        accounts={accounts}
                        selected={activeAccount}
                        onSelect={(acc) => {
                          setActiveAccount(acc);
                          setActiveSubscription(null);
                          setActiveSubscriber(null);
                        }}
                    />

                    {activeAccount && (
                        <SubscriptionSelector
                            subscriptions={filteredSubscriptions}
                            selected={activeSubscription}
                            onSelect={(sub) => {
                              setActiveSubscription(sub);
                              setActiveSubscriber(null);
                            }}
                        />
                    )}

                    {activeSubscription && (
                        <SubscriberSelector
                            subscribers={filteredSubscribers}
                            selected={activeSubscriber}
                            onSelect={setActiveSubscriber}
                        />
                    )}

                    {activeSubscriber && (
                        <>
                          <SubscriptionInfo subscription={activeSubscription}/>
                          <ChatWindow
                              messages={messages}
                              loading={messagesLoading}
                              subscriberName={activeSubscriber.name}
                              onSendMessage={handleSendMessage}
                          />
                        </>
                    )}
                  </div>
              ) : (
                  <div className="flex flex-row h-[calc(100vh-2rem)] overflow-x-auto gap-4">
                    <div className="min-w-[12rem]">
                      <AccountList
                          accounts={accounts}
                          selectedAccount={activeAccount}
                          onAccountSelect={(acc) => {
                            setActiveAccount(acc);
                            setActiveSubscription(null);
                            setActiveSubscriber(null);
                          }}
                      />
                    </div>

                    {activeAccount && (
                        <div className="overflow-y-auto">
                          <SubscriptionList
                              subscriptions={filteredSubscriptions}
                              selectedSubscription={activeSubscription}
                              onSubscriptionSelect={(sub) => {
                                setActiveSubscription(sub);
                                setActiveSubscriber(null);
                              }}
                          />
                        </div>
                    )}

                    {activeSubscription && (
                        <div className="overflow-y-auto">
                          <SubscriberList
                              subscribers={filteredSubscribers}
                              selectedSubscriber={activeSubscriber}
                              onSubscriberSelect={setActiveSubscriber}
                          />
                        </div>
                    )}

                    {activeSubscriber && (
                        <div className="flex-grow flex flex-col gap-2 overflow-hidden">
                          <SubscriptionInfo subscription={activeSubscription}/>
                          <ChatWindow
                              messages={messages}
                              loading={messagesLoading}
                              subscriberName={activeSubscriber.name}
                              onSendMessage={handleSendMessage}
                          />
                        </div>
                    )}
                  </div>
              )}

              {/* Dialoge */}
              <AddAccountDialog open={showAddDialog} onClose={() => setShowAddDialog(false)}/>
              <DeleteAccountsDialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}/>
            </>
        )}
      </div>
  );
}
