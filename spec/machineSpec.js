var rewire = require('rewire')
var turingMachine = rewire('../src/machine.js')

describe('Error Handlers in machine.js',function(){
	it("addIntruction",function(){
		expect(function(){ turingMachine.addInstruction({}); }).toThrow(new Error("Instruction not structured properly."));	
	});

});

describe('Tape operations',function(){
	var tape = turingMachine.__get__("tape");

	it("blankTape read",function(){
		expect(function(){
			return tape.readTape(-1);
		}())
		.toEqual("B")
	});

	it("symbolExistsOnTape",function(){
		expect(function(){
			tape.leftStack = ["A"];
			tape.rightStack = ["C"];
			
			return tape.readTape(-1);		
		}())
		.toEqual("A");	
	});

	it("blankTape write",function(){
		expect(function(){
			return tape.writeTape(1,"C");		
		}())
		.toEqual("C");	
	});
	
	it("overwrite write",function(){
		expect(function(){
			tape.leftStack = ["A"];
			return tape.writeTape(-1,"D");		
		}())
		.toEqual("D");	
	}); 
});

describe('Public Functions',function(){
	var set = {
		currentState : "0",
		valueOnTape : "1",
		replacementValue : "A",
		headMovement : "L"	
	}
		
	it("addInstruction",function(){
		expect(function(){
			return turingMachine.addInstruction(set);
		}())
		.toEqual(jasmine.any(Number));
	});
	
	it('getInstruction',function(){
		expect(function(){
			turingMachine.__set__("head",0);
			turingMachine.__set__("currentState","0");
			turingMachine.__get__("tape").writeTape(0,"1");
			return turingMachine.getInstruction();
		}())
		.toEqual(set);	
	});	
	
	it("notDefinedState",function(){
		expect(function(){
			turingMachine.__set__("currentState","1");
			turingMachine.__set__("head",0);
			turingMachine.__get__("tape").writeTape(0,"1");
			return turingMachine.getInstruction();	
		}())
		.toBeUndefined();	
	});
});
