const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 12;
let offset = 0;

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});

const main = async () => {
    loadPokemonItens(offset, limit);
}

main();













