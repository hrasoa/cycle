# Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`

### Bootstrap

Used `nextjs`. This is my go-to framework when I need to quickly setup a react project.

### Data and schemas

All the data and schemas are in `./pages/api/`.
Boards share the same `initial mocks`, so a doc added in a pre-defined group will be also displayed on an other board.
New group will be added normally on the current board.

### Local state

I used apollojs built-in local state. In instance the collapsed state of the sidebar is defined in `./cache` as reactive variable, and setup in the AppolloClient (`./pages/_app.tsx`).

### Theming

Even thow it was a nice to have, I can't work without a theme. Related files are located in `./styled.d.ts` and `./theme.js`. The tokens were inspired by [stitches](https://stitches.dev/docs/tokens), which also follows https://system-ui.com/theme/ conventions.

### Issues

- You may experience issues when navigating on the board: it can display a not found, even though the it exists in the mocks. It is expected after a hot-reload as I use uuid's. But it can also happen even if no files were changed. A full refresh from the home or another page should fix it.
