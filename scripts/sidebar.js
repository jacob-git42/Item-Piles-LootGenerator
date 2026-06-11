import { generateLootPile, restockMerchant } from "./loot-engine.js";

export function createSidebarButtons(app, html, data) {
  // Only display buttons for Game Masters
  if (!game.user.isGM) return;

  const buttonsHtml = `
    <div class="item-piles-loot-buttons" style="display: flex; gap: 5px; margin-bottom: 10px;">
      <button id="btn-generate-loot" type="button" style="flex: 1;">
        <i class="fas fa-gem"></i> Drop Loot
      </button>
      <button id="btn-restock-vendor" type="button" style="flex: 1;">
        <i class="fas fa-store"></i> Restock Vendor
      </button>
    </div>
  `;

  // Inject buttons into the Foundry chat log controls area
  html.find('#chat-controls').before(buttonsHtml);

  // Bind click listeners to engine functions
  html.find('#btn-generate-loot').click(() => {
    generateLootPile();
  });

  html.find('#btn-restock-vendor').click(() => {
    restockMerchant();
  });
}
