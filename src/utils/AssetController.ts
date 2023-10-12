const assetType = {
  image: "images",
  font: "fonts",
  css: "theme"
} as const;

type assetTypes = typeof assetType[keyof typeof assetType];

async function loadAsset(assetName: string, type: assetTypes) {
  const filename = await import('../assets/' + type + '/' + assetName);
  return filename;
}

export { assetType, loadAsset }