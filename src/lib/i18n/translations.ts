export const locales = ["en", "fi", "sv"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  fi: "Suomi",
  sv: "Svenska",
};

export type TranslationKeys = {
  // App
  appTitle: string;
  appDescription: string;
  openCodeInGithub: string;

  // Breadcrumb
  stepDefineOptions: string;
  stepThrowingDice: string;
  stepResult: string;

  // DefineOptions
  newOptionPlaceholder: string;
  newOptionAriaLabel: string;
  addOption: string;
  throwDice: string;
  saveOptions: string;
  clearOptions: string;
  prefilledOptions: string;

  // Result
  modifyOptions: string;
  rethrowDice: string;
  startOver: string;

  // OptionList
  deleteButton: string;
  optionTextAriaLabel: string;

  // ConfirmDialog
  yes: string;
  no: string;

  // InputDialog
  ok: string;
  cancel: string;
  pleaseEnterName: string;

  // Dialog messages
  confirmDeleteCustomOption: string;
  enterNameForPrefilledOptions: string;

  // Prefilled option names
  diceNumbers: string;
  coinFlip: string;
  direction: string;

  // Prefilled option values
  heads: string;
  tails: string;
  left: string;
  straight: string;
  right: string;

  // PrefilledOptionList
  deletePrefilledOption: string;

  // LanguageSelector
  languageSelectorAriaLabel: string;
};

const en: TranslationKeys = {
  appTitle: "Noppa 🎲",
  appDescription:
    "A dice for any options: A PWA app for randomly picking an option from a list which the user can enter.",
  openCodeInGithub: "Open code in Github",

  stepDefineOptions: "1. Define Options",
  stepThrowingDice: "2. Throwing Dice",
  stepResult: "3. Result",

  newOptionPlaceholder: "New Option",
  newOptionAriaLabel: "New Option Text",
  addOption: "Add Option",
  throwDice: "Throw Dice!",
  saveOptions: "Save Options",
  clearOptions: "Clear Options",
  prefilledOptions: "Prefilled Options:",

  modifyOptions: "Modify Options",
  rethrowDice: "Rethrow Dice",
  startOver: "Start Over",

  deleteButton: "Delete",
  optionTextAriaLabel: "Option Text",

  yes: "Yes",
  no: "No",

  ok: "OK",
  cancel: "Cancel",
  pleaseEnterName: "Please enter a name.",

  confirmDeleteCustomOption:
    'Are you sure you want to delete the custom option: "{name}"?',
  enterNameForPrefilledOptions: "Enter a name for your prefilled options:",

  diceNumbers: "Dice Numbers",
  coinFlip: "Coin Flip",
  direction: "Direction",

  heads: "Heads",
  tails: "Tails",
  left: "Left",
  straight: "Straight",
  right: "Right",

  deletePrefilledOption: "Delete {name}",

  languageSelectorAriaLabel: "Language",
};

const fi: TranslationKeys = {
  appTitle: "Noppa 🎲",
  appDescription:
    "Noppa kaikille vaihtoehdoille: PWA-sovellus, jolla voit arpoa vaihtoehdon käyttäjän syöttämästä listasta.",
  openCodeInGithub: "Avaa koodi Githubissa",

  stepDefineOptions: "1. Määritä vaihtoehdot",
  stepThrowingDice: "2. Heitetään noppaa",
  stepResult: "3. Tulos",

  newOptionPlaceholder: "Uusi vaihtoehto",
  newOptionAriaLabel: "Uuden vaihtoehdon teksti",
  addOption: "Lisää vaihtoehto",
  throwDice: "Heitä noppaa!",
  saveOptions: "Tallenna vaihtoehdot",
  clearOptions: "Tyhjennä vaihtoehdot",
  prefilledOptions: "Valmiit vaihtoehdot:",

  modifyOptions: "Muokkaa vaihtoehtoja",
  rethrowDice: "Heitä uudelleen",
  startOver: "Aloita alusta",

  deleteButton: "Poista",
  optionTextAriaLabel: "Vaihtoehdon teksti",

  yes: "Kyllä",
  no: "Ei",

  ok: "OK",
  cancel: "Peruuta",
  pleaseEnterName: "Syötä nimi.",

  confirmDeleteCustomOption:
    'Haluatko varmasti poistaa mukautetun vaihtoehdon: "{name}"?',
  enterNameForPrefilledOptions: "Anna nimi valmiille vaihtoehdoille:",

  diceNumbers: "Nopan numerot",
  coinFlip: "Kolikonheitto",
  direction: "Suunta",

  heads: "Kruuna",
  tails: "Klaava",
  left: "Vasen",
  straight: "Suoraan",
  right: "Oikea",

  deletePrefilledOption: "Poista {name}",

  languageSelectorAriaLabel: "Kieli",
};

const sv: TranslationKeys = {
  appTitle: "Noppa 🎲",
  appDescription:
    "En tärning för alla alternativ: En PWA-app för att slumpmässigt välja ett alternativ från en lista som användaren kan ange.",
  openCodeInGithub: "Öppna kod på Github",

  stepDefineOptions: "1. Definiera alternativ",
  stepThrowingDice: "2. Kastar tärning",
  stepResult: "3. Resultat",

  newOptionPlaceholder: "Nytt alternativ",
  newOptionAriaLabel: "Nytt alternativtext",
  addOption: "Lägg till alternativ",
  throwDice: "Kasta tärning!",
  saveOptions: "Spara alternativ",
  clearOptions: "Rensa alternativ",
  prefilledOptions: "Förifyllda alternativ:",

  modifyOptions: "Ändra alternativ",
  rethrowDice: "Kasta om",
  startOver: "Börja om",

  deleteButton: "Ta bort",
  optionTextAriaLabel: "Alternativtext",

  yes: "Ja",
  no: "Nej",

  ok: "OK",
  cancel: "Avbryt",
  pleaseEnterName: "Ange ett namn.",

  confirmDeleteCustomOption:
    'Är du säker på att du vill ta bort det anpassade alternativet: "{name}"?',
  enterNameForPrefilledOptions: "Ange ett namn för dina förifyllda alternativ:",

  diceNumbers: "Tärningssiffror",
  coinFlip: "Slant",
  direction: "Riktning",

  heads: "Krona",
  tails: "Klave",
  left: "Vänster",
  straight: "Rakt fram",
  right: "Höger",

  deletePrefilledOption: "Ta bort {name}",

  languageSelectorAriaLabel: "Språk",
};

export type TranslationKey = keyof TranslationKeys;

export const translations: Record<Locale, TranslationKeys> = { en, fi, sv };
