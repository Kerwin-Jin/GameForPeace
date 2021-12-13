function scrollBar(id){
    let scrollWrap = document.querySelector(id + " .scroll"),
        scrollContent = scrollWrap.querySelector('.scrollContent'),
        scrollBar = scrollWrap.querySelector('.scrollBar'),
        bar = scrollBar.querySelector('span');

    // 滚动条初始化
    bar.style.transform = scrollContent.style.transform = 'translateY(0px)';

    // 设置滑块的高度
    let multiple = scrollContent.clientHeight/scrollWrap.clientHeight;
    if(multiple<=1){

        // 这个条件成立说明内容的高度没有父级的高度大，就不需要滚动条了
        scrollBar.style.display = "none";

        // 滚轮取消滚动功能
        multiple = 1;
        return;     //没有出现滚动条后边就不用走了
    }

    // 最大倍数不能超过20，要不太小了，用户就点不住了
    multiple = multiple > 20 ? 20:multiple; 

    // 计算出滑块的高度
    bar.style.height = scrollBar.offsetHeight / multiple +"px";


    // 滑块的拖拽
    let scrollTop = 0;
    let maxHeight = scrollBar.offsetHeight - bar.offsetHeight;
    bar.addEventListener('mousedown',function(e){

        let startY = e.clientY;
        let startT = parseInt(this.style.transform.split("(")[1]);

        document.onmousemove = (e)=>{
            scrollTop = e.clientY - startY + startT;
            scroll();
        }

        // document.addEventListener('mouseup',()=>{
        //     document.onmousemove = null;
        // })

        document.onmouseup = ()=>document.onmousemove = null;

        e.preventDefault();
    });

    
    function scroll(){
        bar.style.transform = 'translateY('+scrollTop+'px)';
    }
}