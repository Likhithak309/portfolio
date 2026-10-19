import React from 'react';
import { Printer, ShieldCheck } from 'lucide-react';

interface HeaderNavProps {
  currentView: 'preview' | 'editor' | 'ats' | 'export';
  onViewChange: (view: 'preview' | 'editor' | 'ats' | 'export') => void;
  onPrint: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentView,
  onViewChange,
  onPrint,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single text element, no badges) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onViewChange('preview');
          }}
          className="text-base sm:text-lg font-bold tracking-tight text-[#0A2540] whitespace-nowrap shrink-0 hover:opacity-90"
        >
          Kosuru Likhitha
        </a>

        {/* Zone 2: 4 clean single-line navigation tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium">
          <button
            onClick={() => onViewChange('preview')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              currentView === 'preview'
                ? 'bg-[#0A2540] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Resume
          </button>

          <button
            onClick={() => onViewChange('editor')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              currentView === 'editor'
                ? 'bg-[#0A2540] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Live Editor
          </button>

          <button
            onClick={() => onViewChange('ats')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              currentView === 'ats'
                ? 'bg-[#0A2540] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>ATS Audit</span>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
              84/100
            </span>
          </button>

          <button
            onClick={() => onViewChange('export')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              currentView === 'export'
                ? 'bg-[#0A2540] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Export & Plain Text
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            onClick={onPrint}
            className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-[#0A2540] rounded-lg hover:bg-[#13385e] transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print / PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};
