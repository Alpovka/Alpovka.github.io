const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  defaultConfig = {
    reactStrictMode: true,
    images: {
      domains: ["imgur.com", "i.imgur.com"],
      unoptimized: true
    }
  }
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
      ...defaultConfig,
      env: {
        API_URL: "http://localhost:8000"
      }
    }
  }
  return {
    /* config options for all phases except development here */
    ...defaultConfig,
    env: {
      API_URL: "https://impossible-elk-umbrella.cyclic.app"
    }
  }
}
