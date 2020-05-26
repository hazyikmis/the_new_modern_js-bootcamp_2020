//This is a FAKE Http Request Function
//It takes 1 second to resolve or reject the promise, depending on the url that is passed in
const fakeRequest = url => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const pages = {
        "/users": [
          { id: 1, username: "Bilbo" },
          { id: 5, username: "Esmerelda" }
        ],
        "/users/1": {
          id: 1,
          username: "Bilbo",
          upvotes: 360,
          city: "Lisbon",
          topPostId: 454321
        },
        "/users/5": {
          id: 5,
          username: "Esmerelda",
          upvotes: 571,
          city: "Honolulu"
        },
        "/posts/454321": {
          id: 454321,
          title: "Ladies & Gentlemen, may I introduce my pet pig, Hamlet"
        },
        "/about": "This is the about page!"
      };
      const data = pages[url];
      if (data) {
        resolve({ status: 200, data }); //resolve with a value!
      } else {
        reject({ status: 404 }); //reject with a value!
      }
    }, 1000);
  });
};

//HERE IS THE ORIGINAL WAY OF CALLING PROMISES
//In this method, we need separate "catch"es for each promise call (but we have used only one for the outermost promise)
fakeRequest("/users")
  .then(res => {
    console.log(res);
    const id = res.data[0].id;
    fakeRequest(`/users/${id}`).then(res => {
      console.log(res);
      const postId = res.data.topPostId;
      fakeRequest(`/posts/${postId}`).then(res => {
        console.log(res);
      });
    });
  })
  .catch(err => {
    console.log("OH NO!", err);
  });

//AND HERE IS THE BETTER WAY OF CALLING PROMISES (CHAINING PROMISES)
//In this method, we NO need separate "catch"es for each promise, ONE FOR ALL, AT THE END
fakeRequest("/users")
  .then(res => {
    console.log(res);
    const id = res.data[0].id;
    return fakeRequest(`/users/${id}`);
  })
  .then(res => {
    console.log(res);
    const postId = res.data.topPostId;
    return fakeRequest(`/posts/${postId}`);
  })
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log("OH NO!", err);
  });

// ************************************************
// ATTEMPT 2 (deliberate error to illustrate CATCH)
// ************************************************
// fakeRequest('/users')
// 	.then((res) => {
// 		console.log(res);
// 		const id = res.data[0].id;
// 		return fakeRequest(`/useALSKDJrs/${id}`); //INVALID URL, CATCH WILL RUN!
// 	})
// 	.then((res) => {
// 		console.log(res);
// 		const postId = res.data.topPostId;
// 		return fakeRequest(`/posts/${postId}`);
// 	})
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((err) => {
// 		console.log('OH NO!', err);
// 	});
