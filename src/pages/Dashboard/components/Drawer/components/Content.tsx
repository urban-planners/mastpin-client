import "./Content.css";

const Content = ({
  emptyText = "Nothing to show.",
  children,
  className = "",
  ...props
}: {
  className?: string;
  emptyText?: string;
  children?: React.ReactNode[];
  [key: string]: any;
}) => {
  return (
    <div className={`content ${className}`} {...props}>
      <ul>
        {!children?.length ? (
          <small className="na">{emptyText}</small>
        ) : (
          <>{children}</>
        )}
      </ul>
    </div>
  );
};

export default Content;
