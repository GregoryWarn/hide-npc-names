import { registerSettings } from "./settings.js";
import { HideNPCNames } from "./hide-npc-names.js";
import { Utils } from "./utils.js";

export class HooksManager {
    /**
     * Registers hooks
     */
    static registerHooks() {

        Hooks.on("init", () => {
            registerSettings();

            //Override the name property on combatants and tokens to use a getter and setter
            //We do this so that the names are still correctly hidden without having to manually update every place that uses them
            Object.defineProperty(CONFIG.Combatant.documentClass.prototype, "__name", { value: "", writable: true });
            Object.defineProperty(CONFIG.Combatant.documentClass.prototype, "name", {
                get: function () {
                    return HideNPCNames.getReplacementInfo(this.token.actor, this.__name).displayName;
                },
                set: function (name) {
                       this.__name = name;
                     }
              });
              
            Object.defineProperty(CONFIG.Token.documentClass.prototype, "__name", { value: "", writable: true });
            Object.defineProperty(CONFIG.Token.documentClass.prototype, "name", {
                get: function () {
                    return HideNPCNames.getReplacementInfo(this.actor, this.__name).displayName;
                },
                set: function (name) {
                       this.__name = name;
                     }
              });
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

        Hooks.on("renderChatMessage", (app, html, data) => {
            if (game.system.id == "dnd5e") return;
            HideNPCNames.onRenderChatMessage(app, html, data);
        });

        Hooks.on("dnd5e.renderChatMessage", (message, html) => {
            html = $(html);
            HideNPCNames.onRenderChatMessage(message, html);
        });
        
        Hooks.on("renderCombatTracker", (app, html, data) => {
            HideNPCNames.onRenderCombatTracker(app, html, data);
        });
    }
}