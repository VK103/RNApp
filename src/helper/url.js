/** URL Methods */
class URLHelper {
  serializeURL = (obj) => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    return str.join('&');
  };
  encodedURL = (url) =>{
    return encodeURIComponent(url)
  }
}

const urlHelper = new URLHelper();
Object.freeze(urlHelper);
export default urlHelper;
