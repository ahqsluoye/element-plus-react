import { useConfigProvider } from '@qsxy/element-plus-react/ConfigProvider/ConfigProviderContext';
import { useTranslation } from 'react-i18next';

export const useLocale = () => {
    const { t } = useTranslation();
    const { locale } = useConfigProvider();

    return { t: (key: string) => t(key, { lng: locale }) };
};
