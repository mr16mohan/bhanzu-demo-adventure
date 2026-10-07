# Multi-channel demo journey

## What will change
- Keep the existing schedule confirmation details, replace the WhatsApp button with:
  - “Start First Mission” linking directly to the existing mission intro.
  - Supporting copy confirming delivery through WhatsApp, Email, and SMS.
  - A separate “Continue” action leading to channel preference.
- Add a channel preference screen with equally prominent WhatsApp, Email, SMS, and “Skip, send to all” choices.
- Add a phone home screen with WhatsApp, Messages, and Mail icons plus notification badges.
- Preserve the current WhatsApp experience and add lightweight native-looking SMS and email views using shared message content.
- Send critical booking, invitation, and reminder messages to all channel views.
- Deliver completed-mission appreciation to the preferred channel, defaulting to SMS when skipped.
- Deliver recurring daily puzzle links to the preferred channel, defaulting to WhatsApp when skipped.
- Add the requested channel caption to the existing mission intro without otherwise changing the game journey.
- Make mobile presentation resemble a real phone browser and installed apps; retain the existing Mobile / Tablet switch.

## Journey
```text
Schedule confirmation
  ├─ Start First Mission ───────────────> Existing mission intro
  └─ Continue -> Channel preference -> Phone home
                                      ├─ WhatsApp
                                      ├─ Messages
                                      └─ Mail
                                           └─ Mission links -> Existing mission intro
```

## Technical details
- Add `preferredChannel` and channel-aware delivered messages to shared demo state.
- Keep mission naming and celebration wording in shared helpers so every channel stays synchronized.
- Create separate routes for channel preference, phone home, SMS, and email, each with unique page metadata.
- Keep `/game`, `/win`, `/app/roadmap`, and Progress presentation untouched; only adjust the existing win action’s delivery destination logic.
- Add focused tests for channel defaults, critical-message visibility, and the updated schedule actions.
