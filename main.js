/**
 * Init App
*/
(function () {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function(resp, err) {
      if (err) {
        throw new Error(err);
      }
      return resp.json();
    })
    .then(function(json) {
      console.log('%cjson:', 'color:lime', json);
    })
    .catch(function(e) {
      console.error(e)
    });
}());
