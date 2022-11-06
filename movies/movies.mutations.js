import client from "../client";
export default {
  Mutation: {
    createMovie: (_, { title, year, ganre }) => {
      return client.movie.create({
        data: {
          title,
          year,
          ganre,
        },
      });
    },
    deleteMovie: (_, { id }) => client.movie.delete({ where: { id } }),
    updateMovie: (_, { id, year, title, ganre }) =>
      client.movie.update({ where: { id }, data: { title, year, ganre } }),
  },
};
