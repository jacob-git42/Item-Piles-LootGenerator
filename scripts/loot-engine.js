import { rollTreasureChest } from "./generators/treasure-generator.js";
import { rollIndividualTreasure } from "./generators/individual-generator.js";

/**
 * Main orchestrator to spawn loot on the canvas
 * @param {string} type - The type of loot to roll ("individual" or "chest")
 * @param {number} count - Input from the user dialog (e.g., number of items or monster tier)
 */
export async function generateLootPile(type, count) {
  let result = { items: [], gold: 0 };

  // 1. Delegate the rolling logic to the specific separate file
  if (type === "individual") {
    result = await rollIndividualTreasure(count);
  } else if (type === "chest") {
    result = await rollTreasureChest(count);
  }

  // 2. Determine spawn position (Last dead creature or screen center)
  const spawnPosition = globalThis.lastDeadCoordinates || { 
    x: canvas.scene.dimensions.sceneWidth / 2, 
    y: canvas.scene.dimensions.sceneHeight / 2 
  };

  // 3. One single Item Pile implementation handles ALL types of rolls dynamically
  if (game.modules.get("item-piles")?.active) {
    await ItemPiles.API.createItemPile({
      sceneId: canvas.scene.id,
      position: spawnPosition,
      itemPileOptions: {
        name: type === "chest" ? "Treasure Chest" : "Dropped Loot",
        displayOne: true
      },
      items: result.items,
      attributes: { "system.currency.gp": result.gold }
    });
    ui.notifications.info("Loot pile created successfully!");
  }
}
