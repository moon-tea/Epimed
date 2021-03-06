$(function(){
	$('.add_generation_btn').click(function(){
		console.log('clicked');
		var name = $(this).data('name');
		var counter = $('#add_'+name+'_generation_btn').data('counter');
		injectContent(counter, name);
	});
	//there is also another event that calls startAjaxFormSubmit
});


function injectContent(counter, name) {
	//console.log('ajaxy!');
	
	var div = $('#dynamic_'+name);
	
	div.append(
		'<div class="form-group">\
			<label for="'+name+'_generated_by'+counter+'" class="col-sm-2 control-label form-inline">Generated By:</label>\
			<div class="col-sm-4">\
				<input class="form-control form-inline" name="'+name+'_generated_by'+counter+'" type="text" value="" id="'+name+'_generated_by'+counter+'">\
			</div>\
			<label for="'+name+'_generated_by_date'+counter+'" class="col-sm-1 control-label form-inline">Date:</label>\
			<div class="col-sm-2">\
				<input class="form-control form-inline" name="'+name+'_generated_by_date'+counter+'" type="text" value="" id="'+name+'_generated_by_date'+counter+'">\
			</div>\
			<label for="'+name+'_generated_#'+counter+'" class="col-sm-1 control-label form-inline">Generated#:</label>\
			<div class="col-sm-1">\
				<input class="form-control form-inline" name="'+name+'_generated_#'+counter+'" type="text" value="" id="'+name+'_generated_#'+counter+'">\
			</div>'
		/*
		</div>\
		<div class="form-group">\
			<label for="'+name+'_approved_by'+counter+'" class="col-sm-2 control-label form-inline">Approved For Use By:</label>\
			<div class="col-sm-4">\
				<input class="form-control form-inline" name="'+name+'_approved_by'+counter+'" type="text" value="" id="'+name+'_approved_by'+counter+'">\
			</div>\
			<label for="'+name+'_approved_by_date'+counter+'" class="col-sm-1 control-label form-inline">Date:</label>\
			<div class="col-sm-2">\
				<input class="form-control form-inline" name="'+name+'_approved_by_date'+counter+'" type="text" value="" id="'+name+'_approved_by_date'+counter+'">\
			</div>\
			<label for="'+name+'_approved_#'+counter+'" class="col-sm-1 control-label form-inline">Used#:</label>\
			<div class="col-sm-1">\
				<input class="form-control form-inline" name="'+name+'_approved_#'+counter+'" type="text" value="" id="'+name+'_approved_#'+counter+'">\
			</div>\
		</div>'
		*/
	);
	$('#add_'+name+'_generation_btn').data('counter', ++counter);
}
$(function(){
	$('.add_row_btn').click(function(){
		var name = $(this).data('name');
		var counter = $('#add_'+name+'_row_btn').data('counter');
		injectRowContent(counter, name);
	});
	//there is also another event that calls startAjaxFormSubmit
});

function injectRowContent(counter, name) {
	var span = $('#dynamic_'+name);
	counter++;
	span.append(
		'<tr data-number="' + (counter-1) + '">\
			<td>\
				<input \
				class="form-control form-inline" \
				name="burst_time'+counter+'" \
				data-name="burst_time" \
				rows="1" \
				form="batch_burst" \
				type="text" \
				value="">\
			</td>\
			<td>\
				<input \
				class="form-control form-inline" \
				name="burst_sample_#'+counter+'" \
				type="text" \
				readonly="" \
				value="'+counter+'">\
			</td>\
			<td>\
				<input \
				class="form-control form-inline" \
				name="burst_pressure'+counter+'" \
				data-name="burst_pressure" \
				rows="1" \
				from="batch_burst" \
				type="text" \
				value="">\
			</td>\
			<td>\
				<input \
				class="form-control form-inline" \
				name="burst_location'+counter+'" \
				data-name="burst_location" \
				rows="1" \
				from="batch_burst" \
				type="text" \
				value="">\
			</td>\
			<td>\
				<input \
				class="form-control form-inline" \
				name="burst_seal_transfer'+counter+'" \
				data-name="burst_seal_transfer" \
				rows="1" \
				from="batch_burst" \
				type="text" \
				value="">\
			</td>\
			<td>\
				<input \
				class="form-control form-inline" \
				name="burst_wicking'+counter+'" \
				data-name="burst_wicking" \
				rows="1" \
				from="batch_burst" \
				type="text" \
				value="">\
			</td>\
		</tr>'
	);
	$('#add_'+name+'_row_btn').data('counter', counter);
	
	//
	function submitBatch (target) {
		var data = {};
		$(target).find ('tr').each (function (indx, elem) {
			var $e = $(elem);
			var trNumber = $e.data ('number');
			data[trNumber] = {};
			$e.find ('input').each (function (i, inpt) {
				var $inpt = $(inpt);
				data[trNumber] [$inpt.data('name')] = $inpt.val ();
			});
		});

		$.ajax ({
			url: window.location.pathname.replace('edit', 'update'),
			type: 'POST',
			data: data
		}).success (function (msg) {
			console.log (msg);
			if (msg != 'OK') {
				$('header').append ('<div id="flash_notice" class="alert alert-danger">' + msg + '</div>');
			} else {
				location.reload ();
			}
		});

	}
	
	$('#create_burst_batch').unbind().click (function () {
		console.log('clicked');
		submitBatch ('#dynamic_burst');
	});
}