function changeSize(img,size)
{
    if(size!=1.0)
    {
        var width=(img.width*size);
        img.width=width;
    }
}

// function used to disable default click event on any element
function disableClick(element) {
    $(element).each(function(i){ 
        $(this).click(function(e) {
            e.preventDefault();
        });
    });
}
   
