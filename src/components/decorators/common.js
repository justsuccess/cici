const logBeforeFn = (target)=>{
    console.log(target.name+" "+"事件触发前")
}
const readonly = (target, name, descriptor) =>{
    console.log(target, name, descriptor)
  descriptor.writable = false;
  return descriptor;
}

const mixin = (...mixins) => (targetClass) => {
  mixins = [targetClass, ...mixins];
  function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
      if (key !== 'constructor'
        && key !== 'prototype'
        && key !== 'name'
      ) {
        let desc = Object.getOwnPropertyDescriptor(source, key);
        Object.defineProperty(target, key, desc);
      }
    }
  }
  class Mixin {
    constructor(...args) {
      for (let mixin of mixins) {
        copyProperties(this, new mixin(...args)); // 拷贝实例属性
      }
    }
  }

  for (let mixin of mixins) {
    copyProperties(Mixin, mixin); // 拷贝静态属性
    copyProperties(Mixin.prototype, mixin.prototype); // 拷贝原型属性
  }
  return Mixin;
}


module.exports={
    logBeforeFn,
    readonly,
    mixin
    
}