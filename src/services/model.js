export default class Model {
  static setContext(context) {
    this.db = context.db;
    return this;
  }

  static extract(data) {
    if (data && data.rows) return data.rows;
    if (data && data.row) return data.row;
    if (!data || (!data.rows && !data.row)) return null;
  }
}
