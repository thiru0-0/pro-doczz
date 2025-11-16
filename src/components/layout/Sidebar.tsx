import { useState } from "react";
import { ChevronLeft, ChevronRight, Home, FileText, Settings, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavLink } from "@/components/NavLink";

interface SidebarProps {
  workspaceId?: string;
  pages?: Array<{ id: string; title: string; icon?: string }>;
}

export function Sidebar({ workspaceId, pages = [] }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`border-r border-border bg-card transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } flex flex-col`}
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!collapsed && (
          <h2 className="font-semibold text-lg text-foreground">DocuTex</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          <NavLink
            to="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            activeClassName="bg-secondary text-foreground font-medium"
          >
            <Home className="h-4 w-4" />
            {!collapsed && <span>Dashboard</span>}
          </NavLink>

          {workspaceId && (
            <>
              <div className="px-3 py-2 mt-4">
                {!collapsed && (
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Pages</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>

              {pages.map((page) => (
                <NavLink
                  key={page.id}
                  to={`/workspace/${workspaceId}/document/${page.id}`}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  activeClassName="bg-secondary text-foreground font-medium"
                >
                  <FileText className="h-4 w-4" />
                  {!collapsed && <span className="truncate">{page.title}</span>}
                </NavLink>
              ))}
            </>
          )}

          <div className="mt-auto pt-4 border-t border-border">
            <NavLink
              to="/settings"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              activeClassName="bg-secondary text-foreground font-medium"
            >
              <Settings className="h-4 w-4" />
              {!collapsed && <span>Settings</span>}
            </NavLink>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}
