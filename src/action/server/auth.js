import fetchApiServer from "./fetchApi";

export default async function getAuth() {
  const response2 = await fetchApiServer(`/api/user`, null, "GET");
}
