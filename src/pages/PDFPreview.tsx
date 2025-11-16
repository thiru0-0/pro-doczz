import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Sun, Moon } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const PDFPreview = () => {
  const { workspaceId, docId } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <Link
              to={`/workspace/${workspaceId}/document/${docId}`}
              className="text-sm text-primary hover:underline"
            >
              ← Back to Editor
            </Link>
            <h1 className="text-xl font-semibold mt-1">PDF Preview</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Regenerate
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Sun className="h-4 w-4" />
              Light Theme
            </Button>
            <Button size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="flex items-center justify-center p-8">
        <div className="w-full max-w-4xl bg-white shadow-elevated rounded-lg p-12 min-h-[800px]">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Getting Started Guide</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Welcome to DocuTex! This guide will help you get started with creating and managing your documentation.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Installation</h2>
            <p className="text-gray-700">To begin using DocuTex, follow these simple steps:</p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Create a new workspace</li>
              <li>Add your first page</li>
              <li>Start writing your documentation</li>
            </ol>

            <div className="bg-gray-100 p-4 rounded-lg mt-6 mb-6">
              <code className="text-sm text-gray-800">npm install docutex</code>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Features</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Rich text editing with markdown support</li>
              <li>LaTeX equation rendering</li>
              <li>Collaborative editing</li>
              <li>Version history</li>
              <li>Export to PDF</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">LaTeX Support</h2>
            <p className="text-gray-700">DocuTex supports LaTeX equations for mathematical content.</p>
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mt-4 text-center">
              <span className="text-sm text-gray-500">[LaTeX Equation Preview]</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PDFPreview;
