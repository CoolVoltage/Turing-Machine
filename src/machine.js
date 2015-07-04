var _ = require("underscore");
// The turing machine

	//The head of the machine varies -MAX_SAFE_INTEGER to +MAX_SAFE_INTEGER
	var head = 0;
	//Tape is represented by two stacks
	// leftStack's growth represent tape growth on the left
	// rightStack's growth represent tape growth on the right
	var tape = new (function(){
			this.leftStack=[],this.rightStack=[];
			
			var getAbsPosition = function(position){
				if(position < 0)		
					return position*-1 -1;
				else
					return position;
			}

			var getStack = function(position){
				var absPosition = getAbsPosition(position);
				var stack;

				if(position < 0){
					stack = this.leftStack;

				}else{
					stack = this.rightStack;
				}	
				//B is reserved for blank
				//extend tape by pushing blanks
				while(stack.length <= absPosition){
					stack.push("B");	
				}	

				return stack;
			}

			this.readTape = function(position){
				var stack = getStack.call(this,position);
				var absPosition = getAbsPosition.call(this,position);		
				return stack[absPosition];
			}
			
			this.writeTape = function(position,symbol){
				var stack = getStack.call(this,position);
				var absPosition = getAbsPosition.call(this,position);
				stack[absPosition] = symbol;	
				return stack[absPosition];
			}
	})();
	//Current state of the machine
	var currentState;

	//Table of instructions
	//Each instruction is denoted as {currentState,valueOnTape,replacementValue,headMovement}
	var table=[];

	//To add instruction sets to the table
	//No replacementValue signifies no replacement
	//No headMovement signifies HALT
	var addInstruction = function(instruction){
		if(!(instruction && instruction.currentState && instruction.valueOnTape ))
			throw new Error("Instruction not structured properly.");
		return table.push(instruction);		
	}
	
	//returns replacementValue and headMovement for a set of currentState and valueOnStack
	var getInstruction = function(){
		var valueOnTape = tape.readTape(head);
		var instruction = _.find(table,function(instruction){
			return (instruction.currentState == currentState && instruction.valueOnTape == valueOnTape)
		});
		return instruction;		
	}
module.exports.addInstruction = addInstruction;
module.exports.getInstruction = getInstruction;
