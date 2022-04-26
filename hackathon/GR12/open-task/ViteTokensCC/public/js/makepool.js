
var happy;
async function submit() {
        var xs =  grecaptcha.getResponse();
    var poolname = document.getElementById("poolname").value;
    var reward = document.getElementById("reward").value;
    var description = document.getElementById("description").value;
    var information = document.getElementById("stuff").value;
    var tokenid = document.getElementById("tokenid").value;
    const fileInput = document.querySelector("#file") ;
    const formData = new FormData();
	
    formData.append('uploaded_file', fileInput.files[0]);
console.log(fileInput.files[0]);
console.log(formData);
	if (fileInput.files[0] === undefined) {
	formData.delete('uploaded_file');
	formData.append('uploaded_file', '../img/defaultpool.png');
}
    const options = {
    method: 'POST',
    body: formData,
    // If you add this, upload won't work
     // headers: {
    //   'Content-Type': 'multipart/form-data',
    // }
};
    var makepoolresponse = await fetch(`https://vitetokens.cc/api/makepool?name=${poolname}&reward=${reward}&desc=${description}&information=${information}&key=${xs}&tokenid=${tokenid}`, options).then(res => res.json());
    console.log(makepoolresponse.code)
    if (makepoolresponse.code === '69') {
            alert("Reward is not a number!")
            grecaptcha.reset();
    } else if (makepoolresponse.code === '10') {
        alert("Captcha is not completed!");
        grecaptcha.reset();
    } else if (makepoolresponse.code === '20') {
        alert("Name or Description is too short!");
        grecaptcha.reset();
    } else if (makepoolresponse.code === '99') {
        alert("A pool with such name already exists!");
        grecaptcha.reset();
    }else if (makepoolresponse.code === '63') {
        alert("Strings can not start with a number!");
        grecaptcha.reset();
    }   else if (makepoolresponse.code === '83') {
        alert("The reward must be higher than 0.01 and smaller than 5!"); 
        grecaptcha.reset();
    } else if (makepoolresponse.code === '40' || makepoolresponse.code === '30') {
        alert("You must upload an image!"); 
        grecaptcha.reset();
    }  else if (makepoolresponse.code === '456') {
        alert("TokenID is not valid!"); 
        grecaptcha.reset();
    } 
        else {
        location.href = `https://vitetokens.cc/pay/${makepoolresponse.txid}`
        document.getElementById("addy").innerHTML
        = makepoolresponse;

    }


}
async function getDepo() {
        var parts = window.location.href.split('/');
        var lastSegment = parts.pop() || parts.pop();



        var stuff = await fetch(`https://vitetokens.cc/api/chk?txid=${lastSegment}`).then(res => res.json())
        if (stuff.code === "0") {
                document.getElementById("infodiv").style.display = "none"
                document.getElementById("paydiv").style.display = "none"
                document.getElementById("errordiv").style.display = "inline"
                
        } else {
                document.getElementById("addresstxt").value
                = stuff.depaddr
                document.getElementById("img").src
                = `https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=${stuff.depaddr}&choe=UTF-8`
                document.getElementById("statustext").innerHTML
                = "Awaiting payment..."
                let isdone = false;
                while (isdone === false) {
                        var rep = setTimeout(await verify(), 5000);
                        if (rep === "lock") {
                                isdone = true;
                                console.log()
                        }  
                }
        }


}

async function verify() {
        var parts = window.location.href.split('/');
        var lastSegment = parts.pop() || parts.pop();
        var verifyResponse = await fetch(`https://vitetokens.cc/api/verifypool?name=${lastSegment}`).then(res => res.json())
        if (verifyResponse.address === "null") {
                return "unlock";
        } else {
                document.getElementById("infodiv").style.visibility = 'visible'
                document.getElementById("paydiv").style.display = "none"
                document.getElementById("poolsecret").innerHTML
                = `Pool Secret: ${verifyResponse.secret}`
                document.getElementById("pooladdy").innerHTML
                = `Pool Wallet Address: ${verifyResponse.address}`
                document.getElementById("poolseed").innerHTML
                = `Pool Wallet Seed: ${verifyResponse.seed}`
                document.getElementById("pageurl").href 
                = `https://vitetokens.cc/pool/${verifyResponse.name}`
                isdone = true;
                return "lock";

        }
}


let base64String = "";

        /*
        var name = req.query.name;
        var reward = req.query.reward;
        var desc = req.query.desc;
        var information = req.query.information;
        "poolname" placeholder="Name">
<br>
<input type="text" id="reward" placeholder="Reward">
<br>
<input type="text" id="description" placeholder="description">
<br>
<input type="text" id="stuff"
        */
function copy() {
        /* Get the text field */
        var copyText = document.getElementById("addresstxt");
      
        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
      
        /* Copy the text inside the text field */
        document.execCommand("copy");
      
        /* Alert the copied text */
       document.getElementById("copy").innerHTML = "Successfully Copied!";
      }

function openWallet() {
        location.href = `ban:${document.getElementById("addresstxt").value}`
}
