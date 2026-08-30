import Link from "next/link";
import { Button } from "@/components/ui/button";
import CropGuard from "./components/homepage/CropGuard";
import ReportsAndHistory from "./components/report";
import CaseManagement from "./components/case";
import SettingsPage from "./components/setting";
export default function Home() {
  return (
    <main>
      <CropGuard />

      {/* <Link href="/alerts">
        <Button
          type="button"
          className="bg-emerald-600 text-white hover:bg-emerald-700"
        >
          Go to Alerts
        </Button>
      </Link>  */}
      {/* <ReportsAndHistory />
      <CaseManagement />
      <SettingsPage /> */}
    </main>
  );
}