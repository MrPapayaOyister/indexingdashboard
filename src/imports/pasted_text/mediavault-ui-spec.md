Design a complete multi-page UI for a media intelligence platform called MediaVault.

VISUAL STYLE
The entire UI uses a hybrid of dark neumorphism and glassmorphism on a dark grey base. 
The base page background is dark grey (#1A1A1A), not black. 
Neumorphism creates the tactile, soft-raised or inset depth on containers, 
section backgrounds, and structural elements. 
Glassmorphism (frosted glass with blur) is used on cards, panels, modals, 
dropdowns, and any floating element. 
Zero color gradients. Zero color accents. 
The only accent color is white — used for active states, focus rings, 
selected borders, and primary buttons. 
All other text is white (#FFFFFF) for primary, medium grey (#888888) for 
secondary, and dark grey (#444444) for muted/disabled. 
Typography is Inter throughout. JetBrains Mono for timestamps and metadata only. 
No scrollbars on any page. Use pagination in grids and fade with load-more 
in scrollable panels. 
Icons are Lucide, 24px, 1.5px stroke, white or grey depending on state.

GLOBAL SHELL
Every page shares the same left sidebar.
The sidebar is 60px wide, always collapsed, icon-only. No labels visible — 
labels appear only as tooltips on hover.
Sidebar background matches the page base — neumorphic raised surface.
Icons top to bottom: Home, Dashboard, Library, Watchlist, Upload, Collections, Settings.
Bottom of sidebar: Bell (notifications), Avatar (32px circle).
Active page icon is white with a 2px white left-edge indicator bar.
Inactive icons are dark grey (#555).
There is no top navigation bar on any page. Each page manages its own 
inline header.
A persistent mini player floats at the bottom-right corner of every page 
when media is playing. It is a frosted glass card, 320px wide, 72px tall, 
with a thumbnail on the left, title and timestamp in the center, and 
playback controls (prev, play/pause, next, close) on the right.


PAGE 1 — AUTH
Full dark grey page. Nothing decorative.
Dead center of the screen: MV monogram in a neumorphic raised circle badge, 
white text, 36px. Below it "MediaVault" in white 20px medium weight.
Below that: email input field, password input field with eye toggle, 
a full-width white-filled Sign In button with black text.
Below the button: "Forgot password?" in grey, 12px, centered.
Input fields are neumorphic inset style — they sit pushed into the surface, 
not floating above it. Hairline white border on focus.
No background art, no decorative cards, no gradients.


PAGE 2 — HOME
This page IS the search page. No separate search page exists.
No top bar.

Upper half of the page is vertically centered:
A small label "MEDIAVAULT" in grey, 11px, uppercase, wide letter-spacing, 
centered above the search bar.
Below it, a frosted glass search bar, 640px wide, 56px tall, radius 14px.
Left side of the bar has a search icon in grey.
Placeholder text reads "Ask anything about your media…"
Right side of the bar has three icons in a row: microphone (voice input), 
paperclip (attach file or image), and a filter sliders icon.
Below the search bar, a row of recent search chips as frosted glass pills 
with grey text and a dismiss × on each.
Below the chips, a hint text "⌘K from anywhere" in dark grey, 11px, centered.

Voice input active state: the search bar border pulses white softly, 
microphone icon turns white, placeholder changes to "Listening…", 
a subtle white waveform animation appears inside the bar.

File attached state: a small glass chip appears inside the left of the bar 
showing the filename and a × to remove it. Placeholder changes to 
"Ask about this file…"

Lower half of the page:
Four stat cards in a single horizontal centered row, each 220px wide, 
gap 16px between them.
The cards are neumorphic raised — they sit above the page surface with 
soft light and dark shadows.
Card 1: large white number "2,523" with grey label "Total Files" below.
Card 2: large white number "7" with a small white pulsing dot beside it, 
grey label "Processing" below.
Card 3: large white number "2.4 TB" with grey label "Storage Used" below, 
and a 3px thin progress bar at the bottom of the card 
(white fill on dark grey track showing 48% used).
Card 4: large white number "38" with grey label "Topics Indexed" below.
All four cards are clickable. Clicking Total Files goes to Library. 
Clicking Processing goes to Dashboard. Clicking Storage goes to Settings. 
Clicking Topics goes to Library filtered by topic.
Bottom-right of the card row: a grey text link "Dashboard →" in 12px.


PAGE 3 — DASHBOARD
Inline page header row: "Dashboard" white 24px bold on the left. 
On the right: a ghost button "Last 30 Days" with a calendar icon, 
and a ghost button "Export" with a download icon.

Section 1 — AI Spotlight:
Full-width frosted glass card, approximately 170px tall, horizontal layout.
Left side: a dark thumbnail placeholder (280px wide, rounded corners, 
centered play icon).
Right side: a small grey uppercase tag "AI PICK", a white 20px bold title, 
a two-line grey excerpt, two frosted glass topic chips with white text, 
and an "Open" button — the only white-filled button on this page, 
black text, 36px height, 8px radius.

Section 2 — KPI Row:
Four equal-width neumorphic raised cards in a horizontal row.
Card 1: "2,523" uploads, sub-label "+18% vs last month" in white small text.
Card 2: "7 items" in processing queue, sub-label "Avg 4 min each" in grey.
Card 3: "2,104" AI summaries generated, sub-label "96.2% confidence avg" in grey.
Card 4: "38" unique topics, sub-label "Extracted across files" in grey.

Section 3 — Charts Row (two columns, 60/40 split):
Left panel: frosted glass card titled "Upload Velocity". 
Line chart with a single white line, no area fill underneath, 
no gridlines, date labels on x-axis in dark grey, count on y-axis in dark grey.
Right panel: frosted glass card titled "Language Distribution". 
Horizontal bars. Track is dark grey. Fill is white. 
Language name on the left in grey, percentage on the right in grey. 
Show 5 languages.

Section 4 — Three equal columns:
Left: "Trending Keywords" — a word cloud where word size scales with frequency, 
color ranges from dark grey (low) to white (high).
Center: "Top People" — a ranked list of 5 items, each with a rank number, 
a grey initial circle (neumorphic), person name in white, appearance count in grey.
Right: "Top Objects" — same structure, Lucide icon instead of initial circle.

Section 5 — Processing Jobs Table:
Full-width frosted glass card.
Column headers in dark grey uppercase 11px.
Columns: File Name (with type icon) | Type | Status | Duration | Uploaded | Actions.
Status pills: READY (glass, white border), PROCESSING (glass, pulsing white dot), 
FAILED (muted, grey text, retry icon).
Action icons: eye and download, ghost style, 32px.
Five rows maximum. "View all jobs →" grey text link bottom right.


PAGE 4 — MEDIA LIBRARY
Page-level tab row inline at the top: All · Videos · Audio · Documents.
Active tab: white text, 2px white bottom underline. Inactive: grey.
Top-right controls: grid/list toggle icon buttons, sort dropdown, bulk select ghost button.

Left filter panel: 220px wide, neumorphic inset feel, full height.
Title "Filters" in white 13px and "Clear all" link in grey on the same row.
Collapsible sections with chevron toggles, 40px row height each:
Media Type — checkbox group.
Status — checkboxes with status dots (white for ready, pulsing for processing, muted for failed).
Language — dropdown.
Has — toggle switches for Transcript, Summary, Keywords, Notes.
Duration — range slider.
File Size — range slider.
Date Added — two date inputs.
People — expandable list.
Objects — expandable tag list.
Section header labels in dark grey uppercase 11px. Dense rows, minimal padding.

Content area to the right of filters:
Active filter chips row shown only when filters are applied — grey dismissible glass pills.
Results count "Showing 284 items" in grey 13px.
Four-column card grid, 16px gaps.

Each media card:
Neumorphic raised card. Thumbnail area 16:9 with dark background. 
Type badge glass pill top-left of thumbnail (MP4, WAV, PDF). 
Bookmark icon top-right, visible on hover.
Duration or page count badge bottom-right of thumbnail in a glass pill.
Card body below thumbnail: title in white 14px (two lines max), 
language and topic chips in glass pills, file size and upload date in grey 12px.
Processing status pill only shown if file is not ready.
Hover state: border brightens to rgba(255,255,255,0.18), three action icons fade in 
over thumbnail — a centered play/open icon, watchlist icon top-right, 
more options bottom-right.
Bulk select mode shows a checkbox top-left on each card.
Bottom of page: text-based pagination — ← 1 2 3 4 5 → centered in grey.


PAGE 5 — MEDIA VIEWER
Breadcrumb at top: "Library / Product Demo Q2 2026" in grey 12px.
Two-column layout. Left column 65% width for the player. 
Right column 35% for the intelligence panel. 
Right column has a subtle left border in dark grey.
No top bar.

Left column:
Video container — 16:9 ratio, pure black background, rounded corners.
Below the video, a frosted glass custom controls bar, 56px tall:
Left cluster: previous chapter, back 10 seconds, play/pause, forward 10 seconds, next chapter.
Center: timestamp in monospace grey showing current time and total duration.
Right cluster: volume slider, speed selector (showing "1x" as a glass pill), 
subtitle toggle, language selector (globe icon + language code), 
clip tool (scissors icon), picture-in-picture, fullscreen.
Above the controls bar: the progress bar — 6px tall, 
dark grey track, white fill, chapter markers as small white triangles above the bar.
On hover over progress bar: a scrub preview thumbnail floats above the cursor in a glass card.
Below the controls bar: a subtle waveform strip 24px tall in white at low opacity.

Clip tool expanded state shown as an overlay:
Drag handles on the timeline for start and end points. 
Label showing the selected range duration. 
Name input, format selector pills (MP4, GIF, WebM), 
Generate Clip primary button and Cancel ghost button.

Below the player: a "Related" grey label and a horizontal row of 3 smaller media cards.

Right column — Intelligence Panel:
Scrollable tab bar at the top: 
Transcript, Summary, Keywords, Key Moments, People, Objects, Events, Notes, Chapters.
Active tab: white text, 2px white underline. Inactive: grey.

Transcript tab content:
Compact search bar at top.
List of timestamped transcript entries. 
Each entry has a clickable glass timestamp pill on the left 
that seeks the video when clicked. 
The currently playing entry has a 2px white left border and 
a very subtle white glass background tint.
Auto-scroll toggle as a small glass pill bottom-right.

Summary tab: 
3px confidence bar at top (white fill, grey label "96% confidence").
Summary text in white 14px, line height 1.7.
Copy, Export .txt, and Regenerate as ghost buttons below.

Keywords tab:
Frequency-scaled word cloud, same style as dashboard.
Below it: a list with keyword, count, first occurrence timestamp, 
and a "Find in transcript" grey link.

Key Moments tab:
Card list — small thumbnail, timestamp pill, quote text, Jump To link. 
Five items shown. "Show more" inline below.

People, Objects, Events tabs:
List format — avatar or icon, name or label, count, first timestamp.
Click any item to highlight all appearances in the transcript tab.

Notes tab:
Formatting toolbar: bold, italic, underline, H1, H2, bullet list, insert timestamp.
Editor area with neumorphic inset background.
Export as PDF and Export as Markdown ghost buttons below.

Chapters tab:
Numbered list — chapter number, title (editable inline on click), 
timestamp, and duration.

Bottom bar full width: 
Download dropdown on the left, Share ghost button in center, 
Report AI Error grey text link on the right.


PAGE 6 — UPLOAD SELECT
Full screen. No top bar. Centered content.

"What are you uploading?" in white 26px bold, centered.
"Details can be added on the next step." in grey 14px centered below.

Three neumorphic raised cards in a horizontal row, centered, 
240px wide each, 180px tall, 24px gap.
Each card has a large white Lucide icon centered (video camera, microphone, file text), 
the media type name in white 17px below the icon, 
and the accepted formats in grey 12px below the name.
Card hover: border lifts, surface brightens slightly.
Card click: scale-down micro-animation, transition to Upload Detail page.

Below the cards: "Or import from a URL" in grey 13px underlined, centered.


PAGE 7 — UPLOAD DETAIL
Back link "← Back" in grey 13px at top left.

Two-column layout, 55/45 split.

Left column — Drop Zone:
Tall frosted glass card. 
Inside: dashed border rectangle (2px dashed, low-opacity white, radius 16px).
Inside the dashed area: upload cloud icon in white 48px, 
"Drop your file here" in white 18px, "or" in grey, 
"Browse files" as a white underline text link.
File queued state replaces the dashed area content: 
file icon, filename in white, file size in grey, 
a 4px white progress bar on dark grey track, and a cancel × top-right.
Below the drop area (visible only after a file is queued): 
"Add another file" grey text link centered.

Right column — Config Form:
Frosted glass card, full height, padded.
Title input (labeled, required).
Description textarea (labeled, optional, 3 rows).
Language selector dropdown.
Tags input — type and press enter to create a glass chip below.

A subtle divider line.

"AI PROCESSING" label in grey uppercase 11px.
Six toggle rows — label on left, toggle switch on right:
Transcription, Summary, Keywords, Object Detection, 
Face Detection (with an info icon tooltip about consent), Event Detection.

Another divider.

Visibility selector: three radio pills — Private, Team, Public.

"Start Upload" white-filled button, black text, full width, 44px.
Below it: "Files are encrypted in transit and at rest." in dark grey 11px centered.


PAGE 8 — WATCHLIST AND FAVOURITES
Inline sub-tabs at the top: Watchlist | Favourites. 
Underline tab style. Active: white. Inactive: grey.

Watchlist tab:
Top controls: "Play All" ghost button left, 
sort dropdown center, "Clear Completed" grey text link right.
Auto-remove toggle pill top-right: "Auto-remove on complete".

List of items — no grid, ordered list because sequence matters.
Each row is a frosted glass card, 64px tall, full width, 8px gap between rows.
Left: a drag handle icon in dark grey for reordering.
Then: a small thumbnail (80x45px, rounded).
Then: title in white 14px, type badge glass pill, progress pill 
("45% watched" or "Unread" or "Page 12 of 40").
Right: resume timestamp in grey 12px.
Far right: remove × icon, ghost, visible on hover.

Favourites tab:
Four-column grid. Same media cards as the Library page.
Top controls: sort dropdown and "Group by Collection" toggle.
When grouped: items appear under collection name headers 
in white 14px with a "Share Collection" ghost button on the right of each header.


PAGE 9 — SETTINGS
Two-column layout. Left: 220px nav panel. Right: fluid content pane.

Left nav panel — neumorphic raised card, full height:
Navigation items with icon and label, 44px row height each.
Items: Profile, Appearance, Notifications, AI Preferences, Storage, 
API Access, Team and Sharing, Integrations, Billing, Data and Privacy.
Active item: white text, 2px white left border.
Inactive: grey text.

Right content pane — 40px padding:
Section title in white 20px and description in grey 14px at top of each pane.

Profile pane: avatar upload circle (neumorphic inset), 
name input, email (read-only with verified badge), 
timezone selector, language selector, password change section, save button.

Appearance pane: 
Theme selector — three neumorphic raised radio cards (Dark, Light, System).
Glass intensity slider — Low to High, with a live preview card to the right.
Font size segmented control — Small, Medium, Large, X-Large.
Reduce Motion toggle row.
Sidebar default state toggle.
Save and Reset buttons.

Notifications pane: toggle rows per event type 
(Upload complete, Processing done, Share received, Failed processing).
Email and in-app columns.

AI Preferences pane: 
Default transcript language selector.
Default summary length selector (Short, Medium, Detailed).
Auto-run modules toggle — on by default for new uploads.
Per-module toggles matching the Upload Detail page.

Storage pane: 
Visual storage breakdown bar (neumorphic track, white fill segmented by type).
Total used vs limit in large white text.
Connected cloud drives list with connect/disconnect buttons.
"Clear processed cache" ghost button.

API Access pane: 
Generated key rows with copy icon and revoke link.
"Generate new key" ghost button.
Usage meter per key.

Team and Sharing pane: 
Member list with avatar, name, role dropdown, remove link.
"Invite member" row with email input and Send Invite button.

Save button is white-filled, right-aligned, bottom of every pane.
Destructive actions always appear last in their section in grey text.


COMPONENT RULES THAT APPLY EVERYWHERE

Buttons:
Primary — white fill, black text, radius 10px, 44px height.
Ghost — no fill, 1px white border at low opacity, white text, same radius and height.
Text link — no border, no fill, grey or white text, underline on hover only.
Destructive — ghost style but border and text are muted grey, never red.
All buttons have a subtle scale-down on press (0.97).

Inputs:
Neumorphic inset. Dark surface background. Hairline white border on focus only.
Label above in grey 12px uppercase. Helper text below in grey 11px.
Error state: border brightens to white, error message below in grey (not red).

Cards:
Neumorphic raised for structural content (stat cards, section containers).
Frosted glass for floating, overlaid, or panel content.
Never mix — one card is one type.

Modals and Dropdowns:
Always frosted glass. Centered on page with a dark overlay behind.
Radius 16px. Padding 24px. Shadow is strong.

Status indicators:
Ready: solid white dot.
Processing: white dot with a slow pulse animation.
Failed: grey dot, no animation.
Never use color for status.

Skeleton loaders:
Same shape as the element they replace.
Animated shimmer from #1A1A1A to #222222 and back.
Used on every card and list during loading states.

Empty states:
Every page and tab has a designed empty state.
Centered: a Lucide icon in grey, a short white label, a grey description, 
and one CTA button (ghost style). Never leave a blank white space.