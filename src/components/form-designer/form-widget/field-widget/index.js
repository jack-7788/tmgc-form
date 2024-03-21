const comps = {};

const modules = import.meta.glob('./*.vue', { eager: true });

console.log('modules:1 ', modules);
for (const path in modules) {
  const cname = modules[path].default.name;
  comps[cname] = modules[path].default;
}

export default comps;
