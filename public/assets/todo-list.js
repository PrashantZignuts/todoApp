$(document).ready(function(){

  $('form').on('submit', function(){
    if(!$('.add_data').css("display","none")){
      var item = $('form input');
      var todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;
    }else{
      var item = $('form input');
      var item_id =item.attr("id")
      var todo = {item: item.val(), id: item_id};

      $.ajax({
        type: 'PUT',
        url: '/todo',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;
    }
  });

  $('.delete_data').on('click', function(){
    console.log(this.id);
      var item = this.id
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

  $('.edit_data').on('click',function(){
    console.log();
    var updateValue = $(this).attr("value")
    var updateId = $(this).attr("id")
    $('input').attr("value",`${updateValue}`)
    $('input').attr("id",`${updateId}`)
    $('.add_data').css("display","none")
    $('.update_data').css("display","").on('submit',function(event){
      event.preventDefault()
      var item = $('form input');
      var todo = {item: item.val()};
      console.log(todo);
    })
  })

});
