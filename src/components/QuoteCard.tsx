import { Quote } from '../types';

interface QuoteCardProps {
  quote: Quote;
  onDelete: (id: string) => void;
}

export function QuoteCard({ quote, onDelete }: QuoteCardProps) {
  const date = new Date(quote.timestamp);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition group">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <blockquote className="text-gray-800 text-lg mb-3 italic">
            "{quote.text}"
          </blockquote>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {quote.speaker.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-900">— {quote.speaker}</p>
              <p className="text-xs text-gray-400">
                Added by {quote.addedBy} on {formattedDate}
              </p>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => onDelete(quote.id)}
          className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
          title="Delete quote"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
