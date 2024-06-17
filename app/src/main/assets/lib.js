// kotlin evaluateJavaScript throws reference when file is a module
window.AndroidAsyncCallbackManager = class {
  static callbacks = {}
  static id = 0

  static register(fn) {
    return (...args) => {
      this.id += 1

      return new Promise((resolve, reject) => {
        this.callbacks[this.id] = { resolve, reject }

        fn(
          ...args,
          `AndroidAsyncCallbackManager.resolve('${this.id}')`,
          `AndroidAsyncCallbackManager.reject('${this.id}')`,
        )
      })
    }
  }

  static resolve(id) {
    const cb = this.callbacks[id]?.resolve
    delete this.callbacks[id]
    return cb
  }

  static reject(id) {
    const cb = this.callbacks[id]?.reject
    delete this.callbacks[id]
    return cb
  }
}

// Bridge name - AndroidInterface

window.Android = {}

window.Android.toast = function (content) {
  AndroidInterface.toast(content)
}

window.Android.exampleAsyncApi = AndroidAsyncCallbackManager.register(
  AndroidInterface.exampleAsyncApi.bind(AndroidInterface),
)
