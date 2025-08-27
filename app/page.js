export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900 px-6">
      {/* Logo */}
      <div className="mb-8">
        <img
          src="/logo.png"
          alt="HelpHub247 Logo"
          className="w-32 h-32 object-contain"
        />
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold mb-4 text-center">
        Welcome to <span className="text-blue-600">HelpHub247</span>
      </h1>

      {/* Subheading */}
      <p className="text-lg text-gray-600 mb-10 text-center max-w-xl">
        Your 24/7 AI-powered assistant.  
        Chat with <strong>Carys</strong> and get instant help whenever you need it.
      </p>

      {/* Call to Action */}
      <a
        href="/chat"
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300"
      >
        🚀 Start Chatting
      </a>
    </main>
  );
}
