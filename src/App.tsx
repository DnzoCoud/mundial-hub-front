import { BrowserRouter } from 'react-router-dom';
import AppRouter from './app/router';
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      <Toaster richColors position="top-right" />
    </>
  );
}
export default App;