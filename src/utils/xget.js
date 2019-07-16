const xget = query =>
  new class {
    constructor(query) {
      if (!query.param.method) query.param.method = "post";
      query.param.body = this.objTo(query.param.body, (query.type = "form"));
      console.log(query.param)
      return fetch(query.url, query.param)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
        })
        .then(json => {
          if (json.status == "0") {
            return json;
          } else {
            let msg = json.message ? json.message : "unknown error";
            throw msg;
          }
        })
        .catch(err => {
          let ary = [];
          query.param.body.forEach((v, k) => {
            ary.push(`${k}:${v}\n`);
          });
          console.error(
            "Error:",
            `${err}
            ${query.url}
            ${ary}`
          );
          throw err;
        });
    }

    // 格式化数据

    objTo(obj, type) {
      const main = {
        form: obj => {
          let fdata = new FormData();
          for (let key in obj) {
            fdata.append(key, obj[key]);
          }
          return fdata;
        },
        query: obj => {
          let query = "";
          for (let key in obj) {
            query = query + key + "=" + obj[key] + "&";
          }
          return query;
        }
      };
      return main[type](obj);
    }
  }(query);

export default xget;
