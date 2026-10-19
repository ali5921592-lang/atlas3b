import assert from 'node:assert/strict';
import fs from 'node:fs';

function load(file) {
  const data = fs.readFileSync(`dist/models/${file}.glb`);
  assert.equal(data.toString('ascii', 0, 4), 'glTF');
  let offset = 12, json, bin;
  while (offset < data.length) {
    const length = data.readUInt32LE(offset), type = data.readUInt32LE(offset + 4);
    if (type === 0x4e4f534a) json = JSON.parse(data.toString('utf8', offset + 8, offset + 8 + length));
    if (type === 0x004e4942) bin = data.subarray(offset + 8, offset + 8 + length);
    offset += 8 + length;
  }
  return { json, bin };
}

const targets = {
  visceral: ['Kidney.l.001', 'Kidney.r.001'],
  nervous: ['Tympanic membrane.r.001', 'Tympanic membrane.l.001', 'Vestibule.r.001', 'Vestibule.l.001', 'Cochlea.r.001', 'Cochlea.l.001', 'White matter of telencephalon.l.001', 'White matter of telencephalon.r.001'],
  skeleton: ['Malleus.r.001', 'Malleus.l.001', 'Incus.r.001', 'Incus.l.001', 'Stapes.r.001', 'Stapes.l.001']
};

for (const [file, names] of Object.entries(targets)) {
  const { json, bin } = load(file);
  for (const name of names) {
    const node = json.nodes.find(n => n.name === name);
    assert(node?.mesh != null, `${file}: missing ${name}`);
    const mesh = json.meshes[node.mesh], primitive = mesh.primitives[0];
    assert(primitive.attributes.POSITION != null && primitive.attributes.NORMAL != null, `${name}: missing geometry attributes`);
    assert(primitive.indices != null, `${name}: missing triangle indices`);
    assert(!primitive.extensions?.KHR_draco_mesh_compression, `${name}: restricted compressed source geometry remains`);
    const pos = json.accessors[primitive.attributes.POSITION], normal = json.accessors[primitive.attributes.NORMAL], indices = json.accessors[primitive.indices];
    assert(pos?.bufferView != null && normal?.bufferView != null && indices?.bufferView != null, `${name}: geometry must be independently buffered`);
    assert(pos.count >= 300 && normal.count === pos.count && indices.count >= 900, `${name}: geometry is unexpectedly incomplete`);
    for (const accessor of [pos, normal, indices]) {
      const view = json.bufferViews[accessor.bufferView];
      assert(view && (view.byteOffset || 0) + view.byteLength <= json.buffers[0].byteLength, `${name}: invalid buffer range`);
    }
    assert(json.buffers[0].byteLength <= bin.length, `${name}: GLB binary chunk is truncated`);
  }
}

const kidney = load('visceral').json;
assert.deepEqual(kidney.nodes.find(n => n.name === 'Kidney.l.001').translation, [.057, 1.11, -.015]);
assert.deepEqual(kidney.nodes.find(n => n.name === 'Kidney.r.001').translation, [-.053, 1.095, -.006]);
for (const node of load('skeleton').json.nodes.filter(n => /^(Malleus|Incus|Stapes)\.[rl]\./.test(n.name || ''))) {
  assert(node.translation && !node.rotation && !node.scale, `${node.name}: expected independently authored placement`);
}
const notes = fs.readFileSync('dist/models/SOURCE-LICENSE.txt', 'utf8');
assert.match(notes, /shapes and atlas-frame placements are authored/i);
assert.match(notes, /uncertain source mapping/i);
console.log('PASS original kidney, inner-ear, ossicle and telencephalon white-matter GLB geometry is buffered, indexed and no longer the uncertain source geometry');
