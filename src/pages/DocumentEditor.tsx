import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Code,
  Link2,
  Image,
  Table,
  Heading1,
  Heading2,
  Save,
  Download,
  History,
  Sparkles,
  Info,
  Tag,
  MessageSquare,
} from "lucide-react";
import { useParams } from "react-router-dom";

const DocumentEditor = () => {
  const { workspaceId, docId } = useParams();

  const pages = [
    { id: "1", title: "Getting Started" },
    { id: "2", title: "API Documentation" },
    { id: "3", title: "User Guide" },
  ];

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar workspaceId={workspaceId} pages={pages} />
      <div className="flex-1 flex flex-col">
        <TopNav />
        
        {/* Document Header */}
        <div className="border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <Input
              defaultValue="Getting Started Guide"
              className="text-2xl font-bold border-none shadow-none focus-visible:ring-0 px-0 bg-transparent"
            />
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <History className="h-4 w-4" />
                Versions
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button size="sm" className="gap-2">
                <Save className="h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Sparkles className="h-4 w-4" />
                AI Assistant
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Editor */}
          <main className="flex-1 flex flex-col">
            {/* Toolbar */}
            <div className="border-b border-border bg-card p-2">
              <div className="flex items-center gap-1 flex-wrap">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Heading1 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Heading2 className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="mx-1 h-6" />
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Underline className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="mx-1 h-6" />
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ListOrdered className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="mx-1 h-6" />
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Link2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Image className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Code className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Table className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Editor Content */}
            <ScrollArea className="flex-1">
              <div className="max-w-4xl mx-auto p-8">
                <Tabs defaultValue="edit" className="w-full">
                  <TabsList>
                    <TabsTrigger value="edit">Edit</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="edit" className="mt-6 space-y-6">
                    <div className="prose prose-slate max-w-none">
                      <h1 className="text-3xl font-bold">Getting Started</h1>
                      <p className="text-muted-foreground">
                        Welcome to DocuTex! This guide will help you get started with creating and managing your documentation.
                      </p>

                      <h2 className="text-2xl font-semibold mt-8">Installation</h2>
                      <p>To begin using DocuTex, follow these simple steps:</p>
                      <ol className="list-decimal list-inside space-y-2">
                        <li>Create a new workspace</li>
                        <li>Add your first page</li>
                        <li>Start writing your documentation</li>
                      </ol>

                      <div className="bg-secondary p-4 rounded-lg mt-4">
                        <code className="text-sm">npm install docutex</code>
                      </div>

                      <h2 className="text-2xl font-semibold mt-8">LaTeX Support</h2>
                      <p>DocuTex supports LaTeX equations for mathematical content.</p>
                      <div className="bg-muted p-4 rounded-lg mt-4 text-center">
                        <span className="text-sm text-muted-foreground">[LaTeX Preview Panel]</span>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="preview" className="mt-6">
                    <div className="prose prose-slate max-w-none">
                      <h1 className="text-3xl font-bold">Getting Started</h1>
                      <p className="text-muted-foreground">
                        Welcome to DocuTex! This guide will help you get started with creating and managing your documentation.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollArea>
          </main>

          {/* Right Sidebar */}
          <aside className="w-80 border-l border-border bg-card">
            <ScrollArea className="h-full">
              <div className="p-6 space-y-6">
                <section>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Document Info
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created</span>
                      <span>Jan 15, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Modified</span>
                      <span>2 hours ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Author</span>
                      <span>John Doe</span>
                    </div>
                  </div>
                </section>

                <Separator />

                <section>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-secondary text-xs rounded-md">Getting Started</span>
                    <span className="px-2 py-1 bg-secondary text-xs rounded-md">Tutorial</span>
                  </div>
                </section>

                <Separator />

                <section>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Comments
                  </h3>
                  <p className="text-sm text-muted-foreground">No comments yet</p>
                </section>
              </div>
            </ScrollArea>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;
