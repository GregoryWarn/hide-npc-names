import { registerSettings } from "./settings.js";
import { HideNPCNames } from "./hide-npc-names.js";
import { Utils } from "./utils.js";
import { SETTING_KEYS } from "./config.js";
import { HNNTokenActionHud } from "./token-action-hud.js";

export class HooksManager {
    /**
     * Registers hooks
     */
    static registerHooks() {

        Hooks.on("init", () => {
            game.hnn = game.hnn ?? {};

            //Override the name property on combatants and tokens to use a getter and setter
            //We do this so that the names are still correctly hidden without having to manually update every place that uses them
            Object.defineProperty(CONFIG.Combatant.documentClass.prototype, "__name", { value: "", writable: true });
            Object.defineProperty(CONFIG.Combatant.documentClass.prototype, "name", {
                get: function () {
                    return this.token?.actor ? HideNPCNames.getReplacementInfo(this.token.actor, this.__name).displayName : this.__name;
                },
                set: function (name) {
                    this.__name = name;
                }
            });

            Object.defineProperty(CONFIG.Token.documentClass.prototype, "__name", { value: "", writable: true });
            Object.defineProperty(CONFIG.Token.documentClass.prototype, "name", {
                get: function () {
                    if(!this.actor) return this.__name;
                    let replacementInfo = HideNPCNames.getReplacementInfo(this.actor, this.__name);
                    let retVal = replacementInfo.displayName;
                    if (game.user.isGM && replacementInfo.shouldReplace) {
                        let hiddenSuffix = Utils.getSetting(SETTING_KEYS.tokenHiddenSuffix);
                        retVal += " " + hiddenSuffix;
                    }
                    return retVal;
                },
                set: function (name) {
                    this.__name = name;
                }
            });

            Object.defineProperty(foundry.data.PrototypeToken.prototype, "__name", { value: "", writable: true });
            Object.defineProperty(foundry.data.PrototypeToken.prototype, "name", {
                get: function () {
                    return HideNPCNames.getReplacementInfo(this.actor, this.__name).displayName;
                },
                set: function (name) {
                    this.__name = name;
                }
            });
        });

        Hooks.on("i18nInit", () => {
            registerSettings();
        });


        Hooks.on("updateActor", (actor, updateData, options, userId) => {
            HideNPCNames.onUpdateActor(actor, updateData, options, userId);
        });

        Hooks.on("updateToken", (tokenDocument, updateData, options, userId) => {
            HideNPCNames.onUpdateToken(tokenDocument, updateData, options, userId);
        });

        Hooks.on("renderImagePopout", (app, html, data) => {
            HideNPCNames.onRenderImagePopout(app, html, data);
        });

        Hooks.on("renderActorSheet", (app, html, data) => {
            HideNPCNames.onRenderActorSheet(app, html, data);
        });

        Hooks.on("createChatMessage", (message, options, userId) => {
            HideNPCNames.onCreateChatMessage(message, options, userId);
        });

        Hooks.on("renderChatMessageHTML", (app, html, data) => {
            if (game.system.id == "dnd5e") return;
            HideNPCNames.onRenderChatMessageHTML(app, html, data);
        });

        Hooks.on("dnd5e.renderChatMessage", (message, html) => {
            HideNPCNames.onRenderChatMessageHTML(message, html);
        });

        Hooks.on("renderCombatTracker", (app, html, data) => {
            HideNPCNames.onRenderCombatTracker(app, html, data);
        });

        Hooks.on('renderActorDirectory', (app, html) => {
            HideNPCNames.onRenderActorDirectory(app, html);
        });

        /* -------------------------------------------- */
        /*              Token Action HUD                */
        /* -------------------------------------------- */
        Hooks.on('tokenActionHudCoreRegisterDefaults', (defaults) => {
            HNNTokenActionHud.registerDefaults(defaults);
        });

        Hooks.on('tokenActionHudCoreApiReady', (module) => {
            HNNTokenActionHud.createTokenActionHudClasses(module);
        });

        Hooks.on('tokenActionHudCoreAddActionHandlerExtenders', (actionHandler) => {
            actionHandler.addActionHandlerExtender(new game.hnn.HNNActionHandlerExtender(actionHandler));
        });

        Hooks.on('tokenActionHudCoreAddRollHandlerExtenders', (rollHandler) => {
            rollHandler.addRollHandlerExtender(new game.hnn.HNNRollHandlerExtender());
        });
    }
}