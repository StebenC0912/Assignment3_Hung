import TransactionProvider from "./src/data/store/TransactionContext";
import AppNavigation from "./src/navigation/AppNavigation";
export default function App() {
  return (
    <TransactionProvider>
      <AppNavigation />
    </TransactionProvider>
  );
}
