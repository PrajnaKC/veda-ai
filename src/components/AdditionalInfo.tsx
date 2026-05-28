import React from 'react';
import { Mic } from 'lucide-react';
import { useAssignmentStore } from '../store/useAssignmentStore';
import { motion } from 'framer-motion';

export default function AdditionalInfo() {
  const { additionalInfo, setAdditionalInfo } = useAssignmentStore();

  return (
    <div className="w-full mt-6">
      <label htmlFor="additional-info" className="block font-medium text-neutral-800 mb-2">
        Additional Information (For better output)
      </label>
      <div className="relative">
        <textarea
          id="additional-info"
          className="w-full min-h-[80px] rounded-2xl border-2 border-dashed border-neutral-200 bg-white/60 p-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none"
          placeholder="e.g Generate a question paper for 3 hour exam duration..."
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          aria-label="Additional information"
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-3 right-3 p-2 rounded-full bg-white shadow hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
          aria-label="Record with mic"
        >
          <Mic className="w-5 h-5 text-orange-500" />
        </motion.button>
      </div>
    </div>
  );
}
