/**
 * Created by csq on 2017/8/15.
 */


$(function () {
  
  var $categoryAddForm = $('#categoryAddForm');
  if ($categoryAddForm.length) {
    let $categoryAddSubmit = $('#categoryAddSubmit');
    let $alter = $('.alert');
    let $alterTxt = $('.alert-txt');
    let $submitFlag = true;
    
    $categoryAddSubmit.on('click', function (e) {
      if ($submitFlag) {
        $submitFlag = false;
        $.ajax({
          url: '/api/category/add',
          method: 'post',
          data: $categoryAddForm.serialize(),
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
  if ($categoryEditForm.length) {
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
  
  
  let $categoryDelete = $('.categoryDelete');
  if ($categoryDelete.length) {
    $categoryDelete.on('click', e => {
      let id = $(e.target).data('id');
      $.get('/api/category/delete?id=' + id, data => {
        if (data.code === 200) {
          location.reload();
        } else {
          alert(data.message);
        }
      })
    })
  }
  
  let $cntForm = $('#cntForm');
  if ($cntForm.length) {
    let $cntSubmit = $('#cntSubmit');
    let $alter = $('.alert');
    let $alterTxt = $('.alert-txt');
    let $submitFlag = true;
    $cntSubmit.on('click', e => {
      if($submitFlag){
        $submitFlag = false;
        $.ajax({
          url: '/api/content/add',
          method: 'post',
          data: $cntForm.serialize(),
          success: (data) => {
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
              });
              $submitFlag = true;
            }, 3000);
          }
        })
      }
    })
  }
  
  
  let $contentEditForm = $('#contentEditForm');
  if ($contentEditForm.length) {
    let $submit = $('#contentSubmit');
    let $alter = $('.alert');
    let $alterTxt = $('.alert-txt');
    let $submitFlag = true;
    
    $submit.on('click', function (e) {
      if ($submitFlag) {
        $submitFlag = false;
        $.ajax({
          url: '/api/content/edit',
          method: 'post',
          data: $contentEditForm.serialize(),
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
  
});