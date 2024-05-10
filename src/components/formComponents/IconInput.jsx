import React from "react";

function IconInput({
  id,
  name,
  type,
  placeholder,
  autoComplete,
  onChange,
  icon,
  value,
  required = false,
  validationError,
  className,
  disabled = false,
}) {
  const inputClassName = `py-2 px-4 mb-4 bg-lightGrey rounded-lg focus:outline-none pl-10 ${className}`;

  return (
    <>
      <div className="relative">
        <input
          id={id}
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={inputClassName}
          onChange={onChange}
          required={required}
          disabled={disabled}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none -mt-4">
          {icon}
        </div>
        {validationError && (
          <p className="text-red-500 mt-1 text-sm">{validationError}</p>
        )}
      </div>
    </>
  );
}

export default IconInput;
