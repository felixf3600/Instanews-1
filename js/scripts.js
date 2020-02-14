document.addEventListener('DOMContentLoaded', () => {
    const selector = document.querySelector('select');
    let articleFlex = document.getElementsByClassName("article-flex");
    let header = document.querySelector('header');
    let image = document.querySelector('img');
    let articleNoImgCounter = 0;
    const loadingGif = document.createElement('img');
    loadingGif.src = "../assets/images/ajax-loader.gif";
    loadingGif.className = "loading-gif";

    selector.addEventListener('change', () => {
        if (event.target.value !== "sections") {
            $.ajax({
                method: 'GET',
                url: `https://api.nytimes.com/svc/topstories/v2/${event.target.value}.json?api-key=rJvMd2jziFfbgyfxJIe0nzpeT0yrb69c`
            })
                .done(function (data) {
                    $('.article-flex').empty();
                    for (let i = 0; i < 12 && i < data.results.length; i++) {
                        while (data.results[i + articleNoImgCounter].multimedia[3] === undefined) {
                            articleNoImgCounter++;
                        }
                        let newArticle = document.createElement("article");
                        let newDescription = document.createElement("p");
                        let newLink = document.createElement("a");
                        newArticle.style = `background-image: url(${data.results[i + articleNoImgCounter].multimedia[3].url})`
                        newDescription.innerText = `${data.results[i + articleNoImgCounter].abstract}`
                        newLink.setAttribute("href", `${data.results[i + articleNoImgCounter].short_url}`)
                        newArticle.append(newLink);
                        newLink.append(newDescription);
                        articleFlex[0].appendChild(newArticle);

                    }
                })
                .always(function () {
                    header.classList.add("clicked");
                    image.classList.add("img-clicked");


                })
        }
    });

    $(document).on({
        ajaxStart: function () { $('.article-flex').empty(); articleFlex[0].appendChild(loadingGif) },
    });
});//end of document load