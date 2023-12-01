import { AppDefaults } from 'config/global-enums';
import { Helmet } from 'react-helmet-async';

export default function HeaderHelmet({
  title = AppDefaults.APP_NAME,
  description = 'A better alternative for Netflix',
}) {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
}
