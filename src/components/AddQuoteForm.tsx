import { useState } from 'react';
import { Person } from '../types';

interface AddQuoteFormProps {
  onAdd: (text: string, speaker: string, addedBy: string) => void;
  currentUser: string;
  existingPeople: Person[];
}

export function AddQuoteForm({ onAdd, currentUser, existingPeople }: AddQuoteFormProps) {
  const [text, setText] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredPeople = existingPeople.filter(p =>
    p.name.toLowerCase().includes(speaker.toLowerCase()) && speaker.length > 0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && speaker.trim()) {
      onAdd(text.trim(), speaker.trim(), currentUser);
      setText('');
      setSpeaker('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
          ✍️
        </span>
        Add New Quote
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quote
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter the memorable quote..."
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
        
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Who said it?
          </label>
          <input
            type="text"
            value={speaker}
            onChange={(e) => setSpeaker(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Person's name"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          
          {showSuggestions && filteredPeople.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-auto">
              {filteredPeople.map(person => (
                <button
                  key={person.name}
                  type="button"
                  onClick={() => {
                    setSpeaker(person.name);
                    setShowSuggestions(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-indigo-50 flex items-center justify-between"
                >
                  <span>{person.name}</span>
                  <span className="text-xs text-gray-400">{person.quoteCount} quotes</span>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={!text.trim() || !speaker.trim()}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Quote
        </button>
      </div>
    </form>
  );
}
