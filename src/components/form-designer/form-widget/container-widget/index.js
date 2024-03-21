const modules = import.meta.glob('./*.vue', { eager: true });

export default {
  install(app) {
    console.log('modules:2 ', modules);
    for (const path in modules) {
      const cname = modules[path].default.name;
      app.component(cname, modules[path].default);
    }
  }
};
