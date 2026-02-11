export const msalConfig = {
  auth: {
    clientId: "8f3ff581-7d83-4030-bb36-80dfe9ff3bb4",
    authority:
      "https://login.microsoftonline.com/2ced8eca-fb8b-4dd6-a8af-ee0467e04fbc",
    redirectUri: "https://testing.d35rxtlumzro3.amplifyapp.com/",
  },
  cache: {
    cacheLocation: "sessionStorage", // safer
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["openid", "profile", "email", "User.Read"],
};
