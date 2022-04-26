function claim() {
          
    (async () => {
      // hcaptcha check
      let xs = grecaptcha.getResponse()
     document.getElementById("claimbtn").innerHTML
     = '<div class="subtextblack">Please wait...</div>';
     document.getElementById("claimbtn").disabled = false;
let address = document.getElementById("address").value
   if (document.getElementById('address').value != '') {


    (async () => {
     document.getElementById("claimbtn").disabled = true;
     var request  = await fetch('https://vitetokens.cc/redeem?addr=' + address + '&' + 'ip=' + "djdjj" + "&key=" + xs).then(response => response.json())
     var code = request.code;
     var poolname = request.poolname;
     console.log(code);


     if (code === "69") {
     console.log('Malcious IP detected');
     document.getElementById("claimbtn").disabled = false;
     document.getElementById("claimbtn").innerHTML
     = '<div class="subtextblack">Your IP is considered as malcious, are you using a VPN?</div>';
     grecaptcha.reset()
     getBal()


   } else if (code === "420") {
     console.log("New IP claiming")
     document.getElementById("claimbtn").disabled = false;
     document.getElementById("claimbtn").innerHTML
     = '<div class="subtextblack">Claimed!</div>';
     document.getElementById('sponsor').style.visibility = 'visible';
     document.getElementById('sponsor').innerHTML
     = `<a id="lime" href="https://vitetokens.cc/pool/${poolname}">Claim Sponsored by: ${poolname}</a>`
     console.log(poolname);
     window.location.replace(`https://vitetokens.cc/pool/${poolname}`);
     getBal()
     grecaptcha.reset()


   } else if (code === "8") {
     console.log('Claiming and updating date')
     document.getElementById("claimbtn").disabled = false;
     document.getElementById("claimbtn").innerHTML
     = '<div class="subtextblack">Claimed!</div>';
     document.getElementById('sponsor').style.visibility = 'visible';
     document.getElementById('sponsor').innerHTML
     = `<a id="lime" href="https://vitetokens.cc/pool/${poolname}">Claim Sponsored by: ${poolname}</a>`
     window.location.replace(`https://vitetokens.cc/pool/${poolname}`);
          getBal()
          
          grecaptcha.reset()
     console.log(poolname);


   } else if (code === "5") {
     console.log('Claim locked, already claimed for today');
     document.getElementById("claimbtn").disabled = false;
     document.getElementById("claimbtn").innerHTML
     = '<div class="subtextblack">You already claimed your token today.</div>';
     grecaptcha.reset()
     getBal()


   } else if (code === "10") {
    document.getElementById("claimbtn").disabled = false;
    document.getElementById("claimbtn").innerHTML
    = '<div class="subtextblack">oops! Try completing the captcha again</div>';
    grecaptcha.reset()
   }  else if (code === "20") {
    document.getElementById("claimbtn").disabled = false;
    document.getElementById("claimbtn").innerHTML
    = '<div class="subtextblack">Internal Error 420 occured.</div>';
    grecaptcha.reset()
   }   else if (code === "49") {
    document.getElementById("claimbtn").disabled = false;
    document.getElementById("claimbtn").innerHTML
    = '<div class="subtextblack">Internal Error 69 occured.</div>';
    grecaptcha.reset()
   }    else if (code === "199") {
    document.getElementById("claimbtn").disabled = false;
    document.getElementById("claimbtn").innerHTML
    = '<div class="subtextblack">Please try entering the address again.</div>';
    grecaptcha.reset()
   }
    })();


   } else if (document.getElementById('address').value === '') {
     alert(`You didn't provide anything ` + "(╯°□°）╯︵ ┻━┻")
   } else {
     alert("The address you provided is invalid.")
     document.getElementById("claimbtn").innerHTML
     = "Get Banano";
   }


     
    })()



 }
 function getBal() {
console.log('got')
 }
 
const btn = document.querySelector(".btn-toggle");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.body.classList.add("dark-theme");
	$('html').addClass('dark-theme');
	document.getElementById("checkbox").checked = true;

}

btn.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");

  let theme = "light";
  if (document.body.classList.contains("dark-theme")) {
    theme = "dark";
  }
  localStorage.setItem("theme", theme);
  location.reload();
});

 
