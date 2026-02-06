interface WelcomeScreenProps {
  onSetUsername: (name: string) => void;
}

export function WelcomeScreen({ onSetUsername }: WelcomeScreenProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('username') as HTMLInputElement;
    if (input.value.trim()) {
      onSetUsername(input.value.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform -rotate-6">
            <span className="text-4xl">📚</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quote Book</h1>
          <p className="text-gray-500">
            Collect memorable quotes from your friends and play the guessing game!
          </p>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl">
            <span className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-xl">✍️</span>
            <div>
              <p className="font-medium text-gray-800">Collect Quotes</p>
              <p className="text-sm text-gray-500">Save memorable things your friends say</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
            <span className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl">🎮</span>
            <div>
              <p className="font-medium text-gray-800">Play Games</p>
              <p className="text-sm text-gray-500">Guess who said what in fun rounds</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-xl">
            <span className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center text-xl">🤝</span>
            <div>
              <p className="font-medium text-gray-800">Share & Collaborate</p>
              <p className="text-sm text-gray-500">Export and import quotes with friends</p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What's your name?
          </label>
          <input
            name="username"
            type="text"
            placeholder="Enter your name to get started"
            autoFocus
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-4"
          />
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition shadow-lg"
          >
            Get Started 🚀
          </button>
        </form>
      </div>
    </div>
  );
}
