import React from 'react';
import { StyledEngineProvider } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Sprint } from './pages/Sprint';
import { GameIntro } from './pages/GameIntro';
import { Statistics } from './pages/Statistics';

export const App: React.FC = () => {
  return (
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<GameIntro />} />
              <Route path="/play" element={<Sprint />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="*" element={<Navigate to={'/'} replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StyledEngineProvider>
    </React.StrictMode>
  );
};
