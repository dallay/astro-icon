import { loadCollection, locate } from "@iconify/json";
import { getIconData } from "@iconify/utils/lib/icon-set/get-icon";
import { iconToSVG } from "@iconify/utils/lib/svg/build";
import type { VercelApiHandler } from "@vercel/node";
import etag from "etag";

const packAliases = new Map([
  ["logo", "fa-brands"],
  ["radix", "radix-icons"],
]);

type IconCollection = Awaited<ReturnType<typeof loadCollection>>;

const collections = new Map<string, Promise<IconCollection | null>>();

function getCollection(pack: string): Promise<IconCollection | null> {
  let collection = collections.get(pack);
  if (!collection) {
    collection = loadCollection(locate(pack)).catch(() => null);
    collections.set(pack, collection);
  }
  return collection;
}

const handler: VercelApiHandler = async (req, res) => {
  const reqOrigin = req.headers.origin;
  const reqEtag = req.headers["if-none-match"];
  res.setHeader("Access-Control-Allow-Origin", reqOrigin || "*");
  res.setHeader("Cache-Control", "s-maxage=59, stale-while-revalidate=299");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  let { pack, name } = req.query;
  if (!pack) {
    res.status(400).send(`Bad Request: No "pack" query param detected`);
    return;
  }
  if (Array.isArray(pack)) {
    res.status(400).send(`Bad Request: "pack" cannot be passed multiple times`);
    return;
  }
  if (Array.isArray(name)) {
    res.status(400).send(`Bad Request: "name" cannot be passed multiple times`);
    return;
  }
  if (!name && pack.includes(":")) {
    const [prefix, ...parts] = pack.split(":");
    pack = prefix;
    name = parts.join(":");
  }
  if (!pack && name?.includes(":")) {
    const [prefix, ...parts] = name.split(":");
    pack = prefix;
    name = parts.join(":");
  }

  const aliasedPack = packAliases.get(pack);
  if (aliasedPack) {
    pack = aliasedPack;
  }

  const collection = await getCollection(pack);
  if (!collection) {
    collections.delete(pack);
    // TODO: fuzzy match to provide more helpful error?
    res.status(404).send(`Not Found: pack "${pack}"`);
    return;
  }

  if (!name) {
    const body = JSON.stringify(Object.keys(collection.icons));
    res.setHeader("Content-Type", "application/json");
    const resEtag = etag(body);
    if (reqEtag === resEtag) {
      res.status(304).end();
    } else {
      res.setHeader("ETag", resEtag);
      res.status(200).send(body);
    }
    return;
  }

  const data = getIconData(collection, name);
  if (!data) {
    res.status(404).send(`Not Found: "${name}" in pack "${pack}"`);
    return;
  }
  const rendered = iconToSVG(data, { width: null, height: null });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" ${Object.entries(rendered.attributes)
    .map(([attribute, value]) => `${attribute}="${value}"`)
    .join(" ")}>${rendered.body}</svg>`;
  const resEtag = etag(svg);
  if (reqEtag === resEtag) {
    res.status(304).end();
  } else {
    res.setHeader("ETag", resEtag);
    res.setHeader("Content-Type", "image/svg+xml");
    res.status(200).send(svg);
  }
};

export default handler;
