import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, Users, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const Workspace = () => {
  const { workspaceId } = useParams();

  const pages = [
    { id: "1", title: "Getting Started", icon: "file" },
    { id: "2", title: "API Documentation", icon: "file" },
    { id: "3", title: "User Guide", icon: "file" },
  ];

  const members = [
    { name: "John Doe", role: "Owner" },
    { name: "Jane Smith", role: "Editor" },
    { name: "Bob Johnson", role: "Viewer" },
  ];

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar workspaceId={workspaceId} pages={pages} />
      <div className="flex-1 flex flex-col">
        <TopNav />
        <main className="flex-1 p-8 bg-background">
          <div className="max-w-5xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Product Documentation</h1>
              <p className="text-muted-foreground mt-2">
                Comprehensive documentation for our product suite
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Recent Pages
                  </h2>
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Page
                  </Button>
                </div>
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border">
                      {pages.map((page) => (
                        <Link
                          key={page.id}
                          to={`/workspace/${workspaceId}/document/${page.id}`}
                          className="flex items-center gap-3 p-4 hover:bg-secondary transition-colors"
                        >
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{page.title}</span>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Members
                </h2>
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border">
                      {members.map((member, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4">
                          <span className="font-medium">{member.name}</span>
                          <span className="text-sm text-muted-foreground">{member.role}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Workspace;
