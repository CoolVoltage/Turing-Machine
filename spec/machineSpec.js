var rewire = require('rewire')
var turingMachine = rewire('../src/machine.js')

describe('Error Handlers in machine.js',function(){
	it("addIntruction",function(){
		expect(function(){ turingMachine.addInstruction({}); }).toThrow(new Error("Instruction not structured properly."));	
	});

});

describe('Tape operations',function(){
	var tape = turingMachine.__get__("tape");

	it("blankTape",function(){
		expect(function(){
			return tape.readTape(-1);
		}())
		.toEqual("B")
	});

	it("symbolExists",function(){
		expect(function(){
			tape.leftStack = ["A"];
			tape.rightStack = ["C"];
			
			return tape.readTape(-1);		
		}())
		.toEqual("A");	
	});
	
});

describe('Public Functions',function(){
	
	it("addInstruction",function(){
		expect(function(){
			var mac =turingMachine;
			var set = {
				currentState : "0",
				valueOnStack : "1",
				replacementValue : "A",
				headMovement : "L"		
			
			};
			return mac.addInstruction(set);
		}())
		.toEqual(jasmine.any(Number));
	});	

});
