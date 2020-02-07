document.addEventListener('DOMContentLoaded', () => {
    const myButton = document.querySelector('button');
    let container = document.getElementById('container');
    myButton.addEventListener('click', function () {

        container.style.display = "block";
    });

    $.ajax({
        method: 'GET',
        url: 'https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=rJvMd2jziFfbgyfxJIe0nzpeT0yrb69c'
    })
        .done(function (data) {
            console.log(data.results.length);
            for (i = 0; i < 12; i++) {
                console.log(data.results[i])
            }
            const articleFlex = document.getElementsByClassName("article-flex");
            articleFlex[0].children[0].firstElementChild.src = `${data.results[1].multimedia[2].url}`
            console.log(articleFlex[0].children[0].firstElementChild.src);
        })







});//end of document load