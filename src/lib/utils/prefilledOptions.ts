import type { IPrefilledOptionLists } from "../domain";

const USER_PREFILLED_OPTIONS_KEY = "userPrefilledOptions";

export class UserPrefilledOptionPersistence {
  static load(): IPrefilledOptionLists {
    const saved = localStorage.getItem(USER_PREFILLED_OPTIONS_KEY);
    return saved ? JSON.parse(saved) : {};
  }

  static save(userPrefilledOptions: IPrefilledOptionLists) {
    localStorage.setItem(
      USER_PREFILLED_OPTIONS_KEY,
      JSON.stringify(userPrefilledOptions)
    );
  }
}

export const PREFILLED_OPTIONS: IPrefilledOptionLists = {
  "Dice Numbers": ["1", "2", "3", "4", "5", "6"],
  "Coin Flip": ["Heads", "Tails"],
  Direction: ["Left", "Straight", "Right"],
};