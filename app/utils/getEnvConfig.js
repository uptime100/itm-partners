import Config from 'config';
function getEnvConfig() {
  if (window.location.hostname === 'partners.intimate.io') {
    return Config.PRODUCTION;
  } else if (
    window.location.hostname === 'dev.intimate.partners' ||
    window.location.hostname ===
      'dev-partners.intimate.online.s3-website-ap-southeast-2.amazonaws.com'
  ) {
    return Config.STAGING;
  }
  return Config.DEV;
}

export default getEnvConfig();
