export async function request(url) {
  try {
    const response = await fetch(url);
    return response.status == 204 ? response : response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}