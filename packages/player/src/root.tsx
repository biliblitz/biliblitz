import { Player } from "./components/player";

import "./global.css";

export default () => {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
        <main class="mx-auto mt-8 max-w-4xl">
          <Player video={{ mimetype: "video/mp4", source: "/PV.mp4" }} />
        </main>
      </body>
    </>
  );
};
