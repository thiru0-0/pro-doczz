import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Plus, FolderOpen, FileText, Clock, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const [showMoreTemplates, setShowMoreTemplates] = useState(false);

  const workspaces = [
    { id: "1", name: "Resume", pages: 5, updated: "Just now" },
    { id: "2", name: "Business Proposal", pages: 8, updated: "1 hour ago" },
    { id: "3", name: "Sales Pitch", pages: 12, updated: "2 hours ago" },
  ];

  const recentDocs = [
    { id: "1", title: "Resume", subtitle: "Document Type: Resume", updated: "Just now" },
    { id: "2", title: "Business Proposal (One-page)", subtitle: "Document Type: Business Proposal", updated: "1 hour ago" },
    { id: "3", title: "Sales Pitch", subtitle: "Document Type: Sales Pitch", updated: "2 hours ago" },
  ];

  const moreTemplates = [
    { id: "4", title: "Research Paper", subtitle: "Document Type: Research Paper", updated: "3 hours ago" },
    { id: "5", title: "Technical Specification", subtitle: "Document Type: Technical Specification", updated: "4 hours ago" },
    { id: "6", title: "Meeting Notes", subtitle: "Document Type: Meeting Notes", updated: "5 hours ago" },
    { id: "7", title: "Project Proposal", subtitle: "Document Type: Project Proposal", updated: "6 hours ago" },
    { id: "8", title: "Case Study", subtitle: "Document Type: Case Study", updated: "7 hours ago" },
  ];

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopNav />
        <main className="flex-1 p-8 bg-background">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground mt-1">Manage your workspaces and documents</p>
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Workspace
              </Button>
            </div>

            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FolderOpen className="h-5 w-5" />
                Your Workspaces
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {workspaces.map((workspace) => (
                  <Link key={workspace.id} to={`/workspace/${workspace.id}`}>
                    <Card className="hover:shadow-elevated transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FolderOpen className="h-5 w-5 text-primary" />
                          {workspace.name}
                        </CardTitle>
                        <CardDescription>
                          {workspace.pages} pages • Updated {workspace.updated}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Documents
              </h2>
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {recentDocs.map((doc) => (
                      <Link
                        key={doc.id}
                        to={`/workspace/1/document/${doc.id}`}
                        className="flex items-center gap-4 p-4 hover:bg-secondary transition-colors"
                      >
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{doc.title}</p>
                          <p className="text-sm text-muted-foreground">{doc.subtitle}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{doc.updated}</span>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="p-4">
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() => setShowMoreTemplates(!showMoreTemplates)}
                    >
                      <Search className="h-4 w-4" />
                      Discover More Documents
                    </Button>
                  </div>

                  <Collapsible open={showMoreTemplates}>
                    <CollapsibleContent>
                      <div className="border-t divide-y divide-border">
                        {moreTemplates.map((doc) => (
                          <Link
                            key={doc.id}
                            to={`/workspace/1/document/${doc.id}`}
                            className="flex items-center gap-4 p-4 hover:bg-secondary transition-colors"
                          >
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div className="flex-1">
                              <p className="font-medium text-foreground">{doc.title}</p>
                              <p className="text-sm text-muted-foreground">{doc.subtitle}</p>
                            </div>
                            <span className="text-sm text-muted-foreground">{doc.updated}</span>
                          </Link>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
