import { Client, Databases, TablesDB, Query, ID } from "react-native-appwrite";

const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;
const DEFAULT_APPWRITE_ENDPOINT = "https://fra.cloud.appwrite.io/v1";

const client = new Client()
  .setEndpoint(DEFAULT_APPWRITE_ENDPOINT)
  .setProject(PROJECT_ID);

const tablesDB = new TablesDB(client);

export async function updateSearchCount(query: string, firstMovie: Movie) {
  const result = await tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId: TABLE_ID,
    queries: [Query.equal("searchTerm", query)],
  });

  console.log(`checking for searchTerm: "${query}"`);
  console.log("result(from DB) in updateSearchCount");
  console.log(result);

  console.log("logging firstMovie in updateSearchCount");
  console.log(firstMovie);

  // see if there is an existing entry
  if (result.total === 0) {
    // create new entry
    await tablesDB.createRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: ID.unique(),
      data: {
        searchTerm: query,
        movie_id: firstMovie.id,
        title: firstMovie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${firstMovie.poster_path}`,
      },
    });
    return;
  } else {
    // edit the existing entry
    const existingMovie = result.rows[0];

    await tablesDB.updateRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: existingMovie.$id,
      data: {
        count: existingMovie.count + 1,
      },
    });
  }

  return result;
}

export async function getTrendingMovies(): Promise<
  TrendingMovie[] | undefined
> {
  try {
    const result = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.limit(5), Query.orderDesc("count")],
    });

    // this makes Typescript shut up
    return result.rows as unknown as TrendingMovie[];
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
