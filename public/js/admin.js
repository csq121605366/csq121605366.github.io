/**
 * Created by csq on 2017/8/15.
 */


$(function () {
  
  var $categoryForm = $('#categoryForm');
  if ($categoryForm.length) {
    let $submit = $('#categorySubmit');
    let $alter = $('.alert');
    let $alterTxt = $('.alert-txt');
    let $submitFlag = true;
    
    $submit.on('click', function (e) {
      if ($submitFlag) {
        $submitFlag = false;
        $.ajax({
          url: '/api/category/add',
          method: 'post',
          data: $categoryForm.serialize(),
          success: function (data) {
            $submitFlag = true;
            if (data.code === 200) {
              $alterTxt.html(data.message);
              $alter.addClass('alert-success').slideDown(200);
            } else {
              $alterTxt.html(data.message);
              $alter.addClass('alert-danger').slideDown(200);
            }
            setTimeout(function () {
              $alter.slideUp(400, function () {
                $(this).removeClass('alert-danger alert-success');
              })
            }, 3000);
          }
        })
      }
    })
  }
  
  let $categoryEditForm = $('#categoryEditForm');
  if($categoryEditForm.length){
    let $submit = $('#categorySubmit');
    let $alter = $('.alert');
    let $alterTxt = $('.alert-txt');
    let $submitFlag = true;
  
    $submit.on('click', function (e) {
      if ($submitFlag) {
        $submitFlag = false;
        $.ajax({
          url: '/api/category/edit',
          method: 'post',
          data: $categoryEditForm.serialize(),
          success: function (data) {
            $submitFlag = true;
            if (data.code === 200) {
              $alterTxt.html(data.message);
              $alter.addClass('alert-success').slideDown(200);
            } else {
              $alterTxt.html(data.message);
              $alter.addClass('alert-danger').slideDown(200);
            }
            setTimeout(function () {
              $alter.slideUp(400, function () {
                $(this).removeClass('alert-danger alert-success');
              })
            }, 3000);
          }
        })
      }
    })
  }
  
  
  let $categoryDelete =$('#categoryDelete');
  if($categoryDelete.length){
    
  
  }
  
  
  
});