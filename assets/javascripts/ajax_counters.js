
RMPlus.AC = (function(my){
  var my = my || {};

  my.expired_ajax_counters = [];

  my.refresh_next_ajax_counter = function () {
    if (RMPlus.AC.expired_ajax_counters.length > 0) {
        var c = RMPlus.AC.expired_ajax_counters.pop();
        $.ajax({url: c.url,
                type: 'get',
                success: RMPlus.AC.ajax_upd_data,
                error: RMPlus.AC.refresh_next_ajax_counter,
                dataType: 'json',
                data: 'counter_id='+c.id+'&period='+c.period});
    }
    else {
        $(document.body).trigger('counters_refreshed');
    }
  }

  my.ajax_upd_data = function (resp) {
    RMPlus.AC.draw_counter(resp.counter_id, resp.counter);
    if (typeof resp.counter_stored == 'undefined' || !resp.counter_stored) {
        $.ajax({ url: '/ajax_counters/upd_data',
                 type: 'post',
                 success: RMPlus.AC.refresh_next_ajax_counter,
                 error: RMPlus.AC.refresh_next_ajax_counter,
                 data: 'counter_id='+resp.counter_id+'&counter='+resp.counter+'&period='+$('#'+resp.counter_id).attr('data-period') });
    }
    else {
        RMPlus.AC.refresh_next_ajax_counter();
    }
    $(document.body).trigger('one_counter_refreshed');
  }


  my.draw_counter = function (counter_id, counter) {
    var c = (counter == 0 || counter == '0') ? '' : counter;
    // var c = counter;
    $('.ac_counter[data-id='+counter_id+']').html(c);
  }

  return my;
})(RMPlus.AC || {});

$(document).ready(function () {

    $('.ac_counter').each(function (index) {
        var counter_expired = true;
        var cnt = $(this);
        var counter_id = $(this).attr('data-id');
        if (typeof RMPlus.AC.ajax_stored_counters != 'undefined' && typeof RMPlus.AC.ajax_stored_counters[counter_id] != 'undefined') {
            RMPlus.AC.draw_counter(cnt.attr('data-id'), RMPlus.AC.ajax_stored_counters[counter_id].counter);
            counter_expired = RMPlus.AC.ajax_stored_counters[counter_id].expired;
        }
        if (counter_expired) {
            RMPlus.AC.expired_ajax_counters.push({url: cnt.attr('data-url'), id: counter_id, period: cnt.attr('data-period')});
        }
    });

    RMPlus.AC.refresh_next_ajax_counter();

    $(document.body).on('click', '.ac_refresh', function () {
        $('.ac_refresh').hide();
        $('<div class="loader ac_preloader"></div>').insertAfter($(this));
        $('.ac_counter').each(function (index) {
            var cnt = $(this);
            RMPlus.AC.expired_ajax_counters.push({url: cnt.attr('data-url'), id: cnt.attr('data-id'), period: cnt.attr('data-period')});
        });
        RMPlus.AC.refresh_next_ajax_counter();
        return false;
    });

    $(document.body).on('counters_refreshed', function () {
      $('.ac_preloader').remove();
      $('.ac_refresh').show();
    });
});