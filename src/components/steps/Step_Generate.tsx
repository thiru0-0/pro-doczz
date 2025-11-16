import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Copy, Check, FileCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Step_GenerateProps {
  generatedCode: string;
  onGenerate: () => void;
  onCopy: () => void;
  loading?: boolean;
}

const Step_Generate: React.FC<Step_GenerateProps> = ({
  generatedCode,
  onGenerate,
  onCopy,
  loading = false,
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    toast({
      title: 'Copied!',
      description: 'LaTeX code copied to clipboard',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.tex';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: 'Downloaded!',
      description: 'Resume.tex file downloaded',
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Generate Your Resume</h2>
        <p className="text-muted-foreground">Review and download your LaTeX code</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>LaTeX Code</CardTitle>
          <CardDescription>Your resume in LaTeX format, ready to compile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={onGenerate} disabled={loading} className="flex-1">
              <FileCode className="mr-2 h-4 w-4" />
              {loading ? 'Generating...' : 'Generate LaTeX Code'}
            </Button>
          </div>

          {generatedCode && (
            <>
              <div className="space-y-2">
                <Label htmlFor="latex-code">Generated Code</Label>
                <Textarea
                  id="latex-code"
                  value={generatedCode}
                  readOnly
                  className="font-mono text-sm min-h-[400px]"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleCopy} variant="outline" className="flex-1">
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy to Clipboard
                    </>
                  )}
                </Button>
                <Button onClick={handleDownload} variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download .tex File
                </Button>
              </div>
            </>
          )}

          {!generatedCode && !loading && (
            <div className="text-center py-8 text-muted-foreground">
              <FileCode className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Click "Generate LaTeX Code" to create your resume</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Step_Generate;

