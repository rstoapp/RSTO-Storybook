// ===========================================================================
// RSTO ICON REFERENCE GRID - Figma
// ===========================================================================
//
// HOW TO USE:
//   1. Navigate to your Foundations - Icons page in Figma
//   2. Open Scripter, paste and click Run
//   3. Use the Material Symbols plugin to fill in each placeholder:
//        Plugins > Material Symbols > Style: Outlined, Size: 24
//        Search the name shown under each cell, insert, place in placeholder
//
// Safe to re-run: deletes and recreates "Icon Reference" each time
// ===========================================================================

const FRAME_NAME = "Icon Reference";

const C = {
  paper:  { r: 0.984, g: 0.965, b: 0.933 },
  bone:   { r: 0.957, g: 0.925, b: 0.878 },
  sand:   { r: 0.910, g: 0.863, b: 0.776 },
  ink:    { r: 0.122, g: 0.102, b: 0.078 },
  shadow: { r: 0.420, g: 0.369, b: 0.290 },
  stone:  { r: 0.749, g: 0.694, b: 0.592 },
  orange: { r: 0.949, g: 0.545, b: 0.176 },
  white:  { r: 1.000, g: 1.000, b: 1.000 },
};

const FRAME_W  = 1080;
const PADDING  = 64;
const COLS     = 8;
const CELL_W   = 96;
const CELL_GAP = 16;
const ICON_SZ  = 24;
const CELL_H   = ICON_SZ + 36;

// Each icon: { name: "layer/reference name", search: "what to type in Material Symbols plugin" }
// search term = Material Symbols name (no "outline" suffix — that's the Style dropdown)
const ICON_CATEGORIES = [
  {
    category: "Navigation & Controls",
    icons: [
      { name: "chevron_left",                  search: "chevron_left"                },
      { name: "chevron_right",                 search: "chevron_right"               },
      { name: "arrow_drop_down",               search: "arrow_drop_down"             },
      { name: "arrow_forward",                 search: "arrow_forward"               },
      { name: "expand_less",                   search: "expand_less"                 },
      { name: "expand_more",                   search: "expand_more"                 },
      { name: "keyboard_arrow_down",           search: "keyboard_arrow_down"         },
      { name: "keyboard_arrow_right",          search: "keyboard_arrow_right"        },
      { name: "keyboard_double_arrow_left",    search: "keyboard_double_arrow_left"  },
      { name: "keyboard_double_arrow_right",   search: "keyboard_double_arrow_right" },
      { name: "navigate_next",                 search: "navigate_next"               },
      { name: "close",                         search: "close"                       },
    ]
  },
  {
    category: "Actions",
    icons: [
      { name: "search",          search: "search"        },
      { name: "file_download",   search: "file_download" },
      { name: "file_upload",     search: "file_upload"   },
      { name: "publish",         search: "publish"       },
      { name: "upload",          search: "upload"        },
      { name: "autorenew",       search: "autorenew"     },
      { name: "logout",          search: "logout"        },
    ]
  },
  {
    category: "Status & Feedback",
    icons: [
      { name: "check_circle_outline", search: "check_circle_outline" },
      { name: "error_outline",        search: "error_outline"        },
      { name: "warning_amber",        search: "warning_amber"        },
      { name: "info",                 search: "info"                 },
      { name: "hourglass_empty",      search: "hourglass_empty"      },
      { name: "assignment_late",      search: "assignment_late"      },
    ]
  },
  {
    category: "Charts & Data",
    icons: [
      { name: "bar_chart",            search: "bar_chart"            },
      { name: "show_chart",           search: "show_chart"           },
      { name: "stacked_bar_chart",    search: "stacked_bar_chart"    },
      { name: "radar",                search: "radar"                },
      { name: "donut_large",          search: "donut_large"          },
      { name: "grid_on",              search: "grid_on"              },
      { name: "grid_view",            search: "grid_view"            },
      { name: "format_list_bulleted", search: "format_list_bulleted" },
    ]
  },
  {
    category: "App Navigation",
    icons: [
      { name: "dashboard",     search: "dashboard"     },
      { name: "settings",      search: "settings"      },
      { name: "notifications", search: "notifications" },
    ]
  },
  {
    category: "People & Community",
    icons: [
      { name: "group",      search: "group"      },
      { name: "groups",     search: "groups"     },
      { name: "child_care", search: "child_care" },
      { name: "shield",     search: "shield"     },
    ]
  },
  {
    category: "Content & Resources",
    icons: [
      { name: "library_books", search: "library_books" },
      { name: "menu_book",     search: "menu_book"     },
      { name: "description",   search: "description"   },
      { name: "folder",        search: "folder"        },
      { name: "folder_open",   search: "folder_open"   },
      { name: "check_box",     search: "check_box"     },
    ]
  },
  {
    category: "Location & Place",
    icons: [
      { name: "location_on",    search: "location_on"    },
      { name: "public",         search: "public"         },
      { name: "apartment",      search: "apartment"      },
      { name: "directions_bus", search: "directions_bus" },
      { name: "calendar_month", search: "calendar_month" },
      { name: "calendar_today", search: "calendar_today" },
    ]
  },
  {
    category: "Insights & AI",
    icons: [
      { name: "lightbulb",    search: "lightbulb"    },
      { name: "auto_awesome", search: "auto_awesome"  },
      { name: "trending_up",  search: "trending_up"  },
      { name: "trending_down",search: "trending_down" },
    ]
  },
  {
    category: "Communication",
    icons: [
      { name: "chat_bubble_outline", search: "chat_bubble_outline" },
      { name: "mail",                search: "mail"          },
      { name: "support_agent",       search: "support_agent" },
      { name: "code",                search: "code"          },
    ]
  },
];

async function loadFonts() {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
}

function makeText(content, size, style, colour, width) {
  const t = figma.createText();
  t.fontName = { family: "Inter", style };
  t.fontSize = size;
  t.fills = [{ type: "SOLID", color: colour }];
  t.characters = content;
  if (width) {
    t.resize(width, t.height);
    t.textAutoResize = "HEIGHT";
  }
  return t;
}

async function main() {
  await loadFonts();

  const existing = figma.currentPage.children.find(n => n.name === FRAME_NAME);
  if (existing) existing.remove();

  const root = figma.createFrame();
  root.name = FRAME_NAME;
  root.fills = [{ type: "SOLID", color: C.paper }];
  root.resize(FRAME_W, 2000);
  root.clipsContent = false;
  figma.currentPage.appendChild(root);

  let y = PADDING;

  // Section heading
  const heading = makeText("Icon Reference", 11, "Medium", C.shadow, 300);
  heading.name = "Section/Heading";
  heading.x = PADDING; heading.y = y;
  root.appendChild(heading);
  y += heading.height + 8;

  const accent = figma.createRectangle();
  accent.name = "Section/Accent-Bar";
  accent.resize(32, 3);
  accent.x = PADDING; accent.y = y;
  accent.fills = [{ type: "SOLID", color: C.orange }];
  accent.cornerRadius = 2;
  root.appendChild(accent);
  y += 20;

  // Rules banner
  const banner = figma.createFrame();
  banner.name = "Style-Rule/Banner";
  banner.x = PADDING; banner.y = y;
  banner.fills = [{ type: "SOLID", color: C.bone }];
  banner.cornerRadius = 6;
  banner.resize(FRAME_W - PADDING * 2, 44);
  root.appendChild(banner);

  const bannerText = makeText(
    "Style: Outlined only   |   Size: 24px default, 20px inline with body1, 16px inline with body2   |   Colour: inherits from text — except semantic status icons",
    11, "Regular", C.shadow, FRAME_W - PADDING * 2 - 32
  );
  bannerText.name = "Style-Rule/Text";
  bannerText.x = 16; bannerText.y = 12;
  banner.appendChild(bannerText);
  banner.resize(FRAME_W - PADDING * 2, bannerText.height + 24);
  y += banner.height + 40;

  let totalIcons = 0;

  // Icon categories
  for (const group of ICON_CATEGORIES) {
    console.log("Building category: " + group.category);

    // Category heading
    const catLabel = makeText(group.category, 12, "Bold", C.ink, FRAME_W - PADDING * 2);
    catLabel.name = "Category/" + group.category;
    catLabel.x = PADDING; catLabel.y = y;
    root.appendChild(catLabel);
    y += catLabel.height + 14;

    // Build rows of icons
    let col = 0;
    let rowStartY = y;

    for (const icon of group.icons) {
      try {
        const cellX = PADDING + col * (CELL_W + CELL_GAP);

        // Cell frame — named by MUI reference name
        const cell = figma.createFrame();
        cell.name = "Icon/" + icon.name;
        cell.resize(CELL_W, CELL_H);
        cell.x = cellX;
        cell.y = rowStartY;
        cell.fills = [];
        root.appendChild(cell);

        // Placeholder box
        const box = figma.createRectangle();
        box.name = "Placeholder";
        box.resize(ICON_SZ, ICON_SZ);
        box.x = (CELL_W - ICON_SZ) / 2;
        box.y = 0;
        box.fills = [{ type: "SOLID", color: C.bone }];
        box.strokes = [{ type: "SOLID", color: C.sand }];
        box.strokeWeight = 1;
        box.cornerRadius = 4;
        cell.appendChild(box);

        // Search term label — what to type in Material Symbols plugin
        const lbl = makeText(icon.search, 9, "Regular", C.stone, CELL_W);
        lbl.name = "Label/Search-Term";
        lbl.x = 0;
        lbl.y = ICON_SZ + 8;
        cell.appendChild(lbl);

        totalIcons++;
        col++;

        if (col >= COLS) {
          col = 0;
          rowStartY += CELL_H + CELL_GAP;
        }

      } catch (e) {
        console.error("Error on icon " + icon.name + ": " + e.message);
      }
    }

    // Advance y past all rows used by this category
    if (col > 0) rowStartY += CELL_H + CELL_GAP;
    y = rowStartY + 32;

    console.log("  Done: " + group.icons.length + " icons");
  }

  // How-to note
  y += 8;
  const howTo = figma.createFrame();
  howTo.name = "How-To/Banner";
  howTo.x = PADDING; howTo.y = y;
  howTo.fills = [{ type: "SOLID", color: C.bone }];
  howTo.cornerRadius = 6;
  howTo.clipsContent = false;
  root.appendChild(howTo);

  const steps = [
    "How to fill in icons using the Material Design Icons plugin:",
    "1.  Install 'Material Design Icons' from the Figma Community (by Vjacheslav Trushkin)",
    "     — this matches @mui/icons-material exactly. Do NOT use Material Symbols (different set).",
    "2.  Open via Plugins > Material Design Icons — set style to Outlined",
    "3.  Search the icon name shown under each placeholder box (names match MUI imports exactly)",
    "4.  Insert — move the icon into the placeholder box, then delete the placeholder rectangle",
    "5.  Rename the inserted icon to match the cell name (e.g. icon/dashboard)",
  ];

  let stepY = 20;
  for (let i = 0; i < steps.length; i++) {
    const s = makeText(steps[i], 11, i === 0 ? "Bold" : "Regular", i === 0 ? C.ink : C.shadow, FRAME_W - PADDING * 2 - 32);
    s.name = "How-To/Step-" + i;
    s.x = 16; s.y = stepY;
    howTo.appendChild(s);
    stepY += s.height + (i === 0 ? 12 : 6);
  }
  howTo.resize(FRAME_W - PADDING * 2, stepY + 20);
  y += howTo.height + PADDING;

  // Final resize
  root.resize(FRAME_W, y);

  figma.viewport.scrollAndZoomIntoView([root]);
  figma.notify("Icon grid created - " + totalIcons + " icons across " + ICON_CATEGORIES.length + " categories", { timeout: 4000 });
  figma.closePlugin();
}

main();
