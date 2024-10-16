import { useTranslation } from "react-i18next";

const FaqSection: React.FC = () => {
  const {t} = useTranslation();
  return (
    <div className="max-w-6xl mx-auto py-5 px-4">
      <div className="text-center">
        <h2 className="text-4xl font-bold relative inline-block mt-20 mb-10 font-Playfair">
          {t("faqTitle")}
          <span className="block w-full h-4 bg-purple-200 absolute bottom-0 left-0 z-[-1]" />
        </h2>
      </div>
      <div className="lg:flex w-full gap-4 mx-auto font-poppins">
        <div className="w-full">
          <div className="collapse collapse-arrow ">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">{t("q1")}</div>
            <div className="collapse-content">
              <p>{t("a1")}</p>
            </div>
          </div>
          <div className="collapse collapse-arrow ">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">{t("q2")}</div>
            <div className="collapse-content">
              <p>{t("a2")}.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow ">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">{t("q3")}</div>
            <div className="collapse-content">
              <p>{t("a3")}</p>
            </div>
          </div>
          <div className="collapse collapse-arrow ">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium"> {t("q4")}</div>
            <div className="collapse-content">
              <p>{t("a4")}</p>
            </div>
          </div>
          <div className="collapse collapse-arrow ">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">{t("q5")}</div>
            <div className="collapse-content">
              <p>{t("a5")}</p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="collapse collapse-arrow ">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">{t("q6")}</div>
            <div className="collapse-content">
              <p>{t("a6")}</p>
            </div>
          </div>
          <div className="collapse collapse-arrow ">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">{t("q7")}</div>
            <div className="collapse-content">
              <p>{t("a7")}</p>
            </div>
          </div>
          <div className="collapse collapse-arrow ">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">{t("q8")}</div>
            <div className="collapse-content">
              <p>{t("a8")}</p>
            </div>
          </div>
          <div className="collapse collapse-arrow ">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">{t("q9")}</div>
            <div className="collapse-content">
              <p>{t("a9")}</p>
            </div>
          </div>
          <div className="collapse collapse-arrow ">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">{t("q10")}</div>
            <div className="collapse-content">
              <p>{t("a10")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
