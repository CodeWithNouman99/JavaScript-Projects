function home()
{
    document.getElementById("homes").style.color="rgb(42, 250, 42)"
    document.getElementById("programs").style.color="white"
    document.getElementById("plans").style.color="white"
    document.getElementById("blogs").style.color="white"
    document.getElementById("contacts").style.color="white"
}
function program()
{
    document.getElementById("homes").style.color="white"
    document.getElementById("programs").style.color="rgb(42, 250, 42)"
    document.getElementById("plans").style.color="white"
    document.getElementById("blogs").style.color="white"
    document.getElementById("contacts").style.color="white"
}
function plan()
{
    document.getElementById("homes").style.color="white"
    document.getElementById("programs").style.color="white"
    document.getElementById("plans").style.color="rgb(42, 250, 42)"
    document.getElementById("blogs").style.color="white"
    document.getElementById("contacts").style.color="white"
}
function blog()
{
    document.getElementById("homes").style.color="white"
    document.getElementById("programs").style.color="white"
    document.getElementById("plans").style.color="white"
    document.getElementById("blogs").style.color="rgb(42, 250, 42)"
    document.getElementById("contacts").style.color="white"
}
function contact()
{
    document.getElementById("homes").style.color="white"
    document.getElementById("programs").style.color="white"
    document.getElementById("plans").style.color="white"
    document.getElementById("blogs").style.color="white"
    document.getElementById("contacts").style.color="rgb(42, 250, 42)"
}

// Hum ne functions ko Html me call kr diya ha

function submit()
{
    let name=document.getElementById('name')
    let number=document.getElementById('number')
    if(name.value =="")
    {
        alert("Please Enter Your Name")
    }
    else if(number.value =="")
    {
        alert("Please Enter your Number")
    }
    else{
        alert("Thanks for Joining:" + name.value)
    }
}

// Create the back-to-top button
const backBtn = document.createElement('button');
backBtn.id = 'backToTop';
backBtn.innerText = '↑';
document.body.appendChild(backBtn);

// Show/hide button on scroll
window.addEventListener('scroll', () => {
    backBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// Scroll to top when clicked
backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

