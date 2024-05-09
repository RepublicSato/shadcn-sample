import ThemeApp from './app/ThemeApp'
import { ThemeProvider } from './contexts/themeContext';
import { Toaster } from "./components/ui/toaster"


function App() {
  return (
    <ThemeProvider>
      <Toaster/>
      <ThemeApp/>
    </ThemeProvider>
    
  );
}

export default App;
