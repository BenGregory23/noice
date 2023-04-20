const apiKey = '42b8a7922cc2d03ed720a24cba029744';
const baseUrl = 'https://api.themoviedb.org/3';


async function searchMovieByTitle(title) {
  try {
    // Search for movies with the given title
    const response = await fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${title}`);

    if (!response.ok) {
      throw new Error('An error occurred while fetching movie data.');
    }

    // Convert the response to JSON
    const data = await response.json();

    // Get the first search result (assuming it's the most relevant)
    const movie = data.results[0];

    // Get the poster path for the movie
    const posterPath = movie.poster_path;

    // Construct the URL for the poster image
    const posterUrl = `https://image.tmdb.org/t/p/original${posterPath}`;

    // Return the URL for the poster image
    return posterUrl;
  } catch (error) {
    console.error(error);
  }
}




export default searchMovieByTitle;
