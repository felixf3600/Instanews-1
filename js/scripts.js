document.addEventListener('DOMContentLoaded', () => {
    const selector = document.querySelector('select');
    let articleFlex = document.getElementsByClassName("article-flex");

    selector.addEventListener('change', () => {

        $.ajax({
            method: 'GET',
            url: `https://api.nytimes.com/svc/topstories/v2/${event.target.value}.json?api-key=rJvMd2jziFfbgyfxJIe0nzpeT0yrb69c`
        })
            .done(function (data) {
                $('.article-flex').empty();
                for (let i = 0; i < 12 && i < data.results.length; i++) {
                    let newArticle = document.createElement("article");
                    let newDescription = document.createElement("p");
                    newArticle.style = `background-image: url(${data.results[i].multimedia[3].url})`
                    newDescription.innerText = `${data.results[i].abstract}`
                    newArticle.append(newDescription);
                    console.log(data.results.length);
                    articleFlex[0].appendChild(newArticle);

                }



            })
    });








});//end of document load