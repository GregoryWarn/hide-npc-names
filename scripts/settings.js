import * as MODULE_CONFIG from "./config.js";
import { Utils } from "./utils.js";

export function registerSettings() {

    Utils.registerSetting(MODULE_CONFIG.SETTING_KEYS.hideHostile, {
        name: "Settings.HideHostileN",
        hint: "Settings.HideHostileH",
        scope: "world",
        type: Boolean,
        default: MODULE_CONFIG.DEFAULT_CONFIG.hideHostile,
        config: true,
        requiresReload: true
    });

    Utils.registerSetting(MODULE_CONFIG.SETTING_KEYS.hideNeutral, {
        name: "Settings.HideNeutralN",
        hint: "Settings.HideNeutralH",
        scope: "world",
        type: Boolean,
        default: MODULE_CONFIG.DEFAULT_CONFIG.hideNeutral,
        config: true,
        requiresReload: true
    });

    Utils.registerSetting(MODULE_CONFIG.SETTING_KEYS.hideFriendly, {
        name: "Settings.HideFriendlyN",
        hint: "Settings.HideFriendlyH",
        scope: "world",
        type: Boolean,
        default: MODULE_CONFIG.DEFAULT_CONFIG.hideFriendly,
        config: true,
        requiresReload: true
    });

    Utils.registerSetting(MODULE_CONFIG.SETTING_KEYS.hideSecret, {
        name: "Settings.HideSecretN",
        hint: "Settings.HideSecretH",
        scope: "world",
        type: Boolean,
        default: MODULE_CONFIG.DEFAULT_CONFIG.hideSecret,
        config: true,
        requiresReload: true
    });

    Utils.registerSetting(MODULE_CONFIG.SETTING_KEYS.hostileNameReplacement, {
        name: "Settings.HostileReplacementN",
        hint: "Settings.HostileReplacementH",
        scope: "world",
        type: String,
        default: MODULE_CONFIG.DEFAULT_CONFIG.hostileNameReplacement,
        config: true,
        requiresReload: true
    });

    Utils.registerSetting(MODULE_CONFIG.SETTING_KEYS.neutralNameReplacement, {
        name: "Settings.NeutralReplacementN",
        hint: "Settings.NeutralReplacementH",
        scope: "world",
        type: String,
        default: MODULE_CONFIG.DEFAULT_CONFIG.neutralNameReplacement,
        config: true,
        requiresReload: true
    });

    Utils.registerSetting(MODULE_CONFIG.SETTING_KEYS.friendlyNameReplacement, {
        name: "Settings.FriendlyReplacementN",
        hint: "Settings.FriendlyReplacementH",
        scope: "world",
        type: String,
        default: MODULE_CONFIG.DEFAULT_CONFIG.friendlyNameReplacement,
        config: true,
        requiresReload: true
    });

    Utils.registerSetting(MODULE_CONFIG.SETTING_KEYS.secretNameReplacement, {
        name: "Settings.SecretReplacementN",
        hint: "Settings.SecretReplacementH",
        scope: "world",
        type: String,
        default: MODULE_CONFIG.DEFAULT_CONFIG.secretNameReplacement,
        config: true,
        requiresReload: true
    });
}