self.addEventListener("fetch", (event) => {
    console.log(event.request.url);
})