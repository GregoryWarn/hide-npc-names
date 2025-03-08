export const NAME = "hide-npc-names";

export const TITLE = "Hide NPC Names";
export const SHORT_TITLE = "HNN";

export const PATH = "modules/hide-npc-names";

export const CONST = {
}

export const DEFAULT_CONFIG = {
    templates: {
        actorForm: `${PATH}/templates/actor-hide-name.hbs`,
    },
    hideHostile: true,
    hideNeutral: true,
    hideFriendly: false,
    hideSecret: true,
    hostileNameReplacement: "Unknown Creature",
    neutralNameReplacement: "Unknown Creature",
    friendlyNameReplacement: "Unknown Creature",
    secretNameReplacement: "Unknown Creature",
}

export const FLAGS = {
    nameHiddenOverride: "nameHiddenOverride",
    replacementNameOverride: "replacementNameOverride"
}

export const SETTING_KEYS = {
    hideHostile: "hideHostileNames",
    hideNeutral: "hideNeutralNames",
    hideFriendly: "hideFriendlyNames",
    hideSecret: "hideSecretNames",
    hostileNameReplacement: "hostileNameReplacement",
    neutralNameReplacement: "neutralNameReplacement",
    friendlyNameReplacement: "friendlyNameReplacement",
    secretNameReplacement: "secretNameReplacement"
}

