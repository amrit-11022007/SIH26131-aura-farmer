import type { NavigationItem } from "@/app/types/dashboard";

interface SidebarNavProps {
  items: NavigationItem[];
  activeTab: string;
  onSelect: (name: string) => void;
  mobile?: boolean;
  onClose?: () => void;
}

export function SidebarNav({
  items,
  activeTab,
  onSelect,
  mobile = false,
  onClose,
}: SidebarNavProps) {
  const baseClass = mobile
    ? "text-[#A3A3A3] hover:text-white"
    : "text-[#A3A3A3] hover:text-white hover:bg-white/5";

  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.name;

        return (
          <button
            key={item.name}
            onClick={() => {
              onSelect(item.name);
              onClose?.();
            }}
            className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-[#2D6A4F] text-white shadow-sm font-semibold"
                : baseClass
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon
                className={`w-4 h-4 ${isActive ? "text-white" : "text-[#8A8A8A]"}`}
              />
              <span>{item.name}</span>
            </div>
            {item.badge && (
              <span className="rounded-full bg-[#D97706] px-1.5 py-0.5 text-[10px] font-bold text-white">
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
