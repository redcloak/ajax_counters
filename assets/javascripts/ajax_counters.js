$(document).ready(function(){
    $('.ac_counter').each(function(index) {
      var do_refresh = true;
      if( typeof ajax_stored_counters != 'undefined') {
        for(var v in ajax_stored_counters) {
          if( v == this.id && !ajax_stored_counters[v].expired) {
            do_refresh = false;
            draw_counter(this.id, ajax_stored_counters[v].counter)
            // alert('Write inline')
          }
        }
      }
      if(do_refresh) {
        // alert('make request')
        // $.ajax({url: '/ajax_counters/get_data',
        //         type: 'post',
        //         success: ajax_counter_ok,
        //         dataType: 'json',
        //         data: 'span_id='+this.id+'&freq='+$(this).attr('data-refresh-freq')
        // });
        $.ajax({url: $(this).attr('data-url'),
                type: 'get',
                success: ajax_upd_data,
                dataType: 'json',
                data: 'span_id='+this.id+'&freq='+$(this).attr('data-refresh-freq')});
      }
    });

    $(document.body).on('click', '#refresh_ajax_counters', function(){
      $('.ac_counter').each(function(index) {
        $.ajax({url: $(this).attr('data-url'),
                type: 'get',
                success: ajax_upd_data,
                dataType: 'json',
                data: 'span_id='+this.id+'&freq='+$(this).attr('data-refresh-freq')});
      });
      return false;
    });

    $('<a href="#" id="refresh_ajax_counters" class="in_link"><span>'+refresh_counters_label+'</span></a><br />').prependTo('.my_name_popover_content');
});


// function ajax_counter_ok (resp) {
//   draw_counter(resp.span_id, resp.counter);
//   console.dir(resp);
//   if(resp.expired) {
//     $.ajax({url: $('#'+resp.span_id).attr('data-url'),
//             type: 'get',
//             success: ajax_upd_data,
//             dataType: 'json',
//             data: 'span_id='+resp.span_id+'&freq='+$('#'+resp.span_id).attr('data-refresh-freq')});
//   }
//   return false;
// }

function ajax_upd_data (resp) {
  draw_counter(resp.span_id, resp.counter);
  if(typeof resp.counter_stored == 'undefined' || !resp.counter_stored) {
    $.ajax({ url: '/ajax_counters/upd_data',
             type: 'post',
             data: 'span_id='+resp.span_id+'&counter='+resp.counter+'&freq='+$('#'+resp.span_id).attr('data-refresh-freq') });
  }
}

function draw_counter(span_id, counter) {
  var c = (counter == 0 || counter == '0') ? '' : counter;
  $('#'+span_id).html(c);
}