import React from 'react';
import { ArrowLeft, Printer as PrinterIcon } from 'lucide-react';
import { clsx } from 'clsx';
import AdhdAffirmingProductivityWorksheetCopy from '../../imports/AdhdAffirmingProductivityWorksheetCopy-98-1484';

interface PrintViewProps {
  onBack: () => void;
}

export const PrintView: React.FC<PrintViewProps> = ({ onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar - Hidden when printing */}
      <div className="hidden-print sticky top-0 z-50 bg-white border-b border-[#EEE6E1] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 text-[#5C3A3A] hover:text-[#EFA896] transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Dashboard</span>
            </button>
            
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-3 bg-[#EFA896] text-white rounded-full font-bold shadow-[4px_4px_10px_rgba(239,168,150,0.4)] hover:bg-[#EFA896]/90 transition-all hover:scale-105 active:scale-95"
            >
              <PrinterIcon size={18} />
              <span>Print PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Print Content */}
      <div className="max-w-[1432px] mx-auto">
        <AdhdAffirmingProductivityWorksheetCopy />
      </div>
    </div>
  );
};
