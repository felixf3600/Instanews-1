document.addEventListener('DOMContentLoaded', () => {
    const myButton = document.querySelector('button');
    let container = document.getElementById('container');
    myButton.addEventListener('click', function () {

        container.style.display = "block";
    });

    $.ajax({
        method: 'GET',
        url: 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=rJvMd2jziFfbgyfxJIe0nzpeT0yrb69c'
    })
        .done(function (data) {
            console.log(data);
            let articleFlex = document.getElementsByClassName("article-flex");
            for (let i = 0; i < 12; i++) {
                let newArticle = document.createElement("article");
                let newDescription = document.createElement("p");
                newArticle.style = `background-image: url(${data.results[i].multimedia[3].url})`
                newDescription.innerText = `${data.results[i].abstract}`
                newArticle.append(newDescription);
                articleFlex[0].appendChild(newArticle);

            }



        })







});//end of document load