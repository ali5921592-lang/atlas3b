import fs from 'node:fs';
import path from 'node:path';

// First original replacement set: kidneys and selected inner-ear structures.
// Geometry below is authored here from anatomical descriptions and dimensions;
// no source mesh vertices are read or reused.
const outDir = path.resolve('dist/models');

function readGlb(file) {
  const bytes = fs.readFileSync(path.join(outDir, `${file}.glb`));
  if (bytes.toString('ascii', 0, 4) !== 'glTF') throw Error(`${file}: invalid GLB`);
  let offset = 12, json, bin;
  while (offset < bytes.length) {
    const length = bytes.readUInt32LE(offset), type = bytes.readUInt32LE(offset + 4);
    const chunk = bytes.subarray(offset + 8, offset + 8 + length);
    if (type === 0x4e4f534a) json = JSON.parse(chunk.toString('utf8'));
    if (type === 0x004e4942) bin = Buffer.from(chunk);
    offset += 8 + length;
  }
  if (!json || !bin) throw Error(`${file}: missing JSON/BIN chunk`);
  return { json, bin };
}

function vectorMesh(vertices, indices) {
  const normals = new Float32Array(vertices.length);
  for (let i = 0; i < indices.length; i += 3) {
    let ia = indices[i] * 3, ib = indices[i + 1] * 3, ic = indices[i + 2] * 3;
    const ax = vertices[ib] - vertices[ia], ay = vertices[ib + 1] - vertices[ia + 1], az = vertices[ib + 2] - vertices[ia + 2];
    const bx = vertices[ic] - vertices[ia], by = vertices[ic + 1] - vertices[ia + 1], bz = vertices[ic + 2] - vertices[ia + 2];
    let nx = ay * bz - az * by, ny = az * bx - ax * bz, nz = ax * by - ay * bx;
    const cx = (vertices[ia] + vertices[ib] + vertices[ic]) / 3, cy = (vertices[ia + 1] + vertices[ib + 1] + vertices[ic + 1]) / 3, cz = (vertices[ia + 2] + vertices[ib + 2] + vertices[ic + 2]) / 3;
    if (nx * cx + ny * cy + nz * cz < 0) {
      [indices[i + 1], indices[i + 2]] = [indices[i + 2], indices[i + 1]];
      [ib, ic] = [ic, ib]; nx = -nx; ny = -ny; nz = -nz;
    }
    for (const j of [ia, ib, ic]) { normals[j] += nx; normals[j + 1] += ny; normals[j + 2] += nz; }
  }
  for (let i = 0; i < normals.length; i += 3) {
    const d = Math.hypot(normals[i], normals[i + 1], normals[i + 2]) || 1;
    normals[i] /= d; normals[i + 1] /= d; normals[i + 2] /= d;
  }
  return { positions: new Float32Array(vertices), normals, indices: new Uint16Array(indices) };
}

function kidney() {
  const vertices = [], indices = [], rows = 48, columns = 72;
  for (let r = 0; r <= rows; r++) {
    const v = Math.PI * r / rows, y = Math.cos(v);
    for (let c = 0; c <= columns; c++) {
      const u = Math.PI * 2 * c / columns, x = Math.sin(v) * Math.cos(u), z = Math.sin(v) * Math.sin(u);
      // A gently flattened renal bean with a medial hilar indentation.
      const notch = Math.exp(-(((y + .02) / .31) ** 2)) * Math.exp(-((z / .56) ** 2)) * Math.max(0, x);
      const scale = 1 - .43 * notch;
      vertices.push(x * scale * .030, y * .052, z * scale * .021);
    }
  }
  for (let r = 0; r < rows; r++) for (let c = 0; c < columns; c++) {
    const a = r * (columns + 1) + c, b = a + columns + 1;
    indices.push(a, b, a + 1, a + 1, b, b + 1);
  }
  return vectorMesh(vertices, indices);
}

function ellipsoid(rx, ry, rz, segments = 32, rings = 20) {
  const vertices = [], indices = [];
  for (let r = 0; r <= rings; r++) {
    const v = Math.PI * r / rings;
    for (let c = 0; c <= segments; c++) {
      const u = Math.PI * 2 * c / segments;
      vertices.push(rx * Math.sin(v) * Math.cos(u), ry * Math.cos(v), rz * Math.sin(v) * Math.sin(u));
    }
  }
  for (let r = 0; r < rings; r++) for (let c = 0; c < segments; c++) {
    const a = r * (segments + 1) + c, b = a + segments + 1;
    indices.push(a, a + 1, b, a + 1, b + 1, b);
  }
  return vectorMesh(vertices, indices);
}

function tympanicMembrane() {
  const vertices = [], indices = [], rings = 10, segments = 48;
  for (let r = 0; r <= rings; r++) {
    const q = r / rings;
    for (let c = 0; c <= segments; c++) {
      const a = 2 * Math.PI * c / segments;
      vertices.push(.00035 * q * q, .0072 * q * Math.cos(a), .0055 * q * Math.sin(a));
    }
  }
  for (let r = 0; r < rings; r++) for (let c = 0; c < segments; c++) {
    const a = r * (segments + 1) + c, b = a + segments + 1;
    indices.push(a, b, a + 1, a + 1, b, b + 1);
  }
  return vectorMesh(vertices, indices);
}

function cochlea() {
  const vertices = [], indices = [], steps = 180, sides = 12, turns = 2.35;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps, angle = 2 * Math.PI * turns * t;
    const orbit = .0005 + .0062 * t;
    const cx = orbit * Math.cos(angle), cz = orbit * Math.sin(angle), cy = (t - .5) * .0025;
    const tangent = [-Math.sin(angle), .06, Math.cos(angle)];
    const tl = Math.hypot(...tangent); tangent.forEach((_, j) => tangent[j] /= tl);
    const n = [Math.cos(angle), 0, Math.sin(angle)], b = [tangent[1] * n[2] - tangent[2] * n[1], tangent[2] * n[0] - tangent[0] * n[2], tangent[0] * n[1] - tangent[1] * n[0]];
    const radius = .00165 * (1 - .64 * t);
    for (let s = 0; s <= sides; s++) {
      const a = 2 * Math.PI * s / sides, co = Math.cos(a) * radius, si = Math.sin(a) * radius;
      vertices.push(cx + n[0] * co + b[0] * si, cy + n[1] * co + b[1] * si, cz + n[2] * co + b[2] * si);
    }
  }
  for (let i = 0; i < steps; i++) for (let s = 0; s < sides; s++) {
    const a = i * (sides + 1) + s, b = a + sides + 1;
    indices.push(a, b, a + 1, a + 1, b, b + 1);
  }
  return vectorMesh(vertices, indices);
}

function telencephalonWhiteMatter() {
  const vertices = [], indices = [], rows = 56, columns = 80;
  for (let r = 0; r <= rows; r++) {
    const v = Math.PI * r / rows;
    for (let c = 0; c <= columns; c++) {
      const u = Math.PI * 2 * c / columns;
      const x = Math.sin(v) * Math.cos(u), y = Math.cos(v), z = Math.sin(v) * Math.sin(u);
      const folds = 1 + .035 * Math.sin(7 * u + 2.2 * v) * Math.sin(5 * v) + .018 * Math.sin(11 * u - 3 * v) * Math.sin(3 * v);
      vertices.push(x * .031 * folds, y * .054 * folds, z * .081 * folds);
    }
  }
  for (let r = 0; r < rows; r++) for (let c = 0; c < columns; c++) {
    const a = r * (columns + 1) + c, b = a + columns + 1;
    indices.push(a, b, a + 1, a + 1, b, b + 1);
  }
  return vectorMesh(vertices, indices);
}

function beam(start, end, radius, sides = 12) {
  const axis = end.map((v, i) => v - start[i]), length = Math.hypot(...axis);
  axis.forEach((_, i) => axis[i] /= length || 1);
  const ref = Math.abs(axis[1]) < .9 ? [0, 1, 0] : [1, 0, 0];
  const u = [axis[1] * ref[2] - axis[2] * ref[1], axis[2] * ref[0] - axis[0] * ref[2], axis[0] * ref[1] - axis[1] * ref[0]];
  const ul = Math.hypot(...u); u.forEach((_, i) => u[i] /= ul || 1);
  const v = [axis[1] * u[2] - axis[2] * u[1], axis[2] * u[0] - axis[0] * u[2], axis[0] * u[1] - axis[1] * u[0]];
  const verts = [], ids = [], rows = 8;
  for (let r = 0; r <= rows; r++) for (let s = 0; s <= sides; s++) {
    const a = Math.PI * 2 * s / sides, t = r / rows;
    verts.push(...start.map((p, i) => p + axis[i] * length * t + radius * (Math.cos(a) * u[i] + Math.sin(a) * v[i])));
  }
  for (let r = 0; r < rows; r++) for (let s = 0; s < sides; s++) {
    const a = r * (sides + 1) + s, b = a + sides + 1;
    ids.push(a, b, a + 1, a + 1, b, b + 1);
  }
  return vectorMesh(verts, ids);
}

function mergeMeshes(...parts) {
  const vertices = [], indices = [];
  for (const part of parts) {
    const offset = vertices.length / 3;
    vertices.push(...part.positions);
    for (const index of part.indices) indices.push(index + offset);
  }
  return vectorMesh(vertices, indices);
}

function ossicle(name) {
  const bone = (x, y, z, rx, ry, rz) => {
    const shape = ellipsoid(rx, ry, rz, 16, 10);
    for (let i = 0; i < shape.positions.length; i += 3) { shape.positions[i] += x; shape.positions[i + 1] += y; shape.positions[i + 2] += z; }
    return shape;
  };
  const strut = (a, b, r) => beam(a, b, r, 10);
  if (/^Malleus/i.test(name)) return mergeMeshes(
    bone(0, .0017, 0, .00135, .0012, .00115), bone(-.00025, .00065, 0, .00082, .00075, .0008),
    strut([-.0001, .0008, 0], [-.0008, -.0028, .00015], .00038),
    strut([-.0001, .0009, 0], [.00125, .0018, 0], .00036)
  );
  if (/^Incus/i.test(name)) return mergeMeshes(
    bone(0, .0014, 0, .00125, .00105, .0011), bone(-.0001, .00055, 0, .0008, .00065, .00075),
    strut([.0001, .0004, 0], [.00115, -.0022, .0002], .00036),
    strut([-.0002, .0005, -.0001], [-.00145, -.00125, -.00035], .00034)
  );
  if (/^Stapes/i.test(name)) return mergeMeshes(
    bone(0, -.00125, 0, .00145, .0004, .00105), bone(0, .00115, 0, .00075, .0006, .00072),
    strut([-.00115, -.001, 0], [-.00055, .00075, 0], .00024),
    strut([.00115, -.001, 0], [.00055, .00075, 0], .00024)
  );
  throw Error(`No original ossicle geometry authored for ${name}`);
}

function meshFor(name) {
  if (/^Kidney\./i.test(name)) return kidney();
  if (/^Tympanic membrane\./i.test(name)) return tympanicMembrane();
  if (/^Vestibule\./i.test(name)) return ellipsoid(.0052, .0087, .0058);
  if (/^Cochlea\./i.test(name)) return cochlea();
  if (/^White matter of telencephalon\./i.test(name)) return telencephalonWhiteMatter();
  if (/^(Malleus|Incus|Stapes)\./i.test(name)) return ossicle(name);
  throw Error(`No original geometry authored for ${name}`);
}

function authoredTransform(name) {
  if (/^Kidney\.l/i.test(name)) return { translation: [.057, 1.11, -.015] };
  if (/^Kidney\.r/i.test(name)) return { translation: [-.053, 1.095, -.006] };
  if (/^White matter of telencephalon\.l/i.test(name)) return { translation: [.031, 1.64, -.016] };
  if (/^White matter of telencephalon\.r/i.test(name)) return { translation: [-.031, 1.64, -.016] };
  const positions = {
    'Malleus.r.001': [-.048, 1.582, -.004], 'Malleus.l.001': [.048, 1.582, -.004],
    'Incus.r.001': [-.047, 1.582, -.006], 'Incus.l.001': [.047, 1.582, -.006],
    'Stapes.r.001': [-.043, 1.581, -.005], 'Stapes.l.001': [.043, 1.581, -.005]
  };
  if (positions[name]) return { translation: positions[name] };
  if (/\.l\./i.test(name)) return { translation: [.04, 1.581, -.004] };
  return { translation: [-.04, 1.581, -.004] };
}

function replaceMeshes(file, targets) {
  const { json, bin } = readGlb(file), oldViews = json.bufferViews || [], oldAccessors = json.accessors || [];
  const replaced = new Map();
  for (const [nodeName, typeName] of targets) {
    const node = json.nodes.find(n => n.name === nodeName);
    if (!node || node.mesh == null) throw Error(`${file}: node not found: ${nodeName}`);
    Object.assign(node, authoredTransform(nodeName));
    delete node.rotation; delete node.scale;
    const oldMesh = json.meshes[node.mesh];
    const oldPrimitive = oldMesh.primitives[0];
    const mesh = meshFor(typeName);
    replaced.set(node.mesh, { mesh, material: oldPrimitive.material, name: typeName });
  }

  // Collect retained accessors and bufferViews from the active glTF graph.
  const accessorRefs = new Set();
  for (const [meshIndex, mesh] of json.meshes.entries()) {
    const newShape = replaced.get(meshIndex);
    if (newShape) continue;
    for (const p of mesh.primitives || []) {
      Object.values(p.attributes || {}).forEach(i => accessorRefs.add(i));
      if (p.indices != null) accessorRefs.add(p.indices);
      (p.targets || []).forEach(t => Object.values(t).forEach(i => accessorRefs.add(i)));
    }
  }
  for (const skin of json.skins || []) if (skin.inverseBindMatrices != null) accessorRefs.add(skin.inverseBindMatrices);
  for (const anim of json.animations || []) for (const sampler of anim.samplers || []) { accessorRefs.add(sampler.input); accessorRefs.add(sampler.output); }
  const viewRefs = new Set();
  for (const index of accessorRefs) {
    const a = oldAccessors[index]; if (a?.bufferView != null) viewRefs.add(a.bufferView);
    if (a?.sparse) { if (a.sparse.indices?.bufferView != null) viewRefs.add(a.sparse.indices.bufferView); if (a.sparse.values?.bufferView != null) viewRefs.add(a.sparse.values.bufferView); }
  }
  for (const [meshIndex, mesh] of json.meshes.entries()) if (!replaced.has(meshIndex)) {
    for (const p of mesh.primitives || []) for (const ext of Object.values(p.extensions || {})) if (ext?.bufferView != null) viewRefs.add(ext.bufferView);
  }
  for (const image of json.images || []) if (image.bufferView != null) viewRefs.add(image.bufferView);

  const newBin = [], viewMap = new Map(), accessorMap = new Map();
  function appendBytes(bytes, alignment = 4) {
    let total = newBin.reduce((n, b) => n + b.length, 0), pad = (alignment - total % alignment) % alignment;
    if (pad) newBin.push(Buffer.alloc(pad));
    const start = newBin.reduce((n, b) => n + b.length, 0); newBin.push(Buffer.from(bytes)); return start;
  }
  const newViews = [];
  for (const oldIndex of [...viewRefs].sort((a, b) => a - b)) {
    const v = oldViews[oldIndex], start = v.byteOffset || 0, data = bin.subarray(start, start + v.byteLength);
    const byteOffset = appendBytes(data, 4), nv = { ...v, buffer: 0, byteOffset };
    delete nv.name; viewMap.set(oldIndex, newViews.length); newViews.push(nv);
  }
  const newAccessors = [];
  for (const oldIndex of [...accessorRefs].sort((a, b) => a - b)) {
    const a = { ...oldAccessors[oldIndex] };
    if (a.bufferView != null) a.bufferView = viewMap.get(a.bufferView);
    if (a.sparse) a.sparse = { ...a.sparse, indices: { ...a.sparse.indices, bufferView: viewMap.get(a.sparse.indices.bufferView) }, values: { ...a.sparse.values, bufferView: viewMap.get(a.sparse.values.bufferView) } };
    accessorMap.set(oldIndex, newAccessors.length); newAccessors.push(a);
  }
  for (const skin of json.skins || []) if (skin.inverseBindMatrices != null) skin.inverseBindMatrices = accessorMap.get(skin.inverseBindMatrices);
  for (const anim of json.animations || []) for (const sampler of anim.samplers || []) { sampler.input = accessorMap.get(sampler.input); sampler.output = accessorMap.get(sampler.output); }

  for (const v of json.images || []) if (v.bufferView != null) v.bufferView = viewMap.get(v.bufferView);
  for (const [meshIndex, mesh] of json.meshes.entries()) {
    const shape = replaced.get(meshIndex);
    if (shape) {
      const attrs = {};
      for (const [semantic, data, componentType, type, count, min, max] of [
        ['POSITION', shape.mesh.positions, 5126, 'VEC3', shape.mesh.positions.length / 3, bounds(shape.mesh.positions, 3, false), bounds(shape.mesh.positions, 3, true)],
        ['NORMAL', shape.mesh.normals, 5126, 'VEC3', shape.mesh.normals.length / 3],
        ['INDICES', shape.mesh.indices, 5123, 'SCALAR', shape.mesh.indices.length]
      ]) {
        const start = appendBytes(Buffer.from(data.buffer, data.byteOffset, data.byteLength), componentType === 5123 ? 2 : 4);
        const bv = newViews.length; newViews.push({ buffer: 0, byteOffset: start, byteLength: data.byteLength, target: semantic === 'INDICES' ? 34963 : 34962 });
        const accessor = { bufferView: bv, componentType, count, type };
        if (min) accessor.min = min; if (max) accessor.max = max;
        const ai = newAccessors.length; newAccessors.push(accessor);
        if (semantic !== 'INDICES') attrs[semantic] = ai; else shape.indices = ai;
      }
      json.meshes[meshIndex] = { ...mesh, primitives: [{ attributes: attrs, indices: shape.indices, material: shape.material, mode: 4 }] };
    } else {
      for (const p of mesh.primitives || []) {
        for (const key of Object.keys(p.attributes || {})) p.attributes[key] = accessorMap.get(p.attributes[key]);
        if (p.indices != null) p.indices = accessorMap.get(p.indices);
        (p.targets || []).forEach(t => Object.keys(t).forEach(k => t[k] = accessorMap.get(t[k])));
        for (const ext of Object.values(p.extensions || {})) if (ext?.bufferView != null) ext.bufferView = viewMap.get(ext.bufferView);
      }
    }
  }
  json.accessors = newAccessors; json.bufferViews = newViews;
  json.buffers[0].byteLength = newBin.reduce((n, b) => n + b.length, 0);
  const binOut = Buffer.concat(newBin); const jsonOut = Buffer.from(JSON.stringify(json));
  const jsonPad = (4 - jsonOut.length % 4) % 4, binPad = (4 - binOut.length % 4) % 4;
  const jchunk = Buffer.concat([jsonOut, Buffer.alloc(jsonPad, 0x20)]), bchunk = Buffer.concat([binOut, Buffer.alloc(binPad)]);
  const result = Buffer.alloc(12 + 8 + jchunk.length + 8 + bchunk.length);
  result.write('glTF', 0); result.writeUInt32LE(2, 4); result.writeUInt32LE(result.length, 8);
  result.writeUInt32LE(jchunk.length, 12); result.writeUInt32LE(0x4e4f534a, 16); jchunk.copy(result, 20);
  const bstart = 20 + jchunk.length; result.writeUInt32LE(bchunk.length, bstart); result.writeUInt32LE(0x004e4942, bstart + 4); bchunk.copy(result, bstart + 8);
  fs.writeFileSync(path.join(outDir, `${file}.glb`), result);
  console.log(`${file}: replaced ${replaced.size} structures with authored geometry and transforms; ${oldViews.length - [...viewRefs].length} old/unused geometry buffers removed`);
}

function bounds(data, size, max) {
  const out = Array(size).fill(max ? -Infinity : Infinity);
  for (let i = 0; i < data.length; i++) { const c = i % size; out[c] = max ? Math.max(out[c], data[i]) : Math.min(out[c], data[i]); }
  return out;
}

replaceMeshes('visceral', [['Kidney.l.001', 'Kidney.l.001'], ['Kidney.r.001', 'Kidney.r.001']]);
replaceMeshes('nervous', [
  ['Tympanic membrane.r.001', 'Tympanic membrane.r.001'], ['Tympanic membrane.l.001', 'Tympanic membrane.l.001'],
  ['Vestibule.r.001', 'Vestibule.r.001'], ['Vestibule.l.001', 'Vestibule.l.001'],
  ['Cochlea.r.001', 'Cochlea.r.001'], ['Cochlea.l.001', 'Cochlea.l.001']
]);
replaceMeshes('skeleton', [
  ['Malleus.r.001', 'Malleus.r.001'], ['Malleus.l.001', 'Malleus.l.001'],
  ['Incus.r.001', 'Incus.r.001'], ['Incus.l.001', 'Incus.l.001'],
  ['Stapes.r.001', 'Stapes.r.001'], ['Stapes.l.001', 'Stapes.l.001']
]);
replaceMeshes('nervous', [
  ['White matter of telencephalon.l.001', 'White matter of telencephalon.l.001'],
  ['White matter of telencephalon.r.001', 'White matter of telencephalon.r.001']
]);
