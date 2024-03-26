import "./Legal.css";
import Markdown from "react-markdown";

interface LegalProps {
  title: string;
  content: string;
}

const LegalTemplate: React.FC<LegalProps> = ({ title, content }) => {
  return (
    <div className="legal">
      <div className="legal__header">
        <h2 className="legal__title">{title}</h2>
      </div>
      <div className="legal__content">
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
};

export default LegalTemplate;
