import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Order is the experiment: Tailwind theme layer first (for the stock
// floats), then the shipped kit (for the pages), then the coexistence
// glue. Lane C's page classes are reused from its glue.css.
import '@/index.css';
import '../../../../../aesthetic.css';
import '../c/glue.css';
import './glue.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
