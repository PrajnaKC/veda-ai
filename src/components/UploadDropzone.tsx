import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, X } from 'lucide-react';
import { useAssignmentStore } from '../store/useAssignmentStore';
// `motion` removed - not used here

const ACCEPTED_FORMATS = {
  'image/jpeg': ['.jpeg', '.jpg'],
  'image/png': ['.png'],
  'application/pdf': ['.pdf'],
  'text/plain': ['.txt'],
};

export default function UploadDropzone() {
  const { uploadedFile, setFile } = useAssignmentStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, [setFile]);

  const removeFile = () => setFile(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FORMATS,
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  return (
    <div
      {...getRootProps()}
      className={
        'flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-8 w-full min-h-[180px] transition ' +
        (isDragActive ? 'border-orange-400 bg-orange-50' : 'border-neutral-200 bg-white/60')
      }
      tabIndex={0}
      aria-label="Upload assignment file"
    >
      <input {...getInputProps()} aria-label="File input" />
      {uploadedFile ? (
        <div className="flex items-center gap-3">
          <UploadCloud className="w-8 h-8 text-orange-500" />
          <span className="font-medium text-neutral-800">{uploadedFile.name}</span>
          <button
            onClick={removeFile}
            className="ml-2 p-1 rounded-full hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
            aria-label="Remove file"
          >
            <X className="w-4 h-4 text-neutral-500" />
          </button>
        </div>
      ) : (
        <>
          <UploadCloud className="w-12 h-12 text-orange-500 mb-2" />
          <div className="font-semibold text-neutral-800 text-lg mb-1">Choose a file or drag & drop it here</div>
          <div className="text-sm text-neutral-500 mb-3">JPEG, PNG, upto 10MB</div>
          <button
            type="button"
            className="px-5 py-2 rounded-full bg-neutral-900 text-white font-medium shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            tabIndex={0}
            aria-label="Browse files"
          >
            Browse Files
          </button>
        </>
      )}
    </div>
  );
}
