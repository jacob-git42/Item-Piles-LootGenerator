/**
 * Processes the rolling logic from your original Treasure.txt macro
 * @param {number} count - Number of items to roll
 * @returns {Promise<{items: Array, gold: number}>}
 */
export async function rollTreasureChest(count) {
  const moduleID = "item-piles-loot-generator";
  const mainTableName = game.settings.get(moduleID, "Treasure");
  const table = game.tables.find(t => t.name === mainTableName);

  let rolledItems = [];
  let goldTotal = 0;

  if (!table) {
    ui.notifications.error(`Table ${mainTableName} not found.`);
    return { items: [], gold: 0 };
  }

  // --- Your rolling loop from Treasure.txt goes here ---
  for (let i = 0; i < count; i++) {
    const rollResult = await table.roll();
    const result = rollResult.results[0];
    
    if (result) {
      // Instead of making a text string <li>, we fetch the actual item data object
      // so Item Piles can read it properly:
      if (result.type === "document" && result.documentCollection === "Item") {
        const item = game.items.get(result.documentId) || await fromUuid(`Compendium.${result.documentCollection}.${result.documentId}`);
        if (item) rolledItems.push(item.toObject());
      }
    }
  }
  
  // Example calculated gold roll
  goldTotal = (await new Roll("2d6 * 10").roll({async: true})).total;

  // Return unified object back to the loot-engine
  return {
    items: rolledItems,
    gold: goldTotal
  };
}
