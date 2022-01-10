// alert(document.cookie)

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

var cookies = getCookie('favorites').split('...')
if (cookies.length <= 1)
{
    document.getElementById("favorite_list").innerHTML = ''
}
else
{
    cookies.pop()
    for (let i = 0; i<cookies.length; i++)
    {
        var cookie = cookies[i].split(',,,')
        var href = cookie[0]
        var url = cookie[1]
        var str = '<a href="' + href + '"> <img src="' + url + '" class="image-size3"> </a>'
        document.getElementById("favorite_list").innerHTML = str
    }
    
}




