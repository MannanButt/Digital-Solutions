import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Digital Solutions homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Digital Solutions \| AI Workflow Automation<\/title>/i);
  assert.match(html, /AI Workflow/);
  assert.match(html, /Automation/);
  assert.match(html, /Smart Solutions\./);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("keeps the five-photo hero and focused redesign assets", async () => {
  const [home, homeContent, page, layout, css] = await Promise.all([
    readFile(new URL("../frontend/src/features/home/components/HomePage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../frontend/src/features/home/data/content.ts", import.meta.url), "utf8"),
    readFile(new URL("../frontend/app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../frontend/app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../frontend/src/features/home/styles/home.css", import.meta.url), "utf8"),
  ]);

  for (const image of [
    "hero-workflow.jpg",
    "hero-agents.jpg",
    "hero-process.jpg",
    "hero-integrations.jpg",
    "hero-customer.jpg",
  ]) {
    assert.match(`${home}\n${homeContent}`, new RegExp(image.replace(".", "\\.")));
  }

  assert.match(page, /<HomePage \/>/);
  assert.match(layout, /features\/home\/styles\/home\.css/);
  assert.match(layout, /Nunito_Sans/);
  assert.match(layout, /Roboto/);
  assert.match(css, /\.vx-frame/);
  assert.match(css, /\.vx-deck/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});
