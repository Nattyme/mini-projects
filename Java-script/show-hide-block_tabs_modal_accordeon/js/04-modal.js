var winner = function() {
    alert('Winner!');
};

var loser = function(){
    alert('Looseeer');
}
    
    //Проверка

    var a = winner;
    var b = loser;
    var c  = loser;
    c = a;
    a = b;
    b = c;
    c = a;
    a = c;
    a = b; 
    b = c; 
    a();