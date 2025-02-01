export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome to the Login App</h1>
      <p className="text-gray-600 mt-2">Click below to sign in.</p>
      <a
        href="/login"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Go to Login
      </a>
      <a
        href="/signup"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        signup here!
      </a>
    </main>
  );
}
