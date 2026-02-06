interface SetupGuideProps {
  onDismiss?: () => void;
}

export function SetupGuide({ onDismiss }: SetupGuideProps) {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 mb-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h3 className="font-bold text-amber-800 mb-2">Firebase Not Configured</h3>
            <p className="text-amber-700 text-sm mb-4">
              The app is currently using local storage. To enable real-time sync with friends, 
              you need to set up Firebase (free).
            </p>
            
            <details className="text-sm">
              <summary className="cursor-pointer font-medium text-amber-800 hover:text-amber-900">
                📖 Click here for setup instructions
              </summary>
              
              <div className="mt-4 bg-white rounded-lg p-4 text-gray-700 space-y-4">
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Step 1: Create a Firebase Project</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Go to <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">console.firebase.google.com</a></li>
                    <li>Click "Create a project" (or "Add project")</li>
                    <li>Enter a project name (e.g., "my-quote-book")</li>
                    <li>Disable Google Analytics (optional, not needed)</li>
                    <li>Click "Create project"</li>
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Step 2: Create a Web App</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>In your project, click the web icon {"</>"} to add a web app</li>
                    <li>Enter a nickname (e.g., "quote-book-web")</li>
                    <li>Click "Register app"</li>
                    <li>Copy the <code className="bg-gray-100 px-1 rounded">firebaseConfig</code> object shown</li>
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Step 3: Enable Firestore Database</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>In the left sidebar, click "Build" → "Firestore Database"</li>
                    <li>Click "Create database"</li>
                    <li>Select "Start in <strong>test mode</strong>" (allows read/write without auth)</li>
                    <li>Choose a location close to you</li>
                    <li>Click "Enable"</li>
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Step 4: Update the Code</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Open <code className="bg-gray-100 px-1 rounded">src/firebase.ts</code></li>
                    <li>Replace the placeholder values with your Firebase config:</li>
                  </ol>
                  <pre className="bg-gray-800 text-green-400 p-3 rounded-lg mt-2 text-xs overflow-x-auto">
{`const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};`}
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Step 5: Redeploy</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Run <code className="bg-gray-100 px-1 rounded">npm run build</code></li>
                    <li>Upload the new <code className="bg-gray-100 px-1 rounded">dist</code> folder to Netlify</li>
                    <li>Share the URL with your friends! 🎉</li>
                  </ol>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>💡 Tip:</strong> Everyone uses the same URL. Once Firebase is set up, 
                    any quotes added by anyone will instantly appear for everyone else!
                  </p>
                </div>
              </div>
            </details>
          </div>
        </div>
        
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-amber-600 hover:text-amber-800 p-1"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
