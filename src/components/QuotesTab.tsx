import { useState } from 'react';
import { Quote, Person } from '../types';
import { AddQuoteForm } from './AddQuoteForm';
import { QuoteCard } from './QuoteCard';

interface QuotesTabProps {
  quotes: Quote[];
  people: Person[];
  currentUser: string;
  onAddQuote: (text: string, speaker: string, addedBy: string) => void;
  onDeleteQuote: (id: string) => void;
}

export function QuotesTab({ quotes, people, currentUser, onAddQuote, onDeleteQuote }: QuotesTabProps) {
  const [filterSpeaker, setFilterSpeaker] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredQuotes = quotes.filter(q => {
    const matchesSpeaker = !filterSpeaker || q.speaker === filterSpeaker;
    const matchesSearch = !searchQuery || 
      q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpeaker && matchesSearch;
  }).sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <AddQuoteForm 
          onAdd={onAddQuote} 
          currentUser={currentUser} 
          existingPeople={people}
        />
        
        {/* People sidebar */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
              👥
            </span>
            People
          </h3>
          
          <button
            onClick={() => setFilterSpeaker('')}
            className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition ${
              !filterSpeaker 
                ? 'bg-indigo-100 text-indigo-700 font-medium' 
                : 'hover:bg-gray-50 text-gray-600'
            }`}
          >
            All People ({quotes.length} quotes)
          </button>
          
          <div className="space-y-1 max-h-64 overflow-auto">
            {people.map(person => (
              <button
                key={person.name}
                onClick={() => setFilterSpeaker(person.name)}
                className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center justify-between ${
                  filterSpeaker === person.name 
                    ? 'bg-indigo-100 text-indigo-700 font-medium' 
                    : 'hover:bg-gray-50 text-gray-600'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {person.name.charAt(0).toUpperCase()}
                  </span>
                  {person.name}
                </span>
                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                  {person.quoteCount}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="lg:col-span-2">
        {/* Search bar */}
        <div className="mb-4">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search quotes..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
        
        {/* Quotes list */}
        {filteredQuotes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💬</span>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No quotes yet</h3>
            <p className="text-gray-500">
              {quotes.length === 0 
                ? "Start adding memorable quotes from your friends!" 
                : "No quotes match your current filter."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Showing {filteredQuotes.length} quote{filteredQuotes.length !== 1 ? 's' : ''}
              {filterSpeaker && ` by ${filterSpeaker}`}
            </p>
            {filteredQuotes.map(quote => (
              <QuoteCard 
                key={quote.id} 
                quote={quote} 
                onDelete={onDeleteQuote}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
