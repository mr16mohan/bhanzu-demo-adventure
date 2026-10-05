# Requested demo refinements

## What will change
- Add a Mobile / Tablet segmented switch above the game after “Play the mission,” defaulting to a centered mobile-sized game view. Switching to Tablet will widen the game view, and switching back will restore mobile.
- Show the hand cursor on buttons, links, and other clickable controls throughout the experience.
- Change the schedule benefit from “45-minute live session” to “60-minute live session.”
- Derive the current mission name from progress so the intro reads “Ready for your first/second/etc. mission?”
- After each completed mission, add a WhatsApp celebration using that mission’s dynamic name and varied encouraging copy.

## Technical details
- Keep the existing routes and journey unchanged.
- Store only the selected game viewport locally in the game layout; Mobile remains the initial choice.
- Use shared ordinal/celebration helpers so the intro and WhatsApp message always match mission progress.
- Add focused tests for the 60-minute duration and dynamic mission wording, then verify the journey in mobile and tablet modes.
