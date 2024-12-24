let display = document.querySelector(".display-wrapper").querySelector("p");
let input=document.querySelector("input[type='text']")
const submitBtn=document.querySelector(".search")
const closeMenuBtn=document.querySelector(".closeMenu")
const MenuBtn=document.querySelector("#menu")
const mobileMenu=document.querySelector("#mobile-menu")
MenuBtn.addEventListener('click',(e)=>{
  MenuBtn.classList.toggle("hidden")
  closeMenuBtn.classList.toggle("hidden")
  mobileMenu.classList.toggle("showMenu")
})
closeMenuBtn.addEventListener('click',(e)=>{
  MenuBtn.classList.toggle("hidden")
  closeMenuBtn.classList.toggle("hidden")
  mobileMenu.classList.toggle("showMenu")
})
submitBtn.addEventListener('click',(e)=>{
  e.preventDefault()
  let inputValue=new String(input.value)
  let regexForEmptyStr= /^$/
  if(regexForEmptyStr.test(inputValue)){
    alert('Please enter a dish !')
  }else{
    getData(inputValue)
  }
})
async function getData(input) {
  const APIKEY = "AIzaSyDtw-irYcc8Lk6r-zoEL5B4vQdJ6tkjXC8";
  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDtw-irYcc8Lk6r-zoEL5B4vQdJ6tkjXC8";
    display.textContent="Please wait ! "
  try {
    const dataToSend = {
      contents: [
        {
          parts: [{ text: `tell me the stepwise recipe of ${input} .
             ` }],
        },
      ],
    };
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
    console.error(response.status);
    const data = await response.json();
    // console.log(data);
    recipe = data.candidates[0].content.parts[0].text;
    // console.log("json",recipe);

    // console.log(typeof recipe);

    console.log("Raw recipe content:", recipe);

    // Apply formatting
    var recipe = recipe
      .replace(/(Ingredients:)/, "\n\n$1\n")
      .replace(/(Instructions:)/, "\n\n$1\n")
      .replace(/\*\*/g, " ")
      .replace(/(\*\s.*?)/g, '\n$1')
      .replace(/(:\s+)(\*)/g, '$1\n$2')
      .replace(/\n/g, "<br>")

    // Display the formatted recipe
    display.innerHTML=recipe


    // let typingSpeed=50
    // let i=0
    // typeWrite()
    // function typeWrite(){
    //   if(i<recipe.length){
    //     display.innerHTML+=recipe.charAt(i)
    //     i++
    //     setTimeout(typeWrite,typingSpeed)
    //   }
    // }    
  } catch (error) {
    console.error("error fetching data", error);
  }
}

