self.addEventListener("fetch", (event) => {
    if(ENVIRONMENT == "test") console.log(event.request.url);
})