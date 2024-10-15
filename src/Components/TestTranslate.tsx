import { useTranslation } from "react-i18next";

function TestTranslate() {
  const { t, i18n } = useTranslation();

  // Function to toggle between English and Bangla
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "bn" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="App">
      <header>
        <h1>{t("welcome")}</h1>{" "}
        {/* Display welcome message based on language */}
        <button onClick={toggleLanguage}>
          {t("toggleLanguage")} {/* Toggle Button */}
        </button>
      </header>
    </div>
  );
}

export default TestTranslate;
