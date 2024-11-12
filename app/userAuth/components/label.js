import { forwardRef } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

const Label = forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={
      "text-sm font-medium text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    }
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
