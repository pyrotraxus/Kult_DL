import kult4eitemsheet from "./modules/sheets/kult4eitemsheet.js";
import kult4ePCsheet from "./modules/sheets/kult4ePCsheet.js";
import kult4eNPCsheet from "./modules/sheets/kult4eNPCsheet.js";
import kult4eActor from "./modules/sheets/kult4eActor.js";


async function preloadHandlebarTemplates() {
    const templatepaths =["systems/kult4e/templates/partials/move-card.hbs",
    "systems/kult4e/templates/partials/darksecret-card.hbs",
    "systems/kult4e/templates/partials/relationship-card.hbs",
    "systems/kult4e/templates/partials/weapon-card.hbs",
    "systems/kult4e/templates/partials/gear-card.hbs",
    "systems/kult4e/templates/partials/advantage-card.hbs",
    "systems/kult4e/templates/partials/dramahook-card.hbs",
    "systems/kult4e/templates/partials/disadvantage-card.hbs"];
    return loadTemplates(templatepaths);
};

Hooks.once("init", function() {
console.log("Initializing Kult 4E");
CONFIG.Actor.entityClass = kult4eActor;
Items.unregisterSheet("core", ItemSheet);
//Actors.unregisterSheet("core", ActorSheet);
Items.registerSheet("kult4e", kult4eitemsheet, {makeDefault: true});
Actors.registerSheet("kult4e", kult4ePCsheet, {makeDefault: true});
Actors.registerSheet("kult4e", kult4eNPCsheet, {makeDefault: false});

preloadHandlebarTemplates();
});

Hooks.once("ready", () => {
    // Listen for dice icon click
    const diceIconSelector = '#chat-controls i.fas.fa-dice-d20';
    $(document).on('click', diceIconSelector, () => {
        console.log(`Dice Icon Works`);
    });
});
