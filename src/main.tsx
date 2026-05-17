import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ResumeProvider } from './hooks/useResumeUrl';
import { ThemeProvider } from './hooks/useTheme';
import './style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ResumeProvider>
        <App />
      </ResumeProvider>
    </ThemeProvider>
  </StrictMode>,
);
