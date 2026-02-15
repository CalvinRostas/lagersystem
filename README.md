# Project Setup

## Requirements

- Node v23
- Android Studio with working emulator (only required for production build)

## How to install?

> [!NOTE]  
> Checkout the main branch and pull the latest changes before starting to set the project up.

1. Install all dependencies

```bash
npm i
```

2. After installing the dependencies sync the latest app build

```bash
npm run sync:capacitor
```

3. Start the production build within the emulator

```bash
npm run sim:android
```

OR

4. Start the local development server

```bash
npm run dev
```

```bash
# Cleans the cache on start
npm run dev:clean
```

To visit the local development server go to http://localhost:3000  
All changes you make in the code will be instantly visible.
