export function registerSettings() {
  const moduleID = "item-piles-loot-generator";

  // --- General & Vendor Settings ---
  game.settings.register(moduleID, "clearMerchantInventory", {
    name: "Clear Vendor Inventory Before Restocking",
    hint: "If enabled, old tradeable items will be deleted from the merchant before adding new rolled stock.",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });

  // --- Loot Drop Chances ---
  game.settings.register(moduleID, "bonusScrollChance", {
    name: "Bonus Scroll Chance",
    hint: "Chance (0.0 to 1.0) to drop an additional spell scroll.",
    scope: "world",
    config: true,
    type: Number,
    range: { min: 0, max: 1, step: 0.05 },
    default: 0.10
  });

  game.settings.register(moduleID, "bonusPotionChance", {
    name: "Bonus Potion Chance",
    hint: "Chance (0.0 to 1.0) to drop an additional potion.",
    scope: "world",
    config: true,
    type: Number,
    range: { min: 0, max: 1, step: 0.05 },
    default: 0.40
  });

  // --- Table Names / Configurations ---
  game.settings.register(moduleID, "trinketTableName", {
    name: "Trinket Table Name",
    hint: "The exact name of your rollable table for trinkets & plunder.",
    scope: "world",
    config: true,
    type: String,
    default: "🎒 Trinkets & Plunder"
  });

  game.settings.register(moduleID, "potionTableName", {
    name: "Potion Table Name",
    hint: "The exact name of your rollable table for potions and poisons.",
    scope: "world",
    config: true,
    type: String,
    default: "🧪 Potions and Poisons"
  });

  game.settings.register(moduleID, "scrollTableName", {
    name: "Scroll Table Name",
    hint: "The exact name of your rollable table for weighted spell scrolls.",
    scope: "world",
    config: true,
    type: String,
    default: "Wizard Spells - Level 0 - 9 (weighted)"
  });
}
