import DatabaseConnectionTest from '../../components/DatabaseConnectionTest';

export default function Page() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Database Configuration</h1>
      <DatabaseConnectionTest />
    </main>
  );
}
