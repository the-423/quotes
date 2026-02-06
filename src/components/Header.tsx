import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile | null;
  activeTab: 'quotes' | 'game' | 'settings';
  setActiveTab: (tab: 'quotes' | 'game' | 'settings') => void;
}

export function Header({ user, activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold">Quote Book</h1>
              {user && <p className="text-sm text-white/70">Welcome, {user.name}!</p>}
            </div>
          </div>
          
          <nav className="flex gap-1 bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('quotes')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                activeTab === 'quotes' 
                  ? 'bg-white text-indigo-600' 
                  : 'hover:bg-white/10'
              }`}
            >
              📚 Quotes
            </button>
            <button
              onClick={() => setActiveTab('game')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                activeTab === 'game' 
                  ? 'bg-white text-indigo-600' 
                  : 'hover:bg-white/10'
              }`}
            >
              🎮 Game
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                activeTab === 'settings' 
                  ? 'bg-white text-indigo-600' 
                  : 'hover:bg-white/10'
              }`}
            >
              ⚙️ Settings
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
