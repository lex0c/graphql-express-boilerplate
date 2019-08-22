export default async (key, data) => ({ key, ...(await data) });
