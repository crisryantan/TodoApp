$(document).ready(function(){
	$('#form').submit(function(e){
		console.log( $(this).serialize() );
		e.preventDefault();
	});
	$('#add').click(function(){
			var toAdd = $('input[name=message]').val();
			var todoId;

			if(toAdd == '' || toAdd.trim() == ''){

			}else{
				$.ajax({
					type: 'POST',
					url : '/create',
					data: {
						message : toAdd
					},
					success : function (data, textStatus, jqXHR){
						todoId = data.todo_id;
						if(toAdd !== ""){
							$('#messages').append('<div class="item"> <input type="text" id="'+todoId+'" class="update-link" href="" title="Update this todo item" value=' + toAdd+  '></input> <a class="del-btn" id="'+todoId+'"  href="#" title="Delete this todo item">Delete</a><br /></div>');
							$('#textField').val('');

					$('.update-link').keydown(function(event){
						if(event.keyCode === 13){
							var id =  $(this).attr('id');
								var toUpdate = $(this).val();
								$.ajax({
									type: 'PUT',
									url : '/edit/' + id,
									data: {
										message : toUpdate
									}
								});
						}
					});

					$('a.del-btn').click(function(e){
						var id =  $(this).attr('id');

						$(this).parent().remove();
						e.preventDefault();

						$.ajax({
							type: 'DELETE',
							url : '/destroy/' + id,
						});

					});


						}
					},
					error : function (jqXHR, textStatus, errorThrown){
						console.log('error');

					}
				});
			}


				console.log(toAdd);


	});


	$('#textField').keydown(function(event) {
		if(event.keyCode === 13){
			//addToDo();
		}
	});

	$('.update-link').keydown(function(event){
		if(event.keyCode === 13){
			var id =  $(this).attr('id');
				var toUpdate = $(this).val();
				$.ajax({
					type: 'PUT',
					url : '/edit/' + id,
					data: {
						message : toUpdate
					}
				});
		}
	});



	$('a.del-btn').click(function(e){
		var id =  $(this).attr('id');
		var self = this;

		e.preventDefault();

		$.ajax({
			type: 'DELETE',
			url : '/destroy/' + id,
			success : function(){
				console.log('server-side delete successfull');
				$(self).parent().remove();
			},
			error : function(){
				console.log('server error')
			}
		});

	});

});




