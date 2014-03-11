var expired_ajax_counters = [];

$(document).ready(function(){
    $('.ac_counter').each(function(index) {
        var counter_expired = true;
        var cnt = $(this);
        var counter_id = $(this).attr('data-id');
        if( typeof ajax_stored_counters != 'undefined' && typeof ajax_stored_counters[counter_id] != 'undefined') {
            draw_counter(cnt.attr('data-id'), ajax_stored_counters[counter_id].counter);
            counter_expired = ajax_stored_counters[counter_id].expired;
        }
        if (counter_expired) {
            expired_ajax_counters.push({url: cnt.attr('data-url'), id: counter_id, period: cnt.attr('data-period')});
        }
    });

    refresh_next_ajax_counter();

    $(document.body).on('click', '#refresh_ajax_counters', function(){
        $('.ac_counter').each(function(index) {
          var cnt = $(this);
          expired_ajax_counters.push({url: cnt.attr('data-url'), id: cnt.attr('data-id'), period: cnt.attr('data-period')});
        });
        refresh_next_ajax_counter();
        return false;
    });

    $('<a href="#" id="refresh_ajax_counters" class="in_link"><span>'+refresh_counters_label+'</span></a><br />').prependTo('.my_name_popover_content');
});


function refresh_next_ajax_counter() {
  if(expired_ajax_counters.length > 0) {
    var c = expired_ajax_counters.pop();
    $.ajax({url: c.url,
            type: 'get',
            success: ajax_upd_data,
            dataType: 'json',
            data: 'counter_id='+c.id+'&period='+c.period});
  }
}


function ajax_upd_data (resp) {
  draw_counter(resp.counter_id, resp.counter);
  if(typeof resp.counter_stored == 'undefined' || !resp.counter_stored) {
    $.ajax({ url: '/ajax_counters/upd_data',
             type: 'post',
             success: refresh_next_ajax_counter,
             data: 'counter_id='+resp.counter_id+'&counter='+resp.counter+'&period='+$('#'+resp.counter_id).attr('data-period') });
  }
  else {
    refresh_next_ajax_counter();
  }
}


function draw_counter(counter_id, counter) {
  // var c = (counter == 0 || counter == '0') ? '' : counter;
  var c = counter;
  $('.ac_counter[data-id='+counter_id+']').html(c);
}



// $(document).ready(function(){
//     $('.ac_counter').each(function(index) {
//         var counter_expired = true;
//         var cnt = $(this);
//         var counter_id = $(this).attr('data-id');
//         if( typeof ajax_stored_counters != 'undefined' && typeof ajax_stored_counters[counter_id] != 'undefined') {
//             draw_counter(cnt.attr('data-id'), ajax_stored_counters[counter_id].counter);
//             counter_expired = ajax_stored_counters[counter_id].expired;
//             // console.log('Write inline')
//             // console.dir(ajax_stored_counters[counter_id])
//         }
//         if (counter_expired) {
//             $.ajax({url: cnt.attr('data-url'),
//                     type: 'get',
//                     success: ajax_upd_data,
//                     dataType: 'json',
//                     data: 'counter_id='+counter_id+'&period='+cnt.attr('data-period')});
//         }
//     });

//     $(document.body).on('click', '#refresh_ajax_counters', function(){
//         $('.ac_counter').each(function(index) {
//             $.ajax({url: $(this).attr('data-url'),
//                     type: 'get',
//                     success: ajax_upd_data,
//                     dataType: 'json',
//                     data: 'counter_id='+$(this).attr('data-id')+'&period='+$(this).attr('data-period')});
//         });
//         return false;
//     });

//     $('<a href="#" id="refresh_ajax_counters" class="in_link"><span>'+refresh_counters_label+'</span></a><br />').prependTo('.my_name_popover_content');
// });

// function ajax_upd_data (resp) {
//   draw_counter(resp.counter_id, resp.counter);
//   if(typeof resp.counter_stored == 'undefined' || !resp.counter_stored) {
//     $.ajax({ url: '/ajax_counters/upd_data',
//              type: 'post',
//              data: 'counter_id='+resp.counter_id+'&counter='+resp.counter+'&period='+$('#'+resp.counter_id).attr('data-period') });
//   }
// }

// function draw_counter(counter_id, counter) {
//   // var c = (counter == 0 || counter == '0') ? '' : counter;
//   var c = counter;
//   $('.ac_counter[data-id='+counter_id+']').html(c);
// }