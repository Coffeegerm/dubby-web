import { type PropsWithChildren } from "react";

export const Card = ({
  children,
  title,
  containerClassName = "",
}: PropsWithChildren<{ title: string; containerClassName?: string }>) => {
  return (
    <div
      className={`surface-0 shadow-2 border-round p-4 ${containerClassName}`}
    >
      <div className="text-900 mb-3 text-3xl font-medium">{title}</div>
      <div className="text-500 mb-3 font-medium">
        Vivamus id nisl interdum, blandit augue sit amet, eleifend mi.
      </div>
      <div
        style={{ height: "150px" }}
        className="border-300 border-2 border-dashed"
      >
        {children}
      </div>
    </div>
  );
};
