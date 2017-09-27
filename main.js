(function () {
  /**
   * Dispatcher
  */
  class Dispatcher {
    constructor() {
      // bind methods
      this.register = this.register.bind(this);
      this.dispatch = this.dispatch.bind(this);

      // setup instance props
      this._callbacks = {};
    }

    dispatch(action) {
      for (let token in this._callbacks) {
        this._callbacks[token](action);
      }
    }

    register(callback) {
      const callbacks = Object.keys(this._callbacks);
      const token = `DISPATCHER_${callbacks.length + 1}`; // DISPATCHER_1
      this._callbacks[token] = callback;
    }
  }

  const dispatcher = new Dispatcher();



  /**
   * Store
  */
  class Store {
    constructor() {
      // bind methods
      this.handleDispatch = this.handleDispatch.bind(this);
      dispatcher.register(this.handleDispatch);
    }

    handleDispatch(action) {
      console.log(`%c${action.type} new state:`, 'color:aqua', action);
    }
  }

  const store = new Store();


  /**
   * Init App
  */
  // debugger;
    dispatcher.dispatch({
      type: 'FETCH_POSTS_REQUEST'
    });

    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function(resp, err) {
      if (err) {
        throw new Error(err);
      }
      return resp.json();
    })
    .then(function(json) {
      // debugger;
      dispatcher.dispatch({
        type: 'FETCH_POSTS_SUCCESS',
        posts: json,
      });
    })
    .catch(function(e) {
      console.error(e)
    });
}());
