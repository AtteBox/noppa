import { t } from "../i18n/index.svelte";

export type IPrefilledOptionLists = { [listName: string]: string[] };

const USER_PREFILLED_OPTIONS_KEY = "userPrefilledOptions";

export class UserPrefilledOptionPersistence {
  static load(): IPrefilledOptionLists {
    const saved = localStorage.getItem(USER_PREFILLED_OPTIONS_KEY);
    return saved ? JSON.parse(saved) : {};
  }

  static save(userPrefilledOptions: IPrefilledOptionLists) {
    localStorage.setItem(
      USER_PREFILLED_OPTIONS_KEY,
      JSON.stringify(userPrefilledOptions),
    );
  }
}

export function getPrefilledOptions(): IPrefilledOptionLists {
  return {
    [t("diceNumbers")]: ["1", "2", "3", "4", "5", "6"],
    [t("coinFlip")]: [t("heads"), t("tails")],
    [t("direction")]: [t("left"), t("straight"), t("right")],
  };
}
