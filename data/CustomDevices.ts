export const CustomDeviceName = Object.freeze({
  CustomIphone: 'iPhone 16',
  Pixel10: 'Pixel 10'
});
export const CustomDevice = Object.freeze({
  [CustomDeviceName.CustomIphone]: {
    viewport: { width: 390, height: 844 },
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0)",
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    locale: "es-ES",
    geolocation: { latitude: -12.04, longitude: -77.03 },
    permissions: ["geolocation"],
  },

});
