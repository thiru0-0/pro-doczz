import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Create from '@/pages/Create';
import Index from '@/pages/Index';
import TemplatePage from '@/pages/TemplatePage';
import NotFound from '@/pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/create/*" element={<Create/>} />
        <Route path="/template/:id" element={<TemplatePage/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Library from "./pages/Library";
import ResumeBuilder from "./pages/create/ResumeBuilder";
import CreateRouter from "./pages/create/CreateRouter";
import TemplatePage from "./pages/TemplatePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/create" element={<Layout><Create /></Layout>} />
          <Route path="/create/:id" element={<Layout><CreateRouter /></Layout>} />
          <Route path="/create/resume" element={<Layout><ResumeBuilder /></Layout>} />
          <Route path="/template/:id" element={<Layout><TemplatePage /></Layout>} />
          <Route path="/library" element={<Layout><Library /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
