import { useState } from "react";
import { useTranslation } from "react-i18next";

import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState("home");
  const [toggle, setToggle] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <div className="flex justify-start items-center">
        <img src={logo} alt="hoobank" className="w-[160px] h-[145px]" />
      </div>

      <ul className="list-none sm:flex hidden justify-center items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >
            <a href={`#${nav.id}`}>{t(nav.title)}</a>
          </li>
        ))}
      </ul>

      <div className="sm:flex hidden justify-end items-center text-xl text-white">
        <button className="px-2" onClick={() => changeLanguage('en')}>EN</button>
        <span className="px-1">/</span>
        <button className="px-2" onClick={() => changeLanguage('pl')}>PL</button>
      </div>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 absolute top-28 right-0 mx-4 my-2 min-w-[140px] rounded-xl border-solid border-2 bg-[#eab308] border-[#eab308]`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => {
                  setActive(nav.title);
                  setToggle(false); 
                }}
              >
                <a href={`#${nav.id}`}>{t(nav.title)}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
