import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import { fromResource } from 'mobx-utils';


function meteorResource(handle, target) {

  let _computation;

  let fetch = (data)=> {
    if (data instanceof Mongo.Cursor) {
      return data.fetch();
    }

    return data;
  }

  return fromResource(
    (sink)=> {
      sink(fetch(handle.apply(target)))
      _computation = Tracker.autorun((c)=> {
        sink(fetch(handle.apply(target)))
      })

    },
    ()=> {
      if (_computation) {
        _computation.stop();
      }
    },
    fetch(handle.apply(target))
  )

}


function meteorData(target, name, descriptor) {

  let getter = descriptor.get, setter = descriptor.set;
  if (setter != undefined) {
    throw new Error("@meteorData does not support set modifier.")
  }

  let newGetter = ()=> {
    return meteorResource(getter, target).current();
  }

  descriptor.get = newGetter;

  return descriptor;
}

export { meteorData };
