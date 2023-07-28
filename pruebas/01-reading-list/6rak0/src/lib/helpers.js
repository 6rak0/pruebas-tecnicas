import { library } from '../../../books.json';
const books = library.map((item) => item.book)

function getUniqueGenres(books) {
    const genresSet = new Set();
    books.forEach(book => genresSet.add(book.genre));
    return Array.from(genresSet);
}

export const genres = getUniqueGenres(books)