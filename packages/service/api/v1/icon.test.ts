import assert from "node:assert/strict";
import { test } from "node:test";
import etag from "etag";
import handler from "./icon.ts";

type MockResponse = {
  headers: Record<string, string>;
  statusCode: number;
  body: string | undefined;
  setHeader(name: string, value: string): MockResponse;
  status(code: number): MockResponse;
  send(body: string): MockResponse;
  end(): MockResponse;
};

function response(): MockResponse {
  return {
    headers: {},
    statusCode: 200,
    body: undefined,
    setHeader(name, value) {
      this.headers[name.toLowerCase()] = value;
      return this;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    send(body) {
      this.body = body;
      return this;
    },
    end() {
      return this;
    },
  };
}

test("lists collection icons and responds with a stable ETag", async () => {
  const res = response();
  await handler({ headers: {}, query: { pack: "mdi" } } as never, res as never);

  assert.equal(res.statusCode, 200);
  assert.equal(res.headers["content-type"], "application/json");
  assert.ok(JSON.parse(res.body ?? "").includes("home"));
  assert.equal(res.headers.etag, etag(res.body ?? ""));

  const cached = response();
  await handler(
    { headers: { "if-none-match": res.headers.etag }, query: { pack: "mdi" } } as never,
    cached as never,
  );
  assert.equal(cached.statusCode, 304);
});

test("renders an icon alias as an SVG document", async () => {
  const res = response();
  await handler(
    { headers: {}, query: { pack: "mdi", name: "home-outline" } } as never,
    res as never,
  );

  assert.equal(res.statusCode, 200);
  assert.equal(res.headers["content-type"], "image/svg+xml");
  assert.match(res.body ?? "", /^<svg\b/);
  assert.match(res.body ?? "", /<path\b/);
});

test("returns 404 for an unknown collection and an unknown icon", async () => {
  const missingCollection = response();
  await handler(
    { headers: {}, query: { pack: "definitely-not-an-icon-set" } } as never,
    missingCollection as never,
  );
  assert.equal(missingCollection.statusCode, 404);

  const missingIcon = response();
  await handler(
    { headers: {}, query: { pack: "mdi", name: "definitely-not-an-icon" } } as never,
    missingIcon as never,
  );
  assert.equal(missingIcon.statusCode, 404);
});
