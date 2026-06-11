export function registerSettings() {
  const moduleID = "advanced-loot-system";

  // 1. Händler-Einstellung (Löschen vs. Hinzufügen)
  game.settings.register(moduleID, "clearMerchantInventory", {
    name: "Händlerinventar vor Befüllung leeren",
    hint: "Wenn aktiviert, werden alte Handelswaren gelöscht, bevor neue ausgewürfelt werden.",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });

  // 2. Drop-Chancen (Beispiel: Bonus Scroll)
  game.settings.register(moduleID, "bonusScrollChance", {
    name: "Bonus Scroll Chance (%)",
    hint: "Wahrscheinlichkeit (in Prozent), dass eine zusätzliche Schriftrolle droppt.",
    scope: "world",
    config: true,
    type: Number,
    range: { min: 0, max: 100, step: 1 },
    default: 10
  });

  // 3. RollTables (Einfache Textfelder für die Namen, später durch UUID-Dropdowns erweiterbar)
  game.settings.register(moduleID, "trinketTableName", {
    name: "Trinket Table Name",
    hint: "Exakter Name der Rolltable für Trinkets.",
    scope: "world",
    config: true,
    type: String,
    default: "🎒 Trinkets & Plunder"
  });

  // Weitere Einstellungen für Magic Tables, Potions etc. analog hinzufügen...
}
