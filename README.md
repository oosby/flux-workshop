# Flux Workshop

This workshop covers the flux pattern basics. We will build a small application that:
- asynchronously fetches a list of 100 posts from a third-party API ()
- renders them on the page
- allows the user to remove them from the list

We will not use any libraries or frameworks, nor does the code need to be transpiled as long as you are running it in latest (or thereabouts) Chrome.

#### Step 1
Initial setup consisting index.html and main.js. No flux yet, just a simple fetch call to the API
#### Step 2

Build a basic dispatcher and store
#### Step 3

Process actions in the store and update state
#### Step 4

Cleanup! Move actions and reducers into their own “areas”
#### Step 5

Connect to the store the the view
#### Step 6

Build a view component that renders posts to the DOM
#### Step 7

Add "remove post" functionality by updating the component, creating an action, and adding a reducer


When we're done our application state will look like:
```
{
    fetchingPosts: false,
    posts: [
        {...},
        {...},
        {...},
        ...,
    ]
}
```

## Run locally
- clone/download repo and cd into the directory
- `python -m SimpleHTTPServer`
- open browser and navigate to `http://localhost:8000`

## Links
- placeholder json https://jsonplaceholder.typicode.com/
- Lin Clark's awesome cartoon https://code-cartoons.com/a-cartoon-guide-to-flux-6157355ab207
- Facebook flux docs https://facebook.github.io/flux/docs/in-depth-overview.html
- Puppy wallpaper https://chrome.google.com/webstore/detail/puppy-wallpaper-hd-dogs-n