import React, { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";
import AIAssistant from "@/components/AIAssistant";

import HomePage from "@/pages/HomePage";
import SuccessPage from "@/pages/SuccessPage";
import ActivityPage from "@/pages/ActivityPage";
import DevicesPage from "@/pages/DevicesPage";
import AlertsPage from "@/pages/AlertsPage";
import MorePage from "@/pages/MorePage";
import CustomersPage from "@/pages/CustomersPage";
import InventoryPage from "@/pages/InventoryPage";
import ReportsPage from "@/pages/ReportsPage";
import PayoutsPage from "@/pages/PayoutsPage";

function StageBg() {
  useEffect(() => {
    document.body.classList.add("jh-stage");
    return () => document.body.classList.remove("jh-stage");
  }, []);
  return null;
}

function Shell() {
  const location = useLocation();
  const hideChromeOn = ["/success"];
  const hideChrome = hideChromeOn.includes(location.pathname);

  return (
    <PhoneFrame>
      <div className="relative min-h-[100dvh] pb-[120px]" data-testid="app-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/devices" element={<DevicesPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/more" element={<MorePage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/payouts" element={<PayoutsPage />} />
        </Routes>
        {!hideChrome && <AIAssistant />}
        {!hideChrome && <BottomNav />}
      </div>
    </PhoneFrame>
  );
}

function App() {
  return (
    <div className="App">
      <StageBg />
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
      <Toaster
        position="top-center"
        theme="dark"
        toastOptions={{
          style: {
            borderRadius: "18px",
            background: "rgba(22,22,26,0.92)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#FAFAFA",
            fontFamily: "inherit",
          },
        }}
      />
    </div>
  );
}

export default App;
