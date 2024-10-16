// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";

// const TestTranslate: React.FC = () => {
//   const { t, i18n } = useTranslation();
//   const [currentLanguage, setCurrentLanguage] = useState<string>(""); // Manage current language state

//   // Use useEffect to set the language on component mount
//   useEffect(() => {
//     const savedLanguage = localStorage.getItem("i18nextLng"); // Get the language from localStorage
//     if (savedLanguage) {
//       setCurrentLanguage(savedLanguage); // Set the language state to saved language
//       i18n.changeLanguage(savedLanguage); // Change language in i18next
//     } else {
//       setCurrentLanguage(i18n.language); // Default to the current i18next language
//     }
//   }, [i18n,currentLanguage]);

//   // Function to change language
//   const changeLanguage = (lng: string) => {
//     setCurrentLanguage(lng); // Set the selected language in state
//     i18n.changeLanguage(lng); // Change the language in i18next
//     localStorage.setItem("i18nextLng", lng); // Save the language in localStorage
//   };

//   return (
//     <div className="app">
//       <h1>{t("welcome")}</h1>
//       <button onClick={() => changeLanguage("en")}>English</button>
//       <button onClick={() => changeLanguage("bn")}>বাংলা</button>
//       <p>{t("changeLanguage")}</p>
//     </div>
//   );
// };

// export default TestTranslate;
