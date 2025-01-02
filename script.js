let start_btn = document.querySelector("#start_btn")
let main = document.querySelector(".main")
let body = document.querySelector("body")
let draw = document.querySelector(".draw")
let board = document.querySelector(".board")
let paint_btn = document.querySelector(".paint_btn")
let del_btn = document.querySelector(".del_btn")
let res_btn = document.querySelector(".res_btn")
let fill_btn = document.querySelector(".fill_btn")
let save_btn = document.querySelector(".save_btn")
let color_picker = document.querySelector("input")

let current_color = "rgb(0, 0, 0)"
let while_erasing = false
let isMousedown = false

// izklājuma "page"
start_btn.addEventListener("click", () => {
    main.style.display = "none"    
    body.style.backgroundImage = "none"
    body.style.backgroundColor = "lightgray"
    draw.style.display = "flex"
    create_board()// izsauc funkciju priekš izklajuma
})


//izvēlētās krāsas saglabāšana no input
color_picker.addEventListener("click", (e)=> {
    current_color = e.target.value
    while_erasing = false
})

//funkcija priekš izklājuma izveidošanas
function create_board(){
    board.innerHTML = ""
    for (let i = 0; i < 1000; i++){
        let cells = document.createElement("div")
        cells.classList.add("cell")
        cells.addEventListener("mousedown", () => {
            current_color = color_picker.value
            cells.style.backgroundColor = while_erasing ? "beige" : current_color;
        })
        cells.addEventListener("mouseover", () => {
            if (isMousedown){
                current_color = color_picker.value
                cells.style.backgroundColor = while_erasing ? "beige" : current_color;
            }
        })
        board.appendChild(cells)
    }
    let img_saved_array = JSON.parse(localStorage.getItem("img_saved"))
        if(img_saved_array){
            document.querySelectorAll(".cell").forEach((cell, index)=> {
                cell.style.backgroundColor = img_saved_array[index] || "beige"
            })
        }
}
//funkcija zīmešanai (atpkaļ krasa)
paint_btn.addEventListener("click", () => {
    while_erasing = false
    current_color = color_picker.value
})
//funkcija dzēšanai
del_btn.addEventListener("click", () => {
    while_erasing = true
})
//visu izdzēš
res_btn.addEventListener("click", ()=> {
    let cells = document.querySelectorAll(".cell")
    cells.forEach((cell) =>{
        cell.style.backgroundColor = "beige"
    })    
})
//funkcija priekš krāsošanas kad tur clicku
document.addEventListener("mousedown", () =>{
    isMousedown = true
})
//funkcija priekš krāsošanas kad noliek clicku
document.addEventListener("mouseup", () =>{
    isMousedown = false
})
//logika priekš aizpildišanas
fill_btn.addEventListener("click", () =>{
    current_color = color_picker.value
    let cells = document.querySelectorAll(".cell")
    // Анимация с использованием Anime.js
    anime({
      targets: cells, 
      backgroundColor: current_color, 
      delay: anime.stagger(0.5), // Задержка между анимациями клеток
      duration: 500, 
      easing: "easeInOutQuad", // Плавность
    });
})
//saglabašana
save_btn.addEventListener("click", () =>{
    let cell_color = []
    let cells = document.querySelectorAll(".cell")
    cells.forEach((cell) =>{
    cell_color.push(cell.style.backgroundColor || "beige")
    })
    console.log("massiv", cell_color)
    localStorage.setItem("img_saved", JSON.stringify(cell_color))
    console.log("strokea", JSON.stringify(cell_color))
    
})
