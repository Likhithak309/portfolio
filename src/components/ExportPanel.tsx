import React, { useState } from 'react';
import { ResumeData } from '../types/resume';
import { generateAtsPlainText, generateMarkdown } from '../utils/formatters';
import { Copy, Check, Printer, FileText, Download, Code, Info } from 'lucide-react';

interface ExportPanelProps {
  data: ResumeData;
  onPrint: () => void;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({ data, onPrint }) => {
  const [copiedType, setCopiedType] = useState<'text' | 'markdown' | 'json' | null>(null);

  const plainText = generateAtsPlainText(data);
  const markdownText = generateMarkdown(data);

  const copyToClipboard = (text: string, type: 'text' | 'markdown' | 'json') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Kosuru_Likhitha_Resume_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPlainTextFile = () => {
    const blob = new Blob([plainText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Kosuru_Likhitha_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Banner with Print PDF Callout */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Printer className="w-5 h-5 text-[#0A2540]" />
              <span>Export & Print Center</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Generate a pristine single-page PDF, copy ATS plain text for application portals, or download raw formats.
            </p>
          </div>

          <button
            onClick={onPrint}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#0A2540] rounded-lg hover:bg-[#13385e] transition-colors shadow-sm shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>

        {/* PDF Printing Tip */}
        <div className="mt-4 p-3.5 bg-blue-50/60 border border-blue-200/80 rounded-lg flex items-start gap-2.5 text-xs text-blue-950">
          <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold block">Pro-Tip for 100% Perfect 1-Page PDF:</span>
            <p className="text-blue-900 leading-normal">
              In your browser Print dialog, select <strong>Destination: Save as PDF</strong>, <strong>Paper size: A4 or Letter</strong>, <strong>Margins: Minimum / Custom</strong> (or uncheck Headers and footers). The styling is already engineered to fit onto a single page.
            </p>
          </div>
        </div>
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* 1. Copy Plain Text */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">ATS Plain Text</h3>
            <p className="text-xs text-slate-500 mt-1">
              Raw ASCII text formatted with clear headings for company portals (TCS, Infosys, Workday).
            </p>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => copyToClipboard(plainText, 'text')}
              className="flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors inline-flex items-center justify-center gap-1.5"
            >
              {copiedType === 'text' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
            <button
              onClick={downloadPlainTextFile}
              title="Download .txt file"
              className="p-1.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. Copy Markdown */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 mb-3">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Markdown Format</h3>
            <p className="text-xs text-slate-500 mt-1">
              Clean GitHub README markdown ready to paste into your GitHub profile or personal website.
            </p>
          </div>
          <div className="mt-4">
            <button
              onClick={() => copyToClipboard(markdownText, 'markdown')}
              className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 transition-colors inline-flex items-center justify-center gap-1.5 shadow-2xs"
            >
              {copiedType === 'markdown' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied Markdown!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 3. JSON Backup */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 mb-3">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">JSON Resume Data</h3>
            <p className="text-xs text-slate-500 mt-1">
              Structured raw JSON data schema allowing easy re-import and programmatic integration.
            </p>
          </div>
          <div className="mt-4">
            <button
              onClick={downloadJson}
              className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 transition-colors inline-flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Download JSON</span>
            </button>
          </div>
        </div>
      </div>

      {/* Raw ATS Plain Text Preview Box */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-xs text-slate-900 uppercase tracking-wide">
            Live ATS Plain Text Preview (Standard ASCII)
          </span>
          <button
            onClick={() => copyToClipboard(plainText, 'text')}
            className="text-xs font-semibold text-[#0A2540] hover:underline inline-flex items-center gap-1"
          >
            {copiedType === 'text' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedType === 'text' ? 'Copied to Clipboard' : 'Copy Full Text'}</span>
          </button>
        </div>
        <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto max-h-[380px] leading-relaxed whitespace-pre-wrap select-all selection:bg-blue-600">
          {plainText}
        </pre>
      </div>
    </div>
  );
};
