import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  value?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      value = [0, 100],
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [localValue, setLocalValue] = React.useState(value);

    React.useEffect(() => {
      setLocalValue(value);
    }, [value]);

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMin = parseFloat(e.target.value);
      const newMax = localValue[1];
      if (newMin <= newMax) {
        const newValue = [newMin, newMax];
        setLocalValue(newValue);
        onValueChange?.(newValue);
      }
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMax = parseFloat(e.target.value);
      const newMin = localValue[0];
      if (newMax >= newMin) {
        const newValue = [newMin, newMax];
        setLocalValue(newValue);
        onValueChange?.(newValue);
      }
    };

    return (
      <div
        ref={ref}
        className={cn("relative flex w-full items-center", className)}
        {...props}
      >
        <div className="pointer-events-none absolute h-2 w-full rounded-lg bg-slate-200 dark:bg-slate-800" />
        <div
          className="pointer-events-none absolute h-2 rounded-lg bg-slate-900 dark:bg-slate-50"
          style={{
            left: `${((localValue[0] - min) / (max - min)) * 100}%`,
            right: `${100 - ((localValue[1] - min) / (max - min)) * 100}%`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue[0]}
          onChange={handleMinChange}
          disabled={disabled}
          className="pointer-events-none absolute top-0 z-5 h-2 w-full cursor-pointer appearance-none rounded-lg bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-slate-900 [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:dark:bg-slate-50 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-slate-900 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:dark:bg-slate-50"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue[1]}
          onChange={handleMaxChange}
          disabled={disabled}
          className="pointer-events-none absolute top-0 z-4 h-2 w-full cursor-pointer appearance-none rounded-lg bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-slate-900 [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:dark:bg-slate-50 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-slate-900 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:dark:bg-slate-50"
        />
      </div>
    );
  }
);
Slider.displayName = "Slider";

export { Slider };
