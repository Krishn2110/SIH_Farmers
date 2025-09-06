// // src/hooks/useTranslation.js
// import { useTranslation as useI18NextTranslation } from "react-i18next";

// /**
//  * Custom hook wrapper for react-i18next useTranslation
//  * Makes it easier to import across project
//  */
// export default function useTranslation() {
//   const { t, i18n } = useI18NextTranslation();

//   // Function to change language dynamically
//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//   };

//   return { t, i18n, changeLanguage };
// }
