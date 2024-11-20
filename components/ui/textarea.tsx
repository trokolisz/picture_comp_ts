import * as React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={`block w-full rounded-md border border-gray-300 p-2 text-sm bg-white  ${className}`}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";
