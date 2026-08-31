import CropGuard from "./components/homepage/CropGuard";
import CaseManagement from "./dashboard/Case";
import ReportsAndHistory from "./dashboard/Report";
import SettingsPage from "./dashboard/Setting";
export default function Home() {
  return (
    <main>
      {/* <CropGuard /> */}
      <ReportsAndHistory />
      <CaseManagement />
      <SettingsPage />
    </main>
  );
}
