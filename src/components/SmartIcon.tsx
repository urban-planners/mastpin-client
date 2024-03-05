import "./SmartIcon.css";

const SmartIcon = ({
  description,
  children,
  onClick,
  ...props
}: {
  description: string;
  children: React.ReactNode;
  onClick?: () => void;
  props?: any;
}) => {
  return (
    <div className="smart__icon" onClick={onClick} {...props}>
      {children}
      <span>
        <p>{description}</p>
      </span>
    </div>
  );
};

export default SmartIcon;
