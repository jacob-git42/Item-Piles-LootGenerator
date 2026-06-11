import { generateLootPile, restockMerchant } from "./loot-engine.js";

export function createSidebarButtons(app, html, data) {
  // Nur für Game Master anzeigen (optional)
  if (!game.user.isGM) return;

  // HTML für die Buttons
  const buttonsHtml = `
    <div class="advanced-loot-buttons" style="display: flex; gap: 5px; margin-bottom: 10px;">
      <button id="btn-spawn-loot" type="button" style="flex: 1;">
        <i class="fas fa-gem"></i> Drop Loot
      </button>
      <button id="btn-restock-merchant" type="button" style="flex: 1;">
        <i class="fas fa-store"></i> Restock
      </button>
    </div>
  `;

  // Fügt die Buttons ganz oben in den Chat-Tab ein
  html.find('#chat-controls').before(buttonsHtml);

  // Klick-Events zuweisen
  html.find('#btn-spawn-loot').click(() => {
    generateLootPile();
  });

  html.find('#btn-restock-merchant').click(() => {
    restockMerchant();
  });
}
