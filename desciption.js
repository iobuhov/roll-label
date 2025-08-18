export function description(meta) {
  const developer = meta.process.developer;

  const text = [
    `${meta.filmStock} (${meta.exposureIndex})`,
    meta.camera.join(" "),
    meta.lens.join(" "),
    `${developer.name} (${developer.dilution}, ${developer.time}, ${developer.t}°C)`,
    "Scanned with Nikon Z 7",
    "Inverted with CS Negative+ Convert Tools v1.2",
  ];

  return text.join("\n") + "\n";
}
