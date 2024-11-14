import React from "react";
import clsx from "clsx";

type ContainerProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ as: Comp = "section", className, children, ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        className={clsx("px-4 py-10 md:px-6 md:py-14 lg:py-16", className)}
        {...props}
      >
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </Comp>
    );
  }
);

Container.displayName = "Container";
