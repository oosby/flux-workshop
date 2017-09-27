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
      const token = `DISPATCHER_${callbacks.length + 1}`;
      this._callbacks[token] = callback;
    }
  }

  const dispatcher = new Dispatcher();


  /**
   * Actions
  */
  const actions = {
    getPosts() {
      // debugger;
      dispatcher.dispatch({
        type: 'FETCH_POSTS_REQUEST'
      });

      fetch('https://jsonplaceholder.typicode.com/posts')
      .then(function(resp, err) {
        if (err) {
          throw new Error(err);
          debugger;
        }
        return resp.json();
      })
      .then(function(json) {
        // debugger;
        dispatcher.dispatch({
          type: 'FETCH_POSTS_SUCCESS',
          data: json,
        });
      })
      .catch(function(e) {
        dispatcher.dispatch({
          type: 'FETCH_POSTS_FAILURE',
          err: e,
        });
      });
    },
    removePost(idx) {
      dispatcher.dispatch({
        type: 'REMOVE_POST',
        idx,
      });
    }
  };

  /**
   * Reducers
  */
  const reducers = function(state, action) {
    const newState = Object.assign({}, state);

    switch (action.type) {
      case 'FETCH_POSTS_REQUEST':
        newState.fetchingPosts = true;
        return newState;

      case 'FETCH_POSTS_SUCCESS':
        newState.fetchingPosts = false;
        newState.posts = action.data;
        return newState;

      case 'FETCH_POSTS_FAILURE':
        newState.fetchingPosts = false;
        newState.err = action.err;
        return newState;

      case 'REMOVE_POST':
        const newPosts = newState.posts.concat();
        newPosts.splice(action.idx, 1);
        newState.posts = newPosts;
        return newState;

      default:
        return newState;
    }
  };


  /**
   * Store
  */
  class Store {
    constructor() {
      // bind methods
      this.handleDispatch = this.handleDispatch.bind(this);
      this.subscribe = this.subscribe.bind(this);
      dispatcher.register(this.handleDispatch);

      // setup instance props
      this._listeners = {};
    }

    getState() {
      return this.state;
    }

    handleDispatch(action) {
      const newState = reducers(this.state, action);
      console.log(`%c${action.type} old state:`, 'color:gold', this.state);
      console.log(`%c${action.type} new state:`, 'color:aqua', newState);
      this.state = newState;

      for (let token in this._listeners) {
        this._listeners[token]();
      }
    }

    subscribe(listener) {
      const listeners = Object.keys(this._listeners);
      const token = [`LISTENER_${listeners.length + 1}`];
      this._listeners[token] = listener;
    }
  }

  const store = new Store();

  /**
   * Components
  */
  class Posts {
    constructor() {
      // bind methods
      this.render = this.render.bind(this);
      this.handleRemove = this.handleRemove.bind(this);
      
      this.elem = document.getElementById('posts-component');
      this.elem.addEventListener('click', this.handleRemove);
      store.subscribe(this.render);
      
    }

    handleRemove({ target }) {
      const idx = target.closest('[data-idx]').getAttribute('data-idx');
      actions.removePost(+idx);
    }

    renderPosts(posts) {
      const frag = document.createDocumentFragment();
      posts.forEach(function(post, idx) {
        const div = document.createElement('div');
        const header = document.createElement('h2');
        const body = document.createElement('p');
        header.innerText = post.title;
        body.innerText = post.body;
        div.setAttribute('data-idx', idx);
        div.appendChild(header);
        div.appendChild(body);
        frag.appendChild(div);
      });

      return frag;
    }

    render() {
      const state = store.getState();
      if (state.fetchingPosts) {
        this.elem.innerText = '... fetching posts';
      }

      if (!state.fetchingPosts && state.posts) {
        this.elem.innerHTML = '';
        this.elem.appendChild(this.renderPosts(state.posts));
      }
    }
  }

  /**
   * Init App
  */
  new Posts();
  actions.getPosts();
}());
