// 适龄提示
(function(){
    let tipBtn = document.querySelector("#banner .tip"),
        yearBox = document.querySelector("#yearBox");
        closeBtn = yearBox.querySelector('.close');

    tipBtn.addEventListener('click',function(){
        yearBox.classList.add('show');
        
        // 添加自定义滚动条
        scrollBar("#yearBox");
    })

    closeBtn.addEventListener("click",function(){
        yearBox.classList.remove('show');
    })
    
})();