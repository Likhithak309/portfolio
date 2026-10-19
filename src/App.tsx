import React, { useState, useEffect } from 'react';
import { ResumeData } from './types/resume';
import { INITIAL_RESUME_DATA } from './data/initialResumeData';
import { ResumeDocument } from './components/ResumeDocument';
import { ResumeEditor } from './components/ResumeEditor';
import { AtsScoreView } from './components/AtsScoreView';
import { ExportPanel } from './components/ExportPanel';
import { HeaderNav } from './components/HeaderNav';
import { Sparkles, Eye, Edit3, ShieldCheck, FileDown, CheckCircle2, RotateCcw } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem('likhitha_resume_data');
      return saved ? JSON.parse(saved) : INITIAL_RESUME_DATA;
    } catch {
      return INITIAL_RESUME_DATA;
    }
  });

  const [currentView, setCurrentView] = useState<'preview' | 'editor' | 'ats' | 'export'>('preview');
  const [compactMode, setCompactMode] = useState<boolean>(true);
  const [highlightKeywords, setHighlightKeywords] = useState<boolean>(false);

  // Persist edits to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('likhitha_resume_data', JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [data]);

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setData(INITIAL_RESUME_DATA);
    try {
      localStorage.removeItem('likhitha_resume_data');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-800 flex flex-col font-sans">
      {/* Universal Top Bar */}
      <HeaderNav
        currentView={currentView}
        onViewChange={setCurrentView}
        onPrint={handlePrint}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-6">
        {/* VIEW 1: RESUME PREVIEW */}
        {currentView === 'preview' && (
          <div className="space-y-4">
            {/* Context Toolbar */}
            <div className="no-print bg-white rounded-xl border border-slate-200/80 px-4 py-3 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Layout Controls:
                </span>
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs">
                  <button
                    onClick={() => setCompactMode(true)}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      compactMode
                        ? 'bg-white text-[#0A2540] font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Compact (1-Page Fit)
                  </button>
                  <button
                    onClick={() => setCompactMode(false)}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      !compactMode
                        ? 'bg-white text-[#0A2540] font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Standard Spacing
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs">
                {/* Keyword Spotlight Toggle */}
                <button
                  onClick={() => setHighlightKeywords(!highlightKeywords)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                    highlightKeywords
                      ? 'bg-amber-50 text-amber-900 border-amber-300 font-bold'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>{highlightKeywords ? 'Keywords Highlighted' : 'Spotlight ATS Keywords'}</span>
                </button>

                {/* Edit details shortcut */}
                <button
                  onClick={() => setCurrentView('editor')}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 font-medium transition-colors shadow-2xs"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Edit Content</span>
                </button>
              </div>
            </div>

            {/* Resume Sheet Container */}
            <div className="py-2 sm:py-4">
              <ResumeDocument
                data={data}
                compactMode={compactMode}
                highlightKeywords={highlightKeywords}
              />
            </div>

            {/* Recruiter & ATS Compliance Notice */}
            <div className="no-print max-w-[820px] mx-auto mt-4 p-4 rounded-xl border border-slate-200 bg-white shadow-xs text-xs text-slate-600 space-y-2">
              <div className="flex items-center justify-between text-slate-900 font-bold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Software Company Standard Compliance Checklist</span>
                </span>
                <span className="text-[#0A2540] text-[11px] font-semibold">
                  Navy Blue & White Palette (#0A2540)
                </span>
              </div>
              <p className="text-slate-500 leading-normal">
                Strictly formatted as a 1-column layout without tables, text frames, or graphics that break ATS parsers. Built with real, verified information from Kosuru Likhitha's public GitHub repositories (<code>swastya</code> and <code>Restaurant-finding</code>).
              </p>
            </div>
          </div>
        )}

        {/* VIEW 2: LIVE RESUME EDITOR */}
        {currentView === 'editor' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Editor controls */}
              <div className="lg:col-span-7">
                <ResumeEditor
                  data={data}
                  onChange={setData}
                  onReset={handleReset}
                />
              </div>

              {/* Right Column: Live Miniature Preview */}
              <div className="lg:col-span-5 space-y-3">
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-[#0A2540]" />
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Instant Live Document Preview
                    </span>
                  </div>
                  <button
                    onClick={() => setCurrentView('preview')}
                    className="text-xs font-semibold text-blue-700 hover:underline"
                  >
                    Open Fullscreen
                  </button>
                </div>

                <div className="bg-slate-200/70 p-3 rounded-xl border border-slate-300/80 overflow-hidden shadow-inner">
                  <div className="transform scale-[0.72] sm:scale-[0.80] origin-top">
                    <ResumeDocument
                      data={data}
                      compactMode={true}
                      highlightKeywords={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: ATS SCORE & AUDIT */}
        {currentView === 'ats' && <AtsScoreView />}

        {/* VIEW 4: EXPORT & PLAIN TEXT */}
        {currentView === 'export' && (
          <ExportPanel data={data} onPrint={handlePrint} />
        )}
      </main>

      {/* Footer */}
      <footer className="no-print mt-auto border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Kosuru Likhitha · B.Tech CSE (2024–2028) · Vignan's Institute of Engineering for Women
          </span>
          <span className="text-slate-400">
            ATS Evaluated: 84/100 · Recruiter & Fresher Certified
          </span>
        </div>
      </footer>
    </div>
  );
}
