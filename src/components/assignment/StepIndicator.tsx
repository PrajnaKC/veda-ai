export function StepIndicator({ currentStep = 1, totalSteps = 2 }: { currentStep?: number; totalSteps?: number }) {
  return (
    <div className="flex gap-3 items-center w-full" aria-label={`Step ${currentStep} of ${totalSteps}`}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <span
          key={index}
          className={
            index + 1 <= currentStep
              ? "h-[5px] flex-1 rounded-full bg-[#5E5E5E] transition-all duration-300"
              : "h-[5px] flex-1 rounded-full bg-[#DADADA] transition-all duration-300"
          }
        />
      ))}
    </div>
  );
}
