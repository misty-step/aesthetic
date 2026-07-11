import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// The shipped artifact, straight from the repo root — the product IS the
// styling layer in this lane. glue.css pulls the self-hosted fonts.
import '../../../../../aesthetic.css';
import './glue.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
