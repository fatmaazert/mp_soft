import React from "react";

function SelectInput({
  name,
  value = "",
  options,
  label,
  onChange,
  className,
  placeholder,
  required,
}) {
  return (
    <>
      <select
        name={name}
        onChange={onChange}
        className={`py-2 px-4 mb-4 bg-lightGrey rounded-lg focus:outline-none ${className}`}
        required={required}
      >
        {placeholder && (
          <option disabled hidden={!value} value="">
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option[value]} value={option[value]}>
            {option[label]}
          </option>
        ))}
      </select>
    </>
  );
}

export default SelectInput;
