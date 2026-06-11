// Variable to store coordinates of the last dead token
export let lastDeadCoordinates = null;

/**
 * Rolls loot tables based on configurations and spawns an Item Pile on the scene.
 */
export async function generateLootPile() {
  const moduleID = "item-piles-loot-generator";
  
  // Get settings values
  const trinketName = game.settings.get(moduleID, "trinketTableName");
  const potionName = game.settings.get(moduleID, "potionTableName");
  const scrollName = game.settings.get(moduleID, "scrollTableName");
  
  ui.notifications.info(`Rolling loot...`);

  // --- PLACEHOLDER FOR YOUR ROLL CODES ---
  // You can port your rolling logic from Individual-Treasure.txt and Treasure.txt here.
  // Extract results and format them into an array of Item Data Objects.
  const rolledItems = []; 
  const goldAmount = 100; // Replace with your goldRoll.total logic
  // --------------------------------------

  // Determine spawn position: Last dead creature or center of current screen view
  const spawnPosition = globalThis.lastDeadCoordinates || { 
    x: canvas.scene.dimensions.sceneWidth / 2, 
    y: canvas.scene.dimensions.sceneHeight / 2 
  };

  // Trigger Item Piles API to spawn the container
  if (game.modules.get("item-piles")?.active) {
    await ItemPiles.API.createItemPile({
      sceneId: canvas.scene.id,
      position: spawnPosition,
      itemPileOptions: {
        name: "Dropped Loot",
        displayOne: true
      },
      items: rolledItems,
      attributes: { "system.currency.gp": goldAmount } // Adjust attribute key to your game system (e.g., dnd5e)
    });
    ui.notifications.info("Loot pile created successfully on the canvas!");
  } else {
    ui.notifications.error("Item Piles module is not active!");
  }
}

/**
 * Restocks a targeted merchant token with randomized items.
 */
export async function restockMerchant() {
  const moduleID = "item-piles-loot-generator";
  const targets = game.user.targets;

  if (targets.size !== 1) {
    return ui.notifications.warn("Please target exactly one vendor token!");
  }

  const targetActor = targets.first().actor;
  const shouldClear = game.settings.get(moduleID, "clearMerchantInventory");

  // Optional: Wipe existing stock before pushing new wares
  if (shouldClear) {
    const tradeableTypes = ["weapon", "equipment", "consumable", "loot"];
    const itemsToDelete = targetActor.items
      .filter(item => tradeableTypes.includes(item.type))
      .map(item => item.id);

    if (itemsToDelete.length > 0) {
      await targetActor.deleteEmbeddedDocuments("Item", itemsToDelete);
      ui.notifications.info("Cleared old vendor stock.");
    }
  }

  // --- PLACEHOLDER FOR MERCHANT STOCK LOGIC ---
  // Roll items using your Spells.txt or Potions.txt algorithms
  const newStockItems = []; 
  // ---------------------------------------------

  if (game.modules.get("item-piles")?.active && newStockItems.length > 0) {
    await ItemPiles.API.addItems(targetActor, newStockItems);
    ui.notifications.info(`Vendor "${targetActor.name}" restocked!`);
  } else {
    ui.notifications.warn("No items generated to restock or Item Piles is inactive.");
  }
}
