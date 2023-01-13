export type settingKeys = "showHint" | "showExample" | string;

export type Settings = {
  [key in settingKeys]: boolean;
};
const defaultSettings: Settings = {
  showHint: true,
  showExample: true,
};
const settings = reactive(
  useState("settings", () => {
    const settingsText = localStorage.getItem("settings");
    return {
      ...defaultSettings,
      ...(settingsText ? JSON.parse(settingsText) : {}),
    } as Settings;
  }).value
);
watchEffect(() => {
  localStorage.setItem("settings", JSON.stringify(settings));
});

export default () => settings;
type SettingsHint = {
  [key in keyof Settings]: { name: string; desc: string };
};
const hint: SettingsHint = {
  showHint: {
    name: "Show hint",
    desc: "Shows hints below answer boxes.",
  },
  showExample: {
    name: "Show example",
    desc: "Shows an example before answering if exists.",
  },
};
export const useSettingsHint = () => hint;
