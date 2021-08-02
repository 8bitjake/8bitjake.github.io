function copy(text) {
    var input = document.createElement('textarea');
    input.innerHTML = text;
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input);
    return result;
}
function copyJson() {
    var txt = ',{"title":"' + document.getElementById('title').value + '","content":"' + document.getElementById('content').value + '"}'
    document.querySelector('#copy').innerHTML = txt
    copy(document.querySelector('#copy').innerHTML)
    alert('The JSON data has been copied!\nPlease make sure to increase the "postCount" JSON value after pasting!')
}
document.getElementsByTagName('textarea')[0].innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis erat euismod, hendrerit nunc in, volutpat nisl. Aenean orci lorem<br>mattis non diam quis, ultricies aliquam neque. Quisque tempor ut felis et maximus. Maecenas lobortis justo posuere, dictum leo vitae,<br>aliquet sapien.'
const whitespaceChars = [' ', '', '​', ' ']
setInterval(function(){
    
    if (!whitespaceChars.includes(document.getElementById('title').value)) {
         document.getElementsByClassName('postName')[0].innerHTML = document.getElementById('title').value
        } else {
            document.getElementsByClassName('postName')[0].innerHTML = '(invalid title)'
        }
        document.getElementsByClassName('postText')[0].innerHTML = document.getElementById('content').value
}, 0);