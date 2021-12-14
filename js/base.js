function scrollBar(id){
    let scrollWrap = document.querySelector(id + " .scroll"),
        scrollContent = scrollWrap.querySelector('.scrollContent'),
        scrollBar = scrollWrap.querySelector('.scrollBar'),
        bar = scrollBar.querySelector('span');

    // 滚动条初始化
    bar.style.transform = scrollContent.style.transform = 'translateY(0px)';
    scrollBar.style.display = "block";
    bar.style.transition = scrollContent.style.transition = null;

    // 设置滑块的高度
    let multiple = scrollContent.clientHeight/scrollWrap.clientHeight;
    if(multiple<=1){

        // 这个条件成立说明内容的高度没有父级的高度大，就不需要滚动条了
        scrollBar.style.display = "none";

        // 滚轮取消滚动功能
        scrollWrap.onwheel = null;

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
    bar.addEventListener('mousedown', function(e){

        let startY = e.clientY;
        let startT = parseInt(this.style.transform.split("(")[1]);

        bar.style.transition = scrollContent.style.transition = null;

        document.onmousemove = (e)=>{
            scrollTop = e.clientY - startY + startT;
            scroll();
        }

        // document.addEventListener('mouseup',()=>{
        //     document.onmousemove = null;
        // })

        document.onmouseup = ()=>document.onmousemove = null;

        e.preventDefault();
        e.stopPropagation();
    });

    // 滑动条的主体
    function scroll(){
        if(scrollTop<0){
            scrollTop = 0;
        }
        if(scrollTop > maxHeight){
            scrollTop = maxHeight;
        }
        
        let scaleY = scrollTop / maxHeight;
        bar.style.transform = 'translateY('+scrollTop+'px)';
        scrollContent.style.transform = 'translateY('+(scrollWrap.offsetHeight-scrollContent.offsetHeight)*scaleY+'px)';
    }


    // 滑块父级点击的功能
    scrollBar.onclick = function(e){
        scrollTop = e.clientY - scrollBar.getBoundingClientRect().top - (bar.clientHeight/2);
        bar.style.transition = scrollContent.style.transition = '.3s';
        scroll();
    }


    // 滚轮滚动事件
    scrollWrap.onwheel = function(e){
        e.deltaY > 0 ? scrollTop+=50:scrollTop-=50;
        bar.style.transition = scrollContent.style.transition = '.3s';
        scroll();
        e.preventDefault();
    }
}