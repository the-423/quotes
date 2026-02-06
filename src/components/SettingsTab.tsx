import { useRef } from 'react';
import { UserProfile, Quote } from '../types';
import { SetupGuide } from './SetupGuide';
import { isFirebaseConfigured } from '../firebase';

interface SettingsTabProps {
  user: UserProfile | null;
  quotes: Quote[];
  usingFirebase: boolean;
  onSetUsername: (name: string) => void;
  onLogout: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
}

export function SettingsTab({ 
  user, 
  quotes,
  usingFirebase,
  onSetUsername, 
  onLogout, 
  onExport, 
  onImport 
}: SettingsTabProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
      e.target.value = '';
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Connection Status */}
      <div className={`rounded-xl shadow-md p-6 ${
        usingFirebase 
          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
          : 'bg-white'
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            usingFirebase ? 'bg-white/20' : 'bg-amber-100'
          }`}>
            <span className="text-2xl">{usingFirebase ? '🌐' : '💾'}</span>
          </div>
          <div>
            <h2 className={`text-lg font-semibold ${usingFirebase ? 'text-white' : 'text-gray-800'}`}>
              {usingFirebase ? 'Real-Time Sync Enabled!' : 'Local Storage Mode'}
            </h2>
            <p className={usingFirebase ? 'text-green-100' : 'text-gray-500'}>
              {usingFirebase 
                ? 'All quotes sync automatically with your friends' 
                : 'Quotes are saved only on this device'}
            </p>
          </div>
        </div>
      </div>

      {/* Firebase Setup Guide */}
      {!isFirebaseConfigured() && <SetupGuide />}

      {/* User Profile */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
            👤
          </span>
          User Profile
        </h2>
        
        {user ? (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
                <p className="text-gray-500">Quote Collector</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-indigo-600">{user.gamesPlayed}</p>
                <p className="text-xs text-gray-500">Games Played</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-green-600">{user.bestScore}</p>
                <p className="text-xs text-gray-500">Best Score</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-purple-600">{user.totalScore}</p>
                <p className="text-xs text-gray-500">Total Points</p>
              </div>
            </div>
            
            <button
              onClick={onLogout}
              className="text-red-500 hover:text-red-600 text-sm font-medium"
            >
              Change Username
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const input = form.elements.namedItem('username') as HTMLInputElement;
              if (input.value.trim()) {
                onSetUsername(input.value.trim());
                input.value = '';
              }
            }}
          >
            <p className="text-gray-500 mb-4">Set your username to track your game scores and quotes you add.</p>
            <div className="flex gap-3">
              <input
                name="username"
                type="text"
                placeholder="Enter your name"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
      
      {/* Data Management */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
            💾
          </span>
          Data Management
        </h2>
        
        <p className="text-gray-500 mb-4">
          {usingFirebase 
            ? 'Export quotes for backup, or import quotes from a file.'
            : 'Export your quotes to share with friends or import quotes from others.'}
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={onExport}
            disabled={quotes.length === 0}
            className="flex-1 py-3 bg-green-100 text-green-700 font-medium rounded-lg hover:bg-green-200 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export ({quotes.length} quotes)
          </button>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 py-3 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Import
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>
      
      {/* Share with Friends */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
            🤝
          </span>
          Share with Friends
        </h2>
        
        {usingFirebase ? (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
            <h3 className="font-medium text-green-800 mb-2">✅ Easy Sharing!</h3>
            <p className="text-sm text-green-700 mb-3">
              Just share this website's URL with your friends. Everyone who visits 
              will see the same quotes and can add new ones!
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('URL copied to clipboard!');
              }}
              className="w-full py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
            >
              📋 Copy Link to Share
            </button>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4">
            <h3 className="font-medium text-amber-800 mb-2">📤 Manual Sharing</h3>
            <p className="text-sm text-amber-700">
              Without Firebase, you'll need to manually share quotes:
            </p>
            <ol className="text-sm text-amber-700 mt-2 space-y-1 list-decimal list-inside">
              <li>Export your quotes using the button above</li>
              <li>Send the JSON file to your friends</li>
              <li>Have them import the file</li>
            </ol>
          </div>
        )}
      </div>
      
      {/* Statistics */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
            📊
          </span>
          Statistics
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white">
            <p className="text-3xl font-bold">{quotes.length}</p>
            <p className="text-sm opacity-80">Total Quotes</p>
          </div>
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl p-4 text-white">
            <p className="text-3xl font-bold">{new Set(quotes.map(q => q.speaker)).size}</p>
            <p className="text-sm opacity-80">People</p>
          </div>
        </div>
      </div>
    </div>
  );
}
