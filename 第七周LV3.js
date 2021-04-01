
let data = []

function init(){
    axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json')
   .then(function(respones){
      data = respones.data
      renderContent()
      renderC3()

   })
}
init()
//渲染系列
function renderContent(){
    const list = document.querySelector('.ticketArea')
    console.log(list)
    let str = ''
    data.forEach(function(item,index){
        let content =` <li class="ticletArea-card">
        <div class="ticketCardPct">
            <img src="${item.imgUrl}" alt="">
            <p class="position1">${item.area}</p>
            <p class="position2">${item.rate}</p>
        </div>
        <div class="ticketCardtxt">
            <h3><a href="#">${item.name}</a></h3>
            <p>${item.description}</p>
        </div>
        <div class="ticketCardInfo">
              <div class="info-num"><p>剩下最後${item.group}組</p></div>
              <div class="info-price"><p>TWD $ <span>${item.price}</span></p></div>
        </div>
    </li>`
    str += content
    })
    list.innerHTML = str
    datanum()
}

// 監聽系列
const search = document.querySelector('.search-txt-js')

search.addEventListener('click',function(e){
    const list = document.querySelector('.ticketArea')
    let str = ''
    data.forEach(function(item){
        if(e.target.value == '地區搜尋'){
            return
        }if(e.target.value == '全部地區'){
            str+=` <li class="ticletArea-card">
            <div class="ticketCardPct">
                <img src="${item.imgUrl}" alt="">
                <p class="position1">${item.area}</p>
                <p class="position2">${item.rate}</p>
            </div>
            <div class="ticketCardtxt">
                <h3><a href="#">${item.name}</a></h3>
                <p>${item.description}</p>
            </div>
            <div class="ticketCardInfo">
                  <div class="info-num"><p>剩下最後${item.group}組</p></div>
                  <div class="info-price"><p>TWD $ <span>${item.price}</span></p></div>
            </div>
        </li>`
        }else if(e.target.value == item.area){
            str+=` <li class="ticletArea-card">
            <div class="ticketCardPct">
                <img src="${item.imgUrl}" alt="">
                <p class="position1">${item.area}</p>
                <p class="position2">${item.rate}</p>
            </div>
            <div class="ticketCardtxt">
                <h3><a href="#">${item.name}</a></h3>
                <p>${item.description}</p>
            </div>
            <div class="ticketCardInfo">
                  <div class="info-num"><p>剩下最後${item.group}組</p></div>
                  <div class="info-price"><p>TWD $ <span>${item.price}</span></p></div>
            </div>
        </li>`
        }
        list.innerHTML = str
    })
    
})
// 新增系列
const ticketName = document.querySelector('.ticketName-js')
const ticketUrlimg = document.querySelector('.ticketUrlimg-js')
const ticketLocal = document.querySelector('.ticketLocal-js')
const ticketPrice = document.querySelector('.ticketPrice-js')
const ticketNum = document.querySelector('.ticketNum-js')
const ticketStar = document.querySelector('.ticketStar-js')
const ticketDescription = document.querySelector('.ticketDescription-js')
const btn = document.querySelector('.btn')

btn.addEventListener('click',function(e){
    if(ticketLocal.value=='全部地區'|| ticketDescription.value==''|| ticketNum.value==''||
    ticketUrlimg.value==''||ticketName.value==''||ticketPrice.value==''||ticketStar.value==''){
        alert('缺少其中之資料!')
        return
    }else{
        let obj = {}
       obj.area = ticketLocal.value
       obj.description = ticketDescription.value
       obj.group = ticketNum.value
       obj.id = data.length
       obj.imgUrl = ticketUrlimg.value
       obj.name = ticketName.value
       obj.price = ticketPrice.value
       obj.rate = ticketStar.value
       data.push(obj)
       alert('新增成功!')
       renderContent()
       renderC3()
    }
    ticketLocal.value='全部地區', ticketDescription.value='', ticketNum.value='',
    ticketUrlimg.value='',ticketName.value='',ticketPrice.value='',ticketStar.value=''
})
//資料筆數系列
function datanum(){
    const searchContent =  document.querySelector('.searchContent')
    searchContent.innerHTML = `總共有${data.length}筆資料`
}
//C3系列
function renderC3(){
    const searchPie = document.querySelector('.search-pie')
    let dataObj = {}
    data.forEach(function(item){
        if(dataObj[item.area] == undefined){
            dataObj[item.area] = 1
        }else{
            dataObj[item.area] += 1
        }
    })
    //整理物件
    let dataAry = Object.keys(dataObj)
    //取出屬性
    let newData = []
    dataAry.forEach(function(item){
        let add = []
        add.push(item)
        add.push(dataObj[item])
        newData.push(add)
    })
    //整理新陣列
    const chart = c3.generate({
        bindto: ".search-pie",
        data: {
          columns: newData,
          type : 'donut',
        },
        donut: {
          title: "全部地區比例"
        }
      });
}
   