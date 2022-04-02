import { createContext, useState } from "react";
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [language, setLanguage] = useState("");
  const [languageOption, setLanguageOption] = useState([]);
  const languageList = {
    Afrikaans: "af",
    Albanian: "sq",
    Amharic: "am",
    Arabic: "ar",
    Armenian: "hy",
    Azerbaijani: "az",
    Basque: "eu",
    Belarusian: "be",
    Bengali: "bn",
    Bosnian: "bs",
    Bulgarian: "bg",
    Catalan: "ca",
    Cebuano: "ceb",
    Chinese_Simplified: "zh-CN",
    Chinese_Traditional: "zh-TW",
    Corsican: "co",
    Croatian: "hr",
    Czech: "cs",
    Danish: "da",
    Dutch: "nl",
    English: "en",
    Esperanto: "eo",
    Estonian: "et",
    Finnish: "fi",
    French: "fr",
    Frisian: "fy",
    Galician: "gl",
    Georgian: "ka",
    German: "de",
    Greek: "el",
    Gujarati: "gu",
    Haitian_Creole: "ht",
    Hausa: "ha",
    Hawaiian: "haw",
    Hebrew: "he",
    Hindi: "hi",
    Hmong: "hmn",
    Hungarian: "hu",
    Icelandic: "is",
    Igbo: "ig",
    Indonesian: "id",
    Irish: "ga",
    Italian: "it",
    Japanese: "ja",
    Javanese: "jv",
    Kannada: "kn",
    Kazakh: "kk",
    Khmer: "km",
    Kinyarwanda: "rw",
    Korean: "ko",
    Kurdish: "ku",
    Kyrgyz: "ky",
    Lao: "lo",
    Latvian: "lv",
    Lithuanian: "lt",
    Luxembourgish: "lb",
    Macedonian: "mk",
    Malagasy: "mg",
    Malay: "ms",
    Malayalam: "ml",
    Maltese: "mt",
    Maori: "mi",
    Marathi: "mr",
    Mongolian: "mn",
    Myanmar: "my",
    Nepali: "ne",
    Norwegian: "no",
    Nyanja: "ny",
    Odia: "or",
    Pashto: "ps",
    Persian: "fa",
    Polish: "pl",
    Portuguese: "pt",
    Punjabi: "pa",
    Romanian: "ro",
    Russian: "ru",
    Samoan: "sm",
    Scots_Gaelic: "gd",
    Serbian: "sr",
    Sesotho: "st",
    Shona: "sn",
    Sindhi: "sd",
    Sinhala: "si",
    Slovak: "sk",
    Slovenian: "sl",
    Somali: "so",
    Spanish: "es",
    Sundanese: "su",
    Swahili: "sw",
    Swedish: "sv",
    Tagalog: "tl",
    Tajik: "tg",
    Tamil: "ta",
    Tatar: "tt",
    Telugu: "te",
    Thai: "th",
    Turkish: "tr",
    Turkmen: "tk",
    Ukrainian: "uk",
    Urdu: "ur",
    Uyghur: "ug",
    Uzbek: "uz",
    Vietnamese: "vi",
    Welsh: "cy",
    Xhosa: "xh",
    Yiddish: "yi",
    Yoruba: "yo",
    Zulu: "zu",
  };
  const deviceLanguageValue = window.navigator.language.split("-")[0];
  const deviceLanguage = Object.keys(languageList).find(
    (l) => languageList[l] === window.navigator.language.split("-")[0]
  );

  const hostSocket = (username, language, capacity, role) => {
    setLanguage(language);
    const host = io(undefined, {
      query: { username, language, capacity, role },
    });
    setSocket(host);
  };

  const guestSocket = (username, language, roomID, role) => {
    setLanguage(language);

    const guest = io(undefined, {
      query: { username, language, roomID, role },
    });
    setSocket(guest);
  };

  return (
    <SocketContext.Provider
      value={{
        deviceLanguage,
        deviceLanguageValue,
        languageList,
        language,
        socket,
        hostSocket,
        guestSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
