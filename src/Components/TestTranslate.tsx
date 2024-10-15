import { useTranslation } from "react-i18next";
import "../Utils/i18n";
function TestTranslate() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("label")}</p>
      <button onClick={() => i18n.changeLanguage("es")}>
        {t("about")} (Change to Spanish)
      </button>
    </div>
  );
}

export default TestTranslate;
