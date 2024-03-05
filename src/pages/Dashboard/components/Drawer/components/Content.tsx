import "./Content.css";

const Content = ({
  emptyText = "Nothing to show.",
  children,
}: {
  emptyText?: string;
  children?: React.ReactNode[];
}) => {
  return (
    <div className="content">
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
