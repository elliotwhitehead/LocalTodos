//Todo object
function Todo() {

	//The To-Do list in the flesh
	this.list =  new Array(),

	//returns Task of given index
	this.getTask = function(index){
		return this.list[index];
	},

	//adds task to list
	this.add = function(task){
		var regex = new RegExp('[a-z]','i');					//Ensures that blank tasks are not posted
		if(task.search(regex) != -1){
			this.list.push(new Task(task));
			display(task);
		}
		else{
			alert("Sorry, please enter a valid task.");			
		}
	},

	//removes task from list
	this.remove = function(finishedTask){
		for (var i = 0; i < this.list.length; i++) {
			if(this.list[i].getTask() == finishedTask){
				this.list.splice(i,1);
				break;
			}
		}
	}
}


//Task object
function Task(fresh){
	//instance variable
	this.task = fresh;

	//instance methods
	this.getTask = function(){									//Returns task
		return this.task;
	}
	this.setTask = function(updated){							//Changes task
		this.task = updated;
	}
} 


//method to append new task to list
var display = function(task){
	$("<li class=\"list-group-item task\" style=\"color:black;\">" + task + "<span class=\"glyphicon glyphicon-ok pull-right\" style=\"font-size:20px;\"></span></li>").hide().appendTo(".list").fadeIn(500);
}


//instantiator
var todo = new Todo();



//provides interactivity
$(document).ready(function(){
	$(".draft").focus();


	$("#draft").keypress(function(event){						//submit task via enter key
		if(event.charCode === 13){
			todo.add($("#draft").val());
			$("#draft").val('');
		}
	});


	$("#add").click(function(){									//submit task via submit button
		todo.add($("#draft").val());
		$("#draft").val('');
		$(".draft").focus();
	});


});

$('body').on('click', '.glyphicon-ok', function(){				//allows jQuery to remove tasks added after load
	var finishedTask = $(this).parent().text();
	todo.remove(finishedTask);
	$(this).parent().remove();
})


