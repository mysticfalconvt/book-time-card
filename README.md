# Book Time Card

A Home Assistant custom card that displays literary quotes based on the time of day.

## Installation

### Option 1: HACS Custom Repository (Recommended)

1. Open HACS in your Home Assistant
2. Go to the "Frontend" section
3. Click the three dots menu in the top right
4. Select "Custom repositories"
5. Add this repository URL: `https://github.com/mysticfalconvt/book-clock-card`
6. Select "Lovelace" as the category
7. Click "Add"
8. Find "Book Time Card" in the list and click "Install"

### Option 2: Manual Installation

1. Download the `book-time-card.js` file from the [latest release](https://github.com/mysticfalconvt/book-clock-card/releases/latest)
2. Place the file in your Home Assistant's `www` directory
3. Add the following to your Lovelace resources:
```yaml
resources:
  - url: /local/book-time-card.js
    type: module
```

## Configuration

Add the card to your Lovelace dashboard:

```yaml
type: 'custom:book-time-card'
name: Literature Time
```
