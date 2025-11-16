export function description(meta) {
  const developer = meta.process.developer;

  let text = [
    `${meta.filmStock} (${meta.exposureIndex})`,
    meta.camera.join(" "),
    Array.isArray(meta.lens) ? meta.lens.join(" ") : meta.lens,
    `${developer.name} (${developer.dilution}, ${developer.time}, ${developer.t}°C)`,
    meta.process.processor ? `Processed with ${meta.process.processor}` : null,
    "Scanned with Nikon Z 7",
    "CS-Lite+ SpectraCOLOR",
    "Inverted with CS Negative+ Convert Tools v1.2",
  ];

  text = text.filter((x) => !!x);

  return text.join("\n") + "\n";
}
