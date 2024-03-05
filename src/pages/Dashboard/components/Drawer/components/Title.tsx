import "./Title.css";

const Title = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="title">
      <div className="title__content">
        <small>{title}</small>
        {children}
      </div>
      <div className="line" />
    </div>
  );
};

export default Title;
