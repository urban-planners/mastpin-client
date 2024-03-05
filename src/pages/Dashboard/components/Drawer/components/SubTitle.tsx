import "./SubTitle.css";

const SubTitle = ({ text }: { text: string }) => {
  return (
    <small className="drawer__subtitle">
      <b>{text}</b>
      <span />
    </small>
  );
};

export default SubTitle;
