import "./SpecialInput.css";

const SpecialInput = ({
  value,
  onchange,
  title,
  type,
  checked = undefined,
  onCheck,
  hideCheckbox = false,
  inputProps,
  labelProps,
  onFocus,
}: {
  value: string | number | undefined;
  onchange: (e: any) => void;
  title: string;
  type: string;
  checked?: boolean | undefined;
  onCheck?: (e: any) => void;
  hideCheckbox?: boolean;
  inputProps?: {};
  labelProps?: {};
  onFocus?: (e: any) => void;
}) => {
  return (
    <label
      className="drawer__form__label drawer__special__input"
      {...labelProps}
    >
      {title}
      <div className="drawer__form__input__container">
        {checked !== undefined && !hideCheckbox && (
          <input
            type="checkbox"
            checked={checked}
            onChange={onCheck}
            className="drawer__form__checkbox"
          />
        )}
        <input
          value={value}
          type={type}
          onChange={onchange}
          disabled={checked !== undefined && !checked}
          onFocus={onFocus}
          {...inputProps}
        />
      </div>
    </label>
  );
};

export default SpecialInput;
