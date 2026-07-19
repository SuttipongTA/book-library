import useAuth from './hooks/useAuth';
import AppRouter from './routes/AppRouter';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <p className="loading-text">กำลังโหลด...</p>;
  }

  return (
    <div className="app">
      <AppRouter />
    </div>
  );
}

export default App;