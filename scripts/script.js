
// KATE

document.addEventListener("DOMContentLoaded", showQuote = () => {
    fetch('https://favqs.com/api/qotd')
        .then(response => response.json())
        .then(obj => {
            console.log(obj);
            document.querySelector('.blockquote__text').innerText = obj.quote.body;
            document.querySelector('figcaption').innerText = obj.quote.author;
        })
        .catch(error => {
            error = new Error('Failed to fetch');
            document.querySelector('blockquote').innerText = error.message;
        });
})
