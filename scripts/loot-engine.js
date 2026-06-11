// Variable zum Speichern der Koordinaten des letzten toten Tokens
export let lastDeadCoordinates = null;

// Funktion 1: Loot auf dem Canvas spawnen
export async function generateLootPile() {
  const trinketName = game.settings.get("advanced-loot-system", "trinketTableName");
  ui.notifications.info(`Würfele Loot aus Tabelle: ${trinketName}...`);

  // HIER KOMMT DEIN WÜRFEL-CODE REIN (Auswertung der Tables, Sammeln der Item-Daten)
  // ...
  
  // Dummy-Daten für diesen Test
  const itemsToSpawn = []; // Hier die erwürfelten Item-Objekte einfügen
  const goldAmount = 150; 

  // Position bestimmen (Entweder letzter Toter oder Bildschirmmitte)
  const pos = lastDeadCoordinates || { x: canvas.scene.dimensions.sceneWidth / 2, y: canvas.scene.dimensions.sceneHeight / 2 };

  // Item Piles API Aufruf
  if (game.modules.get("item-piles")?.active) {
    await ItemPiles.API.createItemPile({
      sceneId: canvas.scene.id,
      position: pos,
      itemPileOptions: {
        name: "Dropped Loot",
        displayOne: true
      },
      items: itemsToSpawn,
      attributes: { "system.currency.gp": goldAmount }
    });
    ui.notifications.success("Loot Pile auf der Karte platziert!");
  }
}

// Funktion 2: Händler befüllen
export async function restockMerchant() {
  const targets = game.user.targets;
  if (targets.size !== 1) {
    return ui.notifications.warn("Bitte visiere genau einen Händler-Token an!");
  }

  const targetActor = targets.first().actor;
  const shouldClear = game.settings.get("advanced-loot-system", "clearMerchantInventory");

  if (shouldClear) {
    const tradeableTypes = ["weapon", "equipment", "consumable", "loot"];
    const itemsToDelete = targetActor.items
      .filter(item => tradeableTypes.includes(item.type))
      .map(item => item.id);

    if (itemsToDelete.length > 0) {
      await targetActor.deleteEmbeddedDocuments("Item", itemsToDelete);
      ui.notifications.info("Altes Inventar gelöscht.");
    }
  }

  // HIER DEIN WÜRFEL-CODE FÜR HÄNDLER-WAREN REIN
  const newItems = []; // Die erwürfelten Items
  
  if (game.modules.get("item-piles")?.active && newItems.length > 0) {
    await ItemPiles.API.addItems(targetActor, newItems);
  }
  
  ui.notifications.success(`Händler ${targetActor.name} wurde neu beliefert!`);
}
