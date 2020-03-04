# Movie

|   Route   |   HTTP Verb   |   POST Body   |   Description |
| --- | --- | --- | --- |
| /api/movie | 'GET' | Empty | List all movies |
| /api/movie | 'POST' | {title:"foo",category:"bar",country:"foo",imdb_score:9,year:1950} | add a movie |
| /api/movie/:movie_id | 'GET' | Empty | Get a movie |
| /api/movie/:movie_id | 'PUT' | {title:"foo",category:"bar",country:"foo",imdb_score:9,year:1950} | Update a movie |
| /api/movie/:movie_id | 'DELETE' | Empty | Delete a movie |
| /api/movie/top10 | 'GET' | Empty | Get the top 10 movies |
| /api/movie/between/:start_year/:end_year | 'GET' | Empty | Movies between two dates|
