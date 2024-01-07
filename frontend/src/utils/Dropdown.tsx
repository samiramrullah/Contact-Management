import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export interface dropDownInterface {
  heading: String;
  dropDownList: Array<String>;
  svg: JSX.Element;
}
const DropDown = ({ heading, dropDownList, svg }: dropDownInterface) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="hs-accordion cursor-pointer ">
      <div
        className={`hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 ${isOpen ? 'hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent' : 'text-sm text-slate-700 rounded-md hover:bg-gray-100'
          }`}
        onClick={toggleAccordion}
      >
        {svg}
        <span className="text-current">{heading}</span>

        <svg
          className={`ml-auto ${isOpen ? 'block' : 'hidden'}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          ></path>
        </svg>

        <svg
          className={`ml-auto ${isOpen ? 'hidden' : 'block'}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          ></path>
        </svg>
      </div>

      <div
        id="account-accordion"
        className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${isOpen ? '' : 'hidden'
          }`}
      >
        <ul className="pt-2 pl-2">
          {dropDownList?.map((item, index) => (
            <li key={index}>
              <Link
                to={`${item.replace(/\s/g, '').toLowerCase()}`}
                className="block z-50 px-4 py-2 text-sm hover:bg-gray-300 bg-blue-100"
              >
                {item}
              </Link>
            </li>
          ))}

        </ul>
      </div>
    </li>
  );
};

export default DropDown;
