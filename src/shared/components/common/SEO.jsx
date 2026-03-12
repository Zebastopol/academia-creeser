import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description = "Club Deportivo Creeser - Excelencia en Taekwondo. Clases para todas las edades, formación de campeones y valores.",
  keywords = "taekwondo, club deportivo, artes marciales, entrenamiento, santiago, chile",
  ogImage = "/og-image.jpg",
  ogType = "website"
}) => {
  const siteName = "Creeser Taekwondo";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical Link */}
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
};

export default SEO;
