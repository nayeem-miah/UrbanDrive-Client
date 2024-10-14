import { useTranslation } from "react-i18next";

const TestTranslate = () => {
    const {t} = useTranslation();
    return (
        <div>
            {t('welcomeMessage')}
        </div>
    );
};

export default TestTranslate;