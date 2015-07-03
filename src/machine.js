// The turing machine

	//The head of the machine varies -MAX_SAFE_INTEGER to +MAX_SAFE_INTEGER
	var head = 0;
	//Tape is represented by two stacks
	// leftStack's growth represent tape growth on the left
	// rightStack's growth represent tape growth on the right
	var tape = new (function(){
			this.leftStack=[],this.rightStack=[];

			this.readTape = function(position){

			var absPosition,stack;

			if(position < 0){
				// -1 is 0 on leftStack
				absPosition = position*-1 - 1;
				stack = this.leftStack;

			}else{
				// 0 is 0 on rightStack
				absPosition = position;
				stack = this.rightStack;
			}	

			//B is reserved for blank
			if(stack.length <= absPosition)
				return "B";
			else
				return stack[absPosition];

			}
	})();
	//Current state of the machine
	var currentState;

	//Table of instructions
	//Each instruction is denoted as {currentState,valueOnStack,replacementValue,headMovement}
	var table=[];

	//To add instruction sets to the table
	//No replacementValue signifies no replacement
	//No headMovement signifies HALT
	addInstruction = function(instruction){
		if(!(instruction && instruction.currentState && instruction.valueOnStack ))
			throw new Error("Instruction not structured properly.");
		return table.push(instruction);		
	}

module.exports.addInstruction = addInstruction;
