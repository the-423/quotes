import { useState } from 'react';
import { useQuotes } from './hooks/useQuotes';
import { useGame } from './hooks/useGame';
import { useUser } from './hooks/useUser';
import { Header } from './components/Header';
import { QuotesTab } from './components/QuotesTab';
import { GameTab } from './components/GameTab';
import { SettingsTab } from './components/SettingsTab';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SetupGuide } from './components/SetupGuide';
import { isFirebaseConfigured } from './firebase';

type Tab = 'quotes' | 'game' | 'settings';

export function App() {
  const [activeTab, setActiveTab] = useState<Tab>('quotes');
  const [showSetupGuide, setShowSetupGuide] = useState(!isFirebaseConfigured());
  const { user, setUsername, recordGameScore, logout } = useUser();
  const { 
    quotes, 
    loading,
    error,
    usingFirebase,
    addQuote, 
    deleteQuote, 
    getPeople, 
    exportData, 
    importData 
  } = useQuotes();
  const { 
    gameState, 
    startGame, 
    submitAnswer, 
    nextRound, 
    endGame, 
    canPlay 
  } = useGame(quotes);

  // Show welcome screen if no user
  if (!user) {
    return <WelcomeScreen onSetUsername={setUsername} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-50">
      <Header 
        user={user} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      {/* Connection Status Banner */}
      <div className={`text-center py-2 text-sm font-medium ${
        usingFirebase 
          ? 'bg-green-100 text-green-800' 
          : 'bg-amber-100 text-amber-800'
      }`}>
        {usingFirebase ? (
          <span>🌐 Connected to cloud — Changes sync in real-time!</span>
        ) : (
          <span>💾 Using local storage — Set up Firebase for real-time sync</span>
        )}
      </div>
      
      {/* Error Banner */}
      {error && (
        <div className="bg-red-100 text-red-800 text-center py-2 text-sm">
          ⚠️ {error}
        </div>
      )}
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Setup Guide - Show if Firebase is not configured */}
        {showSetupGuide && !isFirebaseConfigured() && activeTab === 'quotes' && (
          <SetupGuide onDismiss={() => setShowSetupGuide(false)} />
        )}
        
        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500">Loading quotes...</p>
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'quotes' && (
              <QuotesTab
                quotes={quotes}
                people={getPeople()}
                currentUser={user.name}
                onAddQuote={addQuote}
                onDeleteQuote={deleteQuote}
              />
            )}
            
            {activeTab === 'game' && (
              <GameTab
                gameState={gameState}
                canPlay={canPlay}
                user={user}
                onStartGame={startGame}
                onSubmitAnswer={submitAnswer}
                onNextRound={nextRound}
                onEndGame={endGame}
                onRecordScore={recordGameScore}
              />
            )}
            
            {activeTab === 'settings' && (
              <SettingsTab
                user={user}
                quotes={quotes}
                usingFirebase={usingFirebase}
                onSetUsername={setUsername}
                onLogout={logout}
                onExport={exportData}
                onImport={importData}
              />
            )}
          </>
        )}
      </main>
      
      {/* Footer */}
      <footer className="text-center py-6 text-gray-400 text-sm">
        <p>Quote Book — Collect & Play with Friends</p>
        <p className="text-xs mt-1">
          {usingFirebase ? '🔄 Real-time sync enabled' : '📱 Local mode'}
        </p>
      </footer>
    </div>
  );
}
