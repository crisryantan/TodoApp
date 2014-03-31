$(document).ready(function(){

function updateCallback(x,self,event, callback){
		var id =  x.attr('id');
		event.preventDefault();
		$.ajax({
			type: 'DELETE',
			url : '/destroy/' + id,
			success : function(){
				console.log('server-side update successfull');
				$(self).parent().remove();
			},
			error : function(){
				console.log('server error')
			}
		});
}

function deleteCallback(x,y,event,callback){
		var id =  x.attr('id');
		x.parent().remove();
		event.preventDefault();
		$.ajax({
			type: 'DELETE',
			url : '/destroy/' + id,
			success : function(){
				console.log('server-side delete successfull');
				x.parent().remove();
			},
			error : function(){
				console.log('server error')
			}
		});
}


	$('#form').submit(function(e){
		console.log( $(this).serialize() );
		e.preventDefault();
	});
	$('#add').click(function(){
			var toAdd = $('input[name=message]').val();
			var todoId;

			console.log(toAdd);

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
						$('#messages').append('<div class="item"> <input type="text" id="'+todoId+'" class="update-link" href="" title="Update this todo item" value=' + toAdd +  '></input> <a class="del-btn" id="'+todoId+'"  href="#" title="Delete this todo item">Delete</a><br /></div>');
						$('#textField').val(''); //after appending empty input box

						$('.update-link').keydown(function(event){
							updateCallback($(this),event,function(){
							});
						});
						$('a.del-btn').click(function(event){
							deleteCallback($(this),this,event,function(){
							});
						});
						},
					error : function (jqXHR, textStatus, errorThrown){
						console.log('error');
					}
				});
			}

	});

	$('#textField').keydown(function(event) {
		if(event.keyCode === 13){
			//addToDo();
		}
	});

	$('.update-link').keydown(function(event){
		updateCallback($(this),event,function(){
			console.log('callback success');
		});
	});

	$('a.del-btn').click(function(event){
		deleteCallback($(this),this,event,function(){
		});
	});

});




