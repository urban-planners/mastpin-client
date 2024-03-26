import LegalTemplate from "./Template";
import { terms } from "./data";

const Terms = () => {
  return <LegalTemplate title="Terms of Service" content={terms} />;
};

export default Terms;
