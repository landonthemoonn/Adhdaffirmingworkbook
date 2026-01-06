import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, PenLine } from 'lucide-react';
import { clsx } from 'clsx';
import { toast } from 'sonner';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark?: boolean;
}

export const QuickAddModal: React.FC<QuickAddModalProps> = ({ isOpen, onClose, isDark = false }) => {
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!content.trim()) return;
    
    setIsSaving(true);
    try {
      // Save to localStorage for now (no backend required)
      const inboxItems = JSON.parse(localStorage.getItem('adhdkit_inbox') || '[]');
      const newItem = {
        id: crypto.randomUUID(),
        content,
        createdAt: new Date().toISOString(),
        status: 'new'
      };
      inboxItems.unshift(newItem);
      localStorage.setItem('adhdkit_inbox', JSON.stringify(inboxItems));
      
      toast.success("Saved to Inbox");
      setContent('');
      onClose();
    } catch (err) {
      console.error('Error saving note:', err);
      toast.error("Failed to save note");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={clsx(
              "absolute inset-0 backdrop-blur-sm transition-colors duration-500",
              isDark ? "bg-black/40" : "bg-[#5C3A3A]/10"
            )}
          />

          {/* Modal Container - Clay Style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className={clsx(
              "relative w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl transition-all duration-500 overflow-hidden",
              isDark 
                ? "bg-[#292524] border border-[#44403C] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)]" 
                : "bg-[#F8F2EE] border border-white/60 shadow-[0_20px_60px_-10px_rgba(100,70,60,0.3)]"
            )}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <div className={clsx(
                  "p-3 rounded-full shadow-inner",
                  isDark ? "bg-[#1C1917] text-[#E7E5E4]" : "bg-[#EEE6E1] text-[#EFA896]"
                )}>
                  <PenLine size={24} />
                </div>
                <h2 className={clsx(
                  "text-2xl font-bold tracking-tight",
                  isDark ? "text-[#E7E5E4]" : "text-[#5C3A3A]"
                )}>
                  Quick Capture
                </h2>
              </div>
              <button 
                onClick={onClose}
                className={clsx(
                  "p-2 rounded-full transition-colors",
                  isDark ? "hover:bg-[#44403C] text-[#78716C]" : "hover:bg-[#EEE6E1] text-[#9C7A70]"
                )}
              >
                <X size={24} />
              </button>
            </div>

            {/* Input Area */}
            <div className={clsx(
              "rounded-[1.5rem] p-4 mb-6 shadow-inner transition-colors",
              isDark ? "bg-[#1C1917]" : "bg-[#F3EBE6]"
            )}>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind? Capture it now, process it later."
                className={clsx(
                  "w-full h-40 bg-transparent border-none resize-none focus:outline-none focus:ring-0 text-lg leading-relaxed placeholder:opacity-50",
                  isDark 
                    ? "text-[#E7E5E4] placeholder:text-[#78716C]" 
                    : "text-[#5C3A3A] placeholder:text-[#9C7A70]"
                )}
                autoFocus
              />
            </div>

            {/* Footer */}
            <div className="flex justify-end items-center gap-4">
               <span className={clsx(
                 "text-xs font-medium uppercase tracking-widest",
                 isDark ? "text-[#57534E]" : "text-[#9C7A70]"
               )}>
                 Saves to Inbox
               </span>
               <button
                 onClick={handleSave}
                 disabled={!content.trim() || isSaving}
                 className={clsx(
                   "px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide flex items-center gap-2 transition-all duration-200",
                   !content.trim() || isSaving ? "opacity-50 cursor-not-allowed" : "hover:scale-105 active:scale-95",
                   isDark 
                     ? "bg-[#E7E5E4] text-[#1C1917] shadow-[0_4px_12px_rgba(0,0,0,0.5)]" 
                     : "bg-[#EFA896] text-white shadow-[4px_4px_10px_rgba(239,168,150,0.4)]"
                 )}
               >
                 {isSaving ? "Saving..." : (
                   <>
                     Save Note <Send size={16} />
                   </>
                 )}
               </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};