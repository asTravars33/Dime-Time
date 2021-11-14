///Global variables///
const cookie_name = 'balance';
var cur_balance=0;
var spendings = "";

/// Display all necessary settings and values at the beginning of the game ///
function begin(){
    //Initial balance
    var cval = get_cookie(cookie_name);
	cur_balance = parseInt(cval);
    update_display(cur_balance);
}

/// Update balance when user clicks ///
function increment_and_update(name, spent_amt){
	cur_balance-=parseInt(spent_amt);
    set_cookie(cookie_name, cur_balance);
	spendings=name+"; "+spendings;
    update_display(cur_balance);
}

function update_display(cval){
	var b_display = document.getElementById('balance_display');
	var h_balance = document.getElementById('hidden_balance');
	var h_spendings = document.getElementById('hidden_spendings');
    b_display.innerHTML = "Balance: $"+ cval;
    console.log(cval);
    h_balance.value = cval;
	h_spendings.value = spendings;
}

/* Cookie-handling functions */

/// Retrieve the value of a cookie ///
function get_cookie(cookie_name){
    var decodedCookie = decodeURIComponent(document.cookie);
    return decodedCookie
        .split('; ')
        .find(row => row.startsWith(`${cookie_name}=`))
        .split('=')[1];
}

/// Set the new value for a cookie ///
function set_cookie(cookie_name, cval){
    document.cookie = `${cookie_name}=${cval}`;
}

begin();