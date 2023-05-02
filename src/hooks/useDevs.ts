import { useTranslation } from 'react-i18next';

export const useDevs = () => {
  const { t } = useTranslation();
  const devs = ['ilya', 'artyom', 'alena'];

  return devs.map((dev, index) => ({
    id: index + 1,
    name: `${t(`developers.${dev}.firstName`)} ${t(`developers.${dev}.secondName`)}`,
    text: `${t(`developers.${dev}.info`)}`,
    image: `${index + 1}.jpg`,
  }));
};
