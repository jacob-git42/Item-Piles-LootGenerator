import { registerSettings } from "./settings.js";
import { createSidebarButtons } from "./sidebar.js";

Hooks.once("init", () => {
  console.log("Item Piles Loot Generator | Initializing module...");
  registerSettings();
});

Hooks.once("ready", () => {
  if (!game.modules.get("item-piles")?.active) {
    ui.notifications.error("Item Piles Loot Generator requires the 'Item Piles' module to be active!");
  }
});

// Render control buttons inside the Chat Sidebar Tab
Hooks.on("renderChatLog", (app, html, data) => {
  createSidebarButtons(app, html, data);
});

// Event hook to monitor token health and log death locations
Hooks.on("updateToken", (tokenDoc, updateData, options, userId) => {
  const hpValue = updateData.actorData?.system?.attributes?.hp?.value;
  const isDeadOverlay = updateData.overlayEffect?.includes("dead");

  if (hpValue === 0 || isDeadOverlay) {
    // Storing coordinates inside global context to safely access between ES modules
    globalThis.lastDeadCoordinates = { 
      x: tokenDoc.x, 
      y: tokenDoc.y 
    };
    console.log(`Item Piles Loot Generator | Cached dead token position at X: ${tokenDoc.x}, Y: ${tokenDoc.y}`);
  }
});
