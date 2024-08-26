# How I Built it

- **FabricJs** -  A Canvas Library for easy implementation of canvas Movable Canvas Elements 
- For reference <a href="https://fabricjs.com/">FabricJs Site</a>

- **UUID** -  A Js Library for generating unique IDs for all elements(Lot fo canvas and User needs unique IDs) 
- For reference <a href="https://www.npmjs.com/package/uuid">UUID (Unique Ids)</a>

- **Liveblocks** -  For Collaborative working(Multiple devs working on same App) ans *sharing* / *commenting* / *Reacting* etc. 
- For reference <a href="https://liveblocks.io/">Liveblocks (Collaborative Working)</a>

**!** -> In typescript it ignore if the variable exist or not
- Used in the  public Key While Creating Client For LiveBLock (Collaborative Features) *to ensure use of env varibales*

# Commands For Setup :

```
npm install fabric uuid
```

```
npm i @liveblocks/client @liveblocks/react
```

### Initialize the `liveblocks.config.ts` file

```
npx create-liveblocks-app@latest --init --framework react
```

## Setting Up Main Collaborative Frontend 

- Start by using get started and setup up and Wrap up the app within the Room(Collaborative) 
- <a href="https://liveblocks.io/docs/get-started/nextjs">Getting Started : Setup Nextjs</a>

- ## Now our default Page is a Collaborative Page and Will Show how many people have Joined


# For The UI Library we are using Shadcn/ui
- <a href="">Installation Shadcn/ui for NextJs</a>

```
npx shadcn-ui@latest init
```

## Now copy pre-written tailwind.Config 

<details>
<summary><code>tailwind.config.ts</code></summary>

```typescript
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          black: "#14181F",
          green: "#56FFA6",
          grey: {
            100: "#2B303B",
            200: "#202731",
            300: "#C4D3ED",
          },
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
```

</details>

<details>
<summary><code>app/globals.css</code></summary>

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import "@liveblocks/react-comments/styles.css";

* {
  font-family:
    work sans,
    sans-serif;
}

@layer utilities {
  .no-ring {
    @apply outline-none ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 !important;
  }

  .input-ring {
    @apply h-8 rounded-none border-none  bg-transparent outline-none ring-offset-0 focus:ring-1  focus:ring-primary-green focus:ring-offset-0 focus-visible:ring-offset-0 !important;
  }

  .right-menu-content {
    @apply flex w-80 flex-col gap-y-1 border-none bg-primary-black py-4 text-white !important;
  }

  .right-menu-item {
    @apply flex justify-between px-3 py-2 hover:bg-primary-grey-200 !important;
  }
}
```

</details>

## Now Install `@liveblocks/react-comments` for implementing react  by commenting for collaborative page

```
npm install @liveblocks/react-comments
```

## Now Grab all the assets for this Projects
- Includes *type Declarations*, *constants values*, *events and Custo Hooks For Canvas*, *Image Assets* and *LiveBlock Config*
- <a href="https://drive.google.com/file/d/17tRs0sEiIsCeTYEXhWEdHMrTshuz2oYf/view?usp=sharing">Get assets Zip Here</a>


## Now we create cursors for every Users there

`Components/Cursor/Cursor.tsx`
- It container the base component for a cursor for all the collaborating people 

`Components/Cursor/LiveCursors.tsx`
- This will contain/render all the people's cursor using Cursor.tsx

`Components/Cursor/CursorChat.tsx`
- This will contains the Chat messages from different users(Cursors)